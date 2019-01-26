import React from 'react';
import { Link } from 'react-router-dom';

const LinkComponent = props => {
  const addClassName = props.addClassName || null
  return (
    <Link 
      to={props.to}
      className={`button ${addClassName}`}
      onClick={props.onClick}
    >{props.children}</Link>    
  );
};

export default LinkComponent;
