import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9-1Ou6m9t9UU3YfLPSe_h-MeEjZV4-Xw",
  authDomain: "react-app-curso-51f31.firebaseapp.com",
  databaseURL: "https://react-app-curso-51f31.firebaseio.com",
  projectId: "react-app-curso-51f31",
  storageBucket: "react-app-curso-51f31.appspot.com",
  messagingSenderId: "184153779705",
  appId: "1:184153779705:web:12343f4366796658f82128",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase  }