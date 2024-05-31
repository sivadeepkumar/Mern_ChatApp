// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHfYirmN2wgbudF3W2USg7eGpHVlXX0oc",
  authDomain: "apathy-project.firebaseapp.com",
  projectId: "apathy-project",
  storageBucket: "apathy-project.appspot.com",
  messagingSenderId: "878801603181",
  appId: "1:878801603181:web:0047bdd05355446f9c4d64",
  measurementId: "G-G046YRPHWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




export const FireBase = () => <div>FireBase</div>
