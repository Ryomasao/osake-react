import React from 'react';

const DeleteButtonComponent = props => {
  return (
    <button 
      className={`delete ${props.className}` }
      onClick={props.onClick}
      type="button"
    >delete</button>
  );
};

export default DeleteButtonComponent;
