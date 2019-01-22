import React from 'react';
import firebase from '../firebase';

const handleLogin = async () => {
//  try {
//    const result = await firebase.auth().getRedirectResult();
//    if (result.credential) {
//      const token = result.credential.accessToken;
//      const user = result.user;
//      console.log(token, user)
//    }
//    console.log(result)
//  } catch (error) {
//    // eslint-disable-next-line
//    console.log(error);
//  }
//
};

const Header = () => {
  return (
    <div>
      Header
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Header;
