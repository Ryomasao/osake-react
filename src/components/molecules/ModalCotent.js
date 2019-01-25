import React from 'react';
import styled from 'styled-components';
import ModalOverLay from '../atoms/ModalOverlay';


const ModalComponent = props => {
  return (
    <ModalOverLay onClickCloseButton={props.onClickCloseButton}>
      <Modal>
        {props.children}
      </Modal>
    </ModalOverLay>
  );
};

const Modal = styled.div`
  width: 80%;
  padding: 5%;
  margin: 0 auto;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;


export default ModalComponent;
