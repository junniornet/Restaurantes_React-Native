// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuthorization } from "firebase/auth";
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

export const isUserLogged = () =>{
    let isLogged = false
    const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    isLogged=true
    const uid = user.uid;
    // ...
  } else {
    isLogged=true
    // User is signed out
    // ...
  }
});
return isLogged
 }


export default authorize;