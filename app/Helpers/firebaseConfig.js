// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDa3hdaJE5X7U4UNJZIxP8Z8C5P0GacHZ8",
    authDomain: "moviesapp-b9cd2.firebaseapp.com",
    databaseURL: "https://moviesapp-b9cd2-default-rtdb.firebaseio.com",
    projectId: "moviesapp-b9cd2",
    storageBucket: "moviesapp-b9cd2.appspot.com",
    messagingSenderId: "1030594052649",
    appId: "1:1030594052649:web:9fb169791bf32418ba1238",
    measurementId: "G-MGN9SL4YXT"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };