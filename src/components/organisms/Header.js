import React from 'react';
import logo from '../../static/img/logo.jpg';
import { firebaseLogin, firebaseLogout } from '../../firebase';
import NavBar from '../molecules/NavBar';
import NavBrand from '../molecules/NavBrand';
import NavMenu from '../molecules/NavMenu';
import LoginToggleButotn from '../atoms/LoginToggleButton';


const handleLogout = () => {
  firebaseLogout();
};

const handleLogin = () => {
  firebaseLogin();
};

const Header = props => {
  return (
    <div>
      <NavBar>
        <NavBrand 
          logo={logo}
          homeUrl="/"
        /> 
        <NavMenu 
          items={() => {
            return (
              <div className="buttons">
                <LoginToggleButotn 
                  isSignedIn={props.isSignedIn}
                  handleLogin={handleLogin}
                  handleLogout={handleLogout}
                />
              </div>
            );
          }}
        />
      </NavBar>
    </div>
  );
};

export default Header;
