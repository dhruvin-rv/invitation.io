// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPxop-0aThDeaO3QhhjQ3e91U3HI9NdL0",
  authDomain: "invitationio.firebaseapp.com",
  projectId: "invitationio",
  storageBucket: "invitationio.appspot.com",
  messagingSenderId: "92292366968",
  appId: "1:92292366968:web:ce2b922142ddb2dd13238d",
  measurementId: "G-78P4MBEDKE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);