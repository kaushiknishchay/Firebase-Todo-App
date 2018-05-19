import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  databaseURL: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const { auth, database } = firebase;
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default {
  auth,
  database,
  googleProvider,
};
