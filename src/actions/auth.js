import firebase from "firebase";


const createNewUser = (data) => async (dispatch) => {
  console.log("inne i action create new user");
  const { email, password } = data;
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
      console.log("Succeses");
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
}

export { createNewUser };
