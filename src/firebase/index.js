import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  storageBucket: 'osake-d4cfe.appspot.com',
  apiKey: process.env.REACT_APP_FIRESTORE_APIKEY,
  authDomain: 'osake-d4cfe.firebaseapp.com',
};

firebase.initializeApp(config);

export default firebase;
