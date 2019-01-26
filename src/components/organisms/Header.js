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

class Header extends React.Component {
  state = { showMenu : false };

  handleClickHambergerIcon = () => {
    this.setState({ showMenu: !this.state.showMenu});
  }

  render() {
    return (
      <div>
        <NavBar>
          <NavBrand 
            logo={logo}
            homeUrl="/"
            onClickHambergerIcon={this.handleClickHambergerIcon}
            isActive={this.state.showMenu}
          /> 
          { this.state.showMenu &&
            <NavMenu 
              items={() => {
                return (
                  <div className="buttons">
                    <LoginToggleButotn 
                      isSignedIn={this.props.isSignedIn}
                      handleLogin={handleLogin}
                      handleLogout={handleLogout}
                    />
                  </div>
                );
              }}
            />
          }
        </NavBar>
      </div>
    );
  }
}

export default Header;
