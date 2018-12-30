import firebase from "firebase";
import {SET_SERIES} from "../reducers/SerieReducer";
import {snackbarError, snackbarMsg} from './SnackbarActions'


const COLLECTION_NAME = "groups";

const seriesSet = (payload) => ({
    type: SET_SERIES,
    payload
});
const addNewSerie = (payload) => ({
    type: SET_SERIES,
    payload
});


// ------------------ Create group -----------------------------------------
const createSerie = (serie) => async (dispatch) => {
    const docRef = firebase.firestore().collection('series').doc();
    serie.id = docRef.id;
    serie.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await addGroupPlayers(serie);

    delete serie.players;
    return docRef.set(serie)
        .then((serie) => {
            return dispatch(addNewSerie(serie));
        }).then(() => {
            return dispatch(snackbarMsg('Success'));
        })
        .catch(() => {
            return dispatch(snackbarError('Sorry something went wrong'))
        });

};

const addGroupPlayers = (serie) => {
    const promises = [];
    const {createdAt, createdBy, id, groupId} = serie;
    serie.players.forEach(uid => {
        promises.push(createPlayer({userUid: uid, createdAt, createdBy, groupId, serieId: id}))
    })
    return Promise.all(promises);
}

const createPlayer = (player) => {
    return firebase.firestore()
        .collection('seriePlayers')
        .doc()
        .set(player);
}

// ---------------------  END --------------------------------

// gets all series for current user
const getSeries = (userUid) => async (dispatch) => {
    return getGroupsFromDb(userUid)
      .then((series) => {

        const promises = [];
        Object.keys(series).forEach(seriePlayerKey => {
            promises.push(getSerie(series[seriePlayerKey].serieId));
        })
        return Promise.all(promises);
      }).then((seriesData)=>{
        const newObject = {};
        seriesData.forEach(serie =>{
          newObject[serie.id] = serie;
        })
        return dispatch(seriesSet(newObject));
      }).catch((e)=>{
        return dispatch(snackbarError('something went wrong'))
    });
};

// gets groups based on player uid
function getGroupsFromDb(userUid) {
    return firebase.firestore()
        .collection('seriePlayers')
        .where('userUid', '==', userUid)
        .get()
        .then(function (querySnapshot) {
            const series = {};
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                series[doc.id] = doc.data();
            });
            return Promise.resolve(series);
        });
}

// get groups from db by groupId = doucment id
function getSerie(serieId) {
  return firebase.firestore()
    .collection('series')
    .doc(serieId)
    .get()
    .then((doc)=> {
      if (doc.exists) {
        return Promise.resolve(doc.data());
      } else {
        console.log('did not find', serieId);
        return Promise.resolve(null);
      }
    }).catch((error)=>{
      return Promise.reject('something went wrong', error)
    })
}



export {createSerie, getSeries};
