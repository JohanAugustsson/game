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
    const {createdAt, id, groupId} = serie;
    serie.players.forEach(uid => {
        promises.push(createPlayer({userUid: uid, createdAt, groupId, serieId: id}))
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

// gets serie based on groupId
const getSeries = (groupId) => async (dispatch) => {
    return getSeriesFromDb(groupId)
        .then((series) => {
            console.log('alla serier: ', series);
            return dispatch(seriesSet(series))
        }).catch((e) => {
            return dispatch(snackbarError('something went wrong'))
        });
};

// gets groups based on player uid
function getSeriesFromDb(groupId) {
    return firebase.firestore()
        .collection('series')
        .where('groupId', '==', groupId)
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
// function getSerie(groupId) {
//   return firebase.firestore()
//     .collection('groups')
//     .doc(groupId)
//     .get()
//     .then((doc)=> {
//       if (doc.exists) {
//         console.log(doc.data);
//         return Promise.resolve(doc.data());
//       } else {
//         console.log('did not find', groupId);
//         return Promise.resolve(null);
//       }
//     }).catch((error)=>{
//       return Promise.reject('something went wrong', error)
//     })
// }


export {createSerie, getSeries};
