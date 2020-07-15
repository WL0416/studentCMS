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
  apiKey: "AIzaSyB_hfhYPZjU85uRlayGncuKEsKenIG29D0",
  authDomain: "studentmanager-55f6c.firebaseapp.com",
  databaseURL: "https://studentmanager-55f6c.firebaseio.com",
  projectId: "studentmanager-55f6c",
  storageBucket: "studentmanager-55f6c.appspot.com",
  messagingSenderId: "467225539195",
  appId: "1:467225539195:web:1566ba3ab3768abc7428de",
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
