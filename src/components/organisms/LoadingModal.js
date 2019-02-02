import React from 'react';
import Modal from '../molecules/ModalCotent';
import Title from '../atoms/Title';
import styled from 'styled-components';

const LoadingModalComponent = props => {
  const title =  (props && props.title) || 'ちょっとまってね';
  return (
    <Modal>
      <Header>
        <Title data-testid="loading-modal">{title}</Title>
      </Header>
    </Modal>
  );

};

const Header = styled.div`
  text-align: center;
`;

export default LoadingModalComponent;
