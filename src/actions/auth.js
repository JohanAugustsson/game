import firebase from "firebase";
import { SET_USER } from '../reducers/authReducer';

const setUser = (payload) => ({
  type: SET_USER,
  payload,
})

const createNewUser = (data) => async (dispatch) => {
  console.log("inne i action create new user");
  console.log("data", data);
  const { email, password } = data;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      console.log("Succeses", user);
      dispatch(setUser(user));
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
}

export { createNewUser };
