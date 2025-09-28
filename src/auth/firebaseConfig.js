// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA5w1gkPTy9EcFC_rXXtaOzojC7d4-zTIA",
  authDomain: "library-management-14955.firebaseapp.com",
  projectId: "library-management-14955",
  storageBucket: "library-management-14955.firebasestorage.app",
  messagingSenderId: "564740030401",
  appId: "1:564740030401:web:a2410bf22e6b2242513940",
  measurementId: "G-EDQJB1YWXJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);