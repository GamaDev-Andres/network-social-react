// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClXuJVoVIGQesGl4xvIdtGQstqHxJIFvc",
  authDomain: "network-social-react.firebaseapp.com",
  projectId: "network-social-react",
  storageBucket: "network-social-react.appspot.com",
  messagingSenderId: "544449102160",
  appId: "1:544449102160:web:ae517564c9a5e1de84ac55",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth, firebaseApp };
