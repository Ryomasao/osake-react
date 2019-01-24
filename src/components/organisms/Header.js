import React from 'react';
import logo from '../../static/img/logo.jpg';
import { firebaseLogout } from '../../firebase';
import Button from '../atoms/Button';

const handleLogoutButton = () => {
  firebaseLogout();
};

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={logo} alt="logo" width="112" height="28" />
            </a>
          </div>
          <div className="navbar-menu is-active">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Button 
                    text="ログアウト" 
                    addClassName="is-light"
                    onClick={handleLogoutButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
