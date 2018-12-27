import firebase from "firebase";
import {ADD_GROUP } from "../reducers/GroupReducer";

const COLLECTION_NAME = "groups";

const groups = (payload) => ({
    type: ADD_GROUP,
    payload
});
const addNewgroup = (payload) => ({
    type: ADD_GROUP,
    payload
});



const createGroup = (group) => async (dispatch) => {
    const docRef = firebase.firestore().collection('groups').doc();
    group.Id = docRef.id;
    group.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    await addGroupPlayers(group);

    delete group.players;
    return docRef.set(group)
        .then((group) => {
            console.log(group);
            return dispatch(addNewgroup(group));
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

const getGroups = (userUid) => async (dispatch) => {
    return getGroupsFromDatabase(userUid).then((actions) => {
        dispatch((groups(actions)));
    });
};

function getGroupsFromDatabase(userUid) {
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
            return groups;
        });
}




export { createGroup };
