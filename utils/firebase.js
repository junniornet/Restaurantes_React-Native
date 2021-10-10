import * as firebaseAuth from "firebase"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAfZEa_DuLgxKv8JKHKqm4RDFXV3QUfLpc",
    authDomain: "restaurantes-reactnative.firebaseapp.com",
    projectId: "restaurantes-reactnative",
    storageBucket: "restaurantes-reactnative.appspot.com",
    messagingSenderId: "255626717075",
    appId: "1:255626717075:web:000ab121220f28555a6a66"
  };

  let app
  if(firebaseAuth.apps.length === 0){
    app=firebaseAuth.initializeApp(firebaseConfig);
  } else{
    app=firebaseAuth.app()
  }

export const firebaseApp = app