// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw-hcJq1q-i8gS1n9akteZ9ZTgHOYWerc",
  authDomain: "sailingacademy-e57c9.firebaseapp.com",
  projectId: "sailingacademy-e57c9",
  storageBucket: "sailingacademy-e57c9.appspot.com",
  messagingSenderId: "275903674858",
  appId: "1:275903674858:web:48e74fc22e6366fd8e5a93",
  measurementId: "G-4T8D3S788V"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth,db}