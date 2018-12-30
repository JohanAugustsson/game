import firebase from "firebase";
import {LOGIN, LOGOUT} from '../reducers/authReducer';
import {clearStateFromLocalStorage} from "../localStorage";

const loginUser = (payload) => ({
    type: LOGIN,
    payload,
});

const logoutUser = () => ({
    type: LOGOUT
});

const createNewUser = (data) => async (dispatch) => {
    const {email, password, firstName, lastName} = data;
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const {uid} = response.user;
            const data = {
                firstName,
                lastName,
                uid,
                email,
            };
            console.log('nu sspara', data);
            saveUserDataToFirestore(data);
            dispatch(loginUser(data));
        })
        .catch(function (error) {
            console.log('något gick fel', error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

        });
};


const authentication1 = () => {
    return firebase.auth().onAuthStateChanged(function (user) {
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
const authentication = () => {
    return firebase.auth().currentUser
};

const updateAuth = (user) => async (dispatch) => {
    dispatch(loginUser(user))
};

const login = (email, password) => async (dispatch) => {
    return firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
            dispatch(loginUser(res));
        })
        .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
            clearStateFromLocalStorage();
            dispatch(logoutUser())
            // ...
        });
};

const logout = () => async (dispatch) => {

    return firebase.auth()
        .signOut()
        .then(() => {
            clearStateFromLocalStorage()
            dispatch(logout());
        })
        .catch(() => {
            clearStateFromLocalStorage()
            dispatch(logout())
        });
};


function saveUserDataToFirestore(user) {
    console.log('user data: ', user);
    user.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    return firebase.firestore().collection('users').doc(user.uid).set(user);
}


export {createNewUser, authentication, login, logout, updateAuth};
