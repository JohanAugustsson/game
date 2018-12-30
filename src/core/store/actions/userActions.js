import firebase from "firebase";
import { SET_USERS } from '../reducers/UsersReducer';

const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
})

const getUsers = (data) => async (dispatch) => {
  return getUsersFromFirestore().then((users)=>{
    dispatch(setUsers(users));
  });
};

function getUsersFromFirestore(user) {
  return firebase.firestore()
    .collection("users")
    .get()
    .then(function(querySnapshot) {
    const users = {};
    querySnapshot.forEach(function(doc) {
        users[doc.id] = doc.data();
    });
    return users;
  });
}


export { getUsers };
