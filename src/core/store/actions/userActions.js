import firebase from "firebase";
import { SET_ALL_USERS } from '../reducers/UsersReducer';

const setUsers = (payload) => ({
  type: SET_ALL_USERS,
  payload,
})

const getUsersFromDatabase = (data) => async (dispatch) => {
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


export { getUsersFromDatabase };
