import React from 'react';

const NavBrand = props => {
  return (
    <div className="navbar-brand">
      <a className="navbar-item" href={props.homeUrl}>
        <img src={props.logo} alt="logo" width="112" height="28" />
      </a>
    </div>
  );
};

export default NavBrand;
