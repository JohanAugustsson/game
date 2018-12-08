import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from "firebase";
import CartReducer from '../reducers/CartReducer'
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore';



var config = {
  apiKey: "AIzaSyA1x_H9AR6eCllplZYk4CBSrxOzamMiDWI",
  authDomain: "ourgamenow.firebaseapp.com",
  databaseURL: "https://ourgamenow.firebaseio.com",
  projectId: "ourgamenow",
  storageBucket: "ourgamenow.appspot.com",
  messagingSenderId: "105675035936"
};

firebase.initializeApp(config);


const config = {
  enableLogging: false,
  timestampsInSnapshots: true,
};


const rootReducer = combineReducers({
  cart: CartReducer
})


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    reactReduxFirebase(firebase, config),
    reduxFirestore(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;
