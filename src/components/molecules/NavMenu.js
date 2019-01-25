import React from 'react';

const NavMenu = props => {
  return (
    <div className="navbar-menu is-active">
      <div className="navbar-end">
        <div className="navbar-item">
          {props.items()}
        </div>
      </div>
    </div>
  );
};

export default NavMenu;