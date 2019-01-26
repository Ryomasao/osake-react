import React from 'react';
import Modal from '../molecules/ModalCotent';
import Title from '../atoms/Title';
import styled from 'styled-components';

const ConfirmModal = props => {
  return (
    <Modal onClickCloseButton={props.onClickCloseButton}>
      <Header>
        <Title>{props.title}</Title>
      </Header>
      <Buttons>
        {props.children}
      </Buttons>
    </Modal>
  );

};

const Header = styled.div`
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ConfirmModal;
