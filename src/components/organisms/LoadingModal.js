import React from 'react';
import Modal from '../molecules/ModalCotent';
import styled from 'styled-components';

const LoadingModalComponent = props => {
  return (
    <Modal onClickCloseButton={props.onClickCloseButton}>
      <Header>
        <h4 className="title is-4">ちょっとまってね</h4>
      </Header>
    </Modal>
  );

};

const Header = styled.div`
  text-align: center;
`;

export default LoadingModalComponent;
