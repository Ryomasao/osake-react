import React from 'react';
import styled from 'styled-components';
import Modal from '../molecules/ModalCotent';
import LoginButtons from '../molecules/LoginButtons';
import Button from '../atoms/Button';
import modal from '../../static/img/modal.png';


const LoginModalComponent = props => {
  return (
    <Modal onClickCloseButton={props.onClickCloseButton}>
      <Header>
        <h4 className="title is-4">土と青</h4>
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