import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import firebase from "firebase";
import RootReducer from './reducers/rootReducer';
import {loadState} from "./localStorage";
// import { reactReduxFirebase } from 'react-redux-firebase';
// import { reduxFirestore } from 'redux-firestore';

// denna ska vi använda som development
var config = {
  apiKey: "AIzaSyAaIMhv2b9hHcfe7C9_ge0fDT_txqjr9yY",
  authDomain: "gameing2017-6c533.firebaseapp.com",
  databaseURL: "https://gameing2017-6c533.firebaseio.com",
  projectId: "gameing2017-6c533",
  storageBucket: "gameing2017-6c533.appspot.com",
  messagingSenderId: "39470466032"
};
// Gammal config för game som vi kan använda
// var config = {
//   apiKey: "AIzaSyA1x_H9AR6eCllplZYk4CBSrxOzamMiDWI",
//   authDomain: "ourgamenow.firebaseapp.com",
//   databaseURL: "https://ourgamenow.firebaseio.com",
//   projectId: "ourgamenow",
//   storageBucket: "ourgamenow.appspot.com",
//   messagingSenderId: "105675035936"
// };

firebase.initializeApp(config);
const firestore = firebase.firestore();

const config = {
  timestampsInSnapshots: true,
};
firestore.settings(config);


// const rootReducer = combineReducers({
//   cart: CartReducer
// })
const persistedState = loadState();

const store = createStore(
  RootReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    // reactReduxFirebase(firebase, config),
    // reduxFirestore(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
export default store;
