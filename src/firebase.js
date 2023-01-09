import app  from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAcIHJsh1zT7rEwNp1i9X83D9cripjBtFE",
    authDomain: "shortly-435ce.firebaseapp.com",
    projectId: "shortly-435ce",
    storageBucket: "shortly-435ce.appspot.com",
    messagingSenderId: "1042022941903",
    appId: "1:1042022941903:web:7b3e89b23dab1ebee9a3ba"
  };

 const firebase = app.initializeApp(firebaseConfig);
 const firestore = firebase.firestore();
 const auth = firebase.auth();


 if(process.env.NODE_ENV === "development") 
 {firestore.useEmulator('localhost',8080);
 auth.useEmulator("http://localhost:9099");}


export  { firebase , auth , firestore ,app };
