import firebase from "firebase";
import { SET_GROUPS } from "../reducers/GroupReducer";
import { snackbarMsg, snackbarError } from './SnackbarActions'


const COLLECTION_NAME = "groups";

const groups = (payload) => ({
    type: SET_GROUPS,
    payload
});
const addNewgroup = (payload) => ({
    type: SET_GROUPS,
    payload
});


// ------------------ Create group -----------------------------------------
const createGroup = (group) => async (dispatch) => {
    const docRef = firebase.firestore().collection('groups').doc();
    group.id = docRef.id;
    group.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await addGroupPlayers(group);

    delete group.players;
    return docRef.set(group)
        .then((group) => {
            return dispatch(addNewgroup(group));
        }).then(()=>{
            return dispatch(snackbarMsg('Success'));
        })
        .catch(()=>{
          return dispatch(snackbarError('Sorry something went wrong'))
        });

};

const addGroupPlayers = (group) => {
    const promises = [];
    const { createdAt, Id } = group;
    group.players.forEach(uid=>{
      promises.push(createPlayer({ userUid: uid, createdAt, groupId: Id }))
    })
    return Promise.all(promises);
}

const createPlayer = (player) => {
  return firebase.firestore()
    .collection('groupPlayers')
    .doc()
    .set(player);
}

// ---------------------  END --------------------------------


// gets all groups for current user
const getGroups = (userUid) => async (dispatch) => {
    return getGroupsFromDb(userUid)
      .then((groups) => {

        const promises = [];
        Object.keys(groups).forEach(groupPlayerKey => {
            promises.push(getGroup(groups[groupPlayerKey].groupId));
        })
        return Promise.all(promises);
      }).then((groupsData)=>{
        const newObject = {};
        groupsData.forEach(group =>{
          newObject[group.id] = group;
        })
        return dispatch(groups(newObject));
      }).catch((e)=>{
        return dispatch(snackbarError('something went wrong'))
    });
};

// gets groups based on player uid
function getGroupsFromDb(userUid) {
    return firebase.firestore()
        .collection('groupPlayers')
        .where('userUid', '==', userUid)
        .get()
        .then(function (querySnapshot) {
            const groups = {};
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                groups[doc.id] = doc.data();
            });
            return Promise.resolve(groups);
        });
}

// get groups from db by groupId = doucment id
function getGroup(groupId) {
  return firebase.firestore()
    .collection('groups')
    .doc(groupId)
    .get()
    .then((doc)=> {
      if (doc.exists) {
        console.log(doc.data);
        return Promise.resolve(doc.data());
      } else {
        console.log('did not find', groupId);
        return Promise.resolve(null);
      }
    }).catch((error)=>{
      return Promise.reject('something went wrong', error)
    })
}






export { createGroup, getGroups };
