import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        {props.children}
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
