import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAa7LySW76PwgL57Z40ZaXA_tzLxFXJa40",
  authDomain: "ultraestore-7fe3f.firebaseapp.com",
  projectId: "ultraestore-7fe3f",
  appId: "1:1050325303413:web:c9a564da73d94ab8ee783c",
  measurementId: "G-91FRB4STX0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.analytics();

export default {
  firebaseConfig,
};
