import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const config = {
  storageBucket: 'osake-d4cfe.appspot.com',
  apiKey: process.env.REACT_APP_FIRESTORE_APIKEY,
  authDomain: 'osake-d4cfe.firebaseapp.com',
};

firebase.initializeApp(config);

export const firebaseLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const firebaseLogout = () => {
  firebase.auth().signOut();
};

export const fireBaseAuthObserver = (onSignIn, onSignOut) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      onSignIn(user);
    } else {
      // 未認証時はログアウトと同様の扱い
      onSignOut();
    }
  });
};

export default firebase;
