import React from 'react';
import logo from '../../static/img/logo.jpg';

const Header = () => {
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
                <a className="button is-primary">
                  <strong>ログイン</strong>
                </a>
                <a className="button is-light">
                  ログアウト
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
