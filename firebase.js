// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeoGfSnvlGFdDnfshPyRDgAWOUWxfutW4",
  authDomain: "caderno-de-erros-c3b07.firebaseapp.com",
  projectId: "caderno-de-erros-c3b07",
  storageBucket: "caderno-de-erros-c3b07.firebasestorage.app",
  messagingSenderId: "761813741453",
  appId: "1:761813741453:web:1d301c0d543de77f0a57c4",
  measurementId: "G-1XB2SHP7SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
