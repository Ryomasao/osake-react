import React from 'react';
import ReactDOM from 'react-dom';

const ModalOverLay = props => {
  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        {props.children}
      </div>
      {props.onClickCloseButton &&
      <button 
        onClick={props.onClickCloseButton} 
        className="modal-close is-large" 
        aria-label="close"></button>
      }
    </div>,
    document.querySelector('#modal')
  );
};

export default ModalOverLay;
