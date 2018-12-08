import firebase from "firebase";
import { SET_ALL_USERS } from '../reducers/UsersReducer';

const setUsers = (payload) => ({
  type: SET_ALL_USERS,
  payload,
})

const getUsersFromDatabase = (data) => async (dispatch) => {
  return getUsersFromFirestore().then((users)=>{
    console.log('funkars');
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
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        users[doc.id] = doc.data();
    });
    console.log('users:', users);
    return users;
  });
}


export { getUsersFromDatabase };
