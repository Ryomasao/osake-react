import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = props => {
  return (
    <Link 
      to={props.to}
      className={`button ${props.addClassName}`}
      onClick={props.onClick}
    >{props.children}</Link>    
  );
};

export default LinkComponent;
