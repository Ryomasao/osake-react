import React from 'react';

const NavBrand = props => {
  return (
    <div className="navbar-brand">
      <a className="navbar-item" href={props.homeUrl}>
        <img src={props.logo} alt="logo" width="112" height="28" />
      </a>
      { // eslint-disable-next-line
      }<a role="button" 
        className={`navbar-burger ${props.isActive && 'is-active'}`}
        aria-label="menu" 
        aria-expanded="false"
        onClick={props.onClickHambergerIcon}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  );
};

export default NavBrand;
