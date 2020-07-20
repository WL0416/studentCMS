import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBhyPbYEHrd5tGa1UaLI6cB1Qvyr10PRXE",
  authDomain: "newton-c02a2.firebaseapp.com",
  databaseURL: "https://newton-c02a2.firebaseio.com",
  projectId: "newton-c02a2",
  storageBucket: "newton-c02a2.appspot.com",
  messagingSenderId: "255848174007",
  appId: "1:255848174007:web:dc1ac23e46b1df462d5832",
  measurementId: "G-RP9TGQ19YD",
};

// react redux firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
firebase.firestore();

// Add firebase, firestore and any other states to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
});

// Check for settings in locaStorage
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultStorage = {
    allowRegistration: false,
  };

  // Set to localStorage, localStorage only accepts string as the parameters
  localStorage.setItem("settings", JSON.stringify(defaultStorage));
}

// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
const store = createStore(
  rootReducer,
  initialState,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export default store;
