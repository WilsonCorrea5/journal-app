// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdApxuRAWIFJZ6zBFTMb7M6MGgArCxljc",
  authDomain: "react-apps-eeed0.firebaseapp.com",
  projectId: "react-apps-eeed0",
  storageBucket: "react-apps-eeed0.appspot.com",
  messagingSenderId: "1072367288978",
  appId: "1:1072367288978:web:2f7cfade1d4d2111759c4b",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
