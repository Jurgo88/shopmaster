import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxH0f7OEiFr9VBg78Ofpcig0oqQXFPJtI",
  authDomain: "shopper-156d2.firebaseapp.com",
  projectId: "shopper-156d2",
  storageBucket: "shopper-156d2.appspot.com",
  messagingSenderId: "78491508067",
  appId: "1:78491508067:web:1d3bc1656982537b83c756",
  measurementId: "G-TX5K7HESMJ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
// import { Database } from 'firebase-firestore-lite';
// import Auth from 'firebase-auth-lite';

// // Please read the docs on Auth library for further instructions on all the Auth features.
// const auth = new Auth({
// 	apiKey: 'AIzaSyBxH0f7OEiFr9VBg78Ofpcig0oqQXFPJtI'
// });

// // Now pass the auth instance as well as the projectId.
// const db = new Database({ projectId: 'shopper-156d2', auth });
// console.log("fff" + db);



// export default db;