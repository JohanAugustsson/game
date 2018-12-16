import firebase from "firebase";
import { SET_USER } from '../reducers/authReducer';

const setUser = (payload) => ({
  type: SET_USER,
  payload,
})

const createNewUser = (data) => async (dispatch) => {
  const { email, password, firstName, lastName } = data;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response)=>{
      const { uid } = response.user;
      const data = {
        firstName,
        lastName,
        uid,
        email,
      }
      console.log('nu sspara', data);
      saveUserDataToFirestore(data)
      dispatch(setUser(data));
    })
    .catch(function(error) {
      console.log('något gick fel', error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
}

const authentication = () =>{
    return firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        // ...
      }
  })
};

function saveUserDataToFirestore(user) {
  console.log('user data: ',user);
  user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  return firebase.firestore().collection('users').doc(user.uid).set(user);
}


export { createNewUser, authentication };
