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
    group.createdAt = firebase.firestore.FieldValue.serverTimestamp();

    return firebase.firestore()
        .collection('groups')
        .doc()
        .set(group)
        .then((group) => {
            return dispatch(addNewgroup(group));
        });
};
// 
// const addGroupMembers = (group) => {
//     promises = [];
//     group.members.forEach(uid=>{
//       promises.push(createMember(uid, group.createdAt))
//     })
//     return promises;
// }

const getGroups = (userUid) => async (dispatch) => {
    return getGroupsFromDatabase(userUid).then((actions) => {
        dispatch((groups(actions)));
    });
};

function getGroupsFromDatabase(userUid) {
    return firebase.firestore()
        .collection('groupMembers')
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
