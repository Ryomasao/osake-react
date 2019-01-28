import React from 'react';
import ReactDOM from 'react-dom';

const ModalOverLay = props => {
  let container = document.querySelector('#modal');

  // テスト用
  // https://www.youtube.com/watch?v=aejwiTIBXWI
  if(!container) {
    const root = document.querySelector('body');
    container = document.createElement('div');
    container.setAttribute('id', 'modal');
    root.appendChild(container);
  }
    
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
    container
  );
};

export default ModalOverLay;
