import React from 'react';
import Button from './Button';

const LoginToggleButotn = ({ isSignedIn, handleLogout, handleLogin }) => {

  // if isSiendIn ...
  let text = 'ログアウト';
  let className = 'is-light';
  let onClick = handleLogout;

  if (isSignedIn === null ) {
    text = 'Loading...';
    onClick = null;
  } else if(isSignedIn === false ) {
    text = 'ログイン';
    className = 'is-primary';
    onClick = handleLogin;
  }

  return (
    <Button addClassName={className} onClick={onClick}>
      {text}
    </Button>
  );
};

export default LoginToggleButotn; 
