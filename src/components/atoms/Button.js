import React from 'react';

const Button = props => {
  const type = props.type ? props.type : 'button';
  const name = props.name ? props.name : '';
  return (
    <button 
      className={`button ${props.addClassName}`}
      onClick={props.onClick}
      type={type}
      name={name}
    >{props.children}</button>    
  );
};

export default Button;
