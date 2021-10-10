// Import the functions you need from the SDKs you need
import * as firebaseAuth from "firebase"
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
let app
if(firebaseAuth.apps.length === 0){
  app=firebaseAuth.initializeApp(firebaseConfig);
} else{
  app=firebaseAuth.app()
}

const auth=app.auth()

export {auth};