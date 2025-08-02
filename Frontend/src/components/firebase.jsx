// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAttonvSoCdu0UAIruIV9domLadtbq1oo",
  authDomain: "mental-health-app-acce4.firebaseapp.com",
  projectId: "mental-health-app-acce4",
  storageBucket: "mental-health-app-acce4.firebasestorage.app",
  messagingSenderId: "848490109619",
  appId: "1:848490109619:web:06fb72b40c73c131136ec6",
  measurementId: "G-H502E15YR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);