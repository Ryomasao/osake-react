import firebase from 'firebase/app';
import 'firebase/storage';

if (!firebase.apps.length) {
  firebase.initializeApp({
    storageBucket: 'osake-d4cfe.appspot.com',
  });
}

export default firebase;