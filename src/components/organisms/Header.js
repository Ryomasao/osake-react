import React from 'react';
import FirebaseLogin from '../molecules/FirebaseLogin';
import logo from '../../static/img/logo.jpg';

const Header = () => {
  return (
    <div>
      <nav className="navbar is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src={logo} alt="logo" width="112" height="28" />
          </a>
          
          { // eslint-disable-next-line 
          }<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <FirebaseLogin />
    </div>
  );
};

export default Header;
