import firebase from './';

export const firebaseLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const fireBaseLogOut = () => {
  firebase.auth().signOut();
};