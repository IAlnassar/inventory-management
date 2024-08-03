// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK9oay7fgIxCsYAgC1xmEkzE4bb2f7Bqg",
  authDomain: "inventory-management-bcf96.firebaseapp.com",
  projectId: "inventory-management-bcf96",
  storageBucket: "inventory-management-bcf96.appspot.com",
  messagingSenderId: "487868689986",
  appId: "1:487868689986:web:ea9af88da2d37743c307db",
  measurementId: "G-S9878V2V9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestore = getFirestore(app);
const auth = getAuth(app);
export { auth, firestore };