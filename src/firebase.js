import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
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