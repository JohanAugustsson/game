import firebase from "firebase";
import { SET_USER } from '../reducers/authReducer';

const setUser = (payload) => ({
  type: SET_USER,
  payload,
})

const createNewUser = (data) => async (dispatch) => {
  const { email, password } = data;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      saveUserDataToFirestore(user)
      console.log("Succeses", user);
      dispatch(setUser(user));
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
}


function saveUserDataToFirestore(user) {
  const {firestore} = firebase;
  const data = {
    firstName: user.firstName
  }
  return firestore().collection('users').doc().set(data);
}


export { createNewUser };
