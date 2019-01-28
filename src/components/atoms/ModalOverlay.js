import React from 'react';
import ReactDOM from 'react-dom';

let modalRoot = document.getElementById('modal');
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
}

class ModalOverLay extends React.Component {
  el = document.createElement('div');

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          {this.props.children}
        </div>
        {this.props.onClickCloseButton &&
        <button 
          onClick={this.props.onClickCloseButton} 
          className="modal-close is-large" 
          aria-label="close"></button>
        }
      </div>,
      this.el 
    );
  }
}

export default ModalOverLay;
