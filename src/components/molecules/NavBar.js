import React from 'react';

const NavBar = props => {
  return (
    <nav className="navbar is-link" role="navigation" aria-label="main navigation">
      {props.children}
    </nav>
  );
};

export default NavBar;
