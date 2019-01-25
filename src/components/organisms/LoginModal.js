import React from 'react';
import styled from 'styled-components';
import Modal from '../molecules/ModalCotent';
import LoginButtons from '../molecules/LoginButtons';
import Button from '../atoms/Button';
import Title from '../atoms/Title';
import modal from '../../static/img/modal.png';


const LoginModalComponent = props => {
  return (
    <Modal onClickCloseButton={props.onClickCloseButton}>
      <Header>
        <Title>土と青</Title>
      </Header>
      <ImageWrapper>
        <img src={modal} alt="login"/>
      </ImageWrapper>
      <LoginButtons>
        <Button 
          addClassName="is-success is-fullwidth"
          onClick={props.onClickLoginButton}
        >
         ログインして利用する
        </Button>
        <Button 
          addClassName="is-info is-fullwidth"
          onClick={props.onClickCloseButton}
        >
          みるだけ
        </Button>
      </LoginButtons>
    </Modal>
  );
};

const Header = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.figure`
  width: 100%;
  text-align: center;
`;


export default LoginModalComponent;