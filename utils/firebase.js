// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfZEa_DuLgxKv8JKHKqm4RDFXV3QUfLpc",
    authDomain: "restaurantes-reactnative.firebaseapp.com",
    projectId: "restaurantes-reactnative",
    storageBucket: "restaurantes-reactnative.appspot.com",
    messagingSenderId: "255626717075",
    appId: "1:255626717075:web:000ab121220f28555a6a66"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;