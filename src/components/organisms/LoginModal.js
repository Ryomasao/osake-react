import React from 'react';
import styled from 'styled-components';
import Modal from '../molecules/Modal';
import LoginButtons from '../molecules/LoginButtons';
import Button from '../atoms/Button';
import modal from '../../static/img/modal.png';


const LoginModalComponent = props => {
  return (
    <Modal onClickCloseButton={props.onClickCloseButton}>
      <LoginModal>
        <Header>
          <h4 className="title is-4">こんにちは</h4>
        </Header>
        <ImageWrapper>
          <img src={modal} alt="login"/>
        </ImageWrapper>
        <LoginButtons>
          <Button 
            text="ログインして利用する" 
            addClassName="is-success is-fullwidth"
            onClick={props.onClickLoginButton}
          />
          <Button 
            text="みるだけ" 
            addClassName="is-info is-fullwidth"
            onClick={props.onClickCloseButton}
          />
        </LoginButtons>
      </LoginModal>
    </Modal>
  );
};

const LoginModal = styled.div`
  width: 80%;
  padding: 5%;
  margin: 0 auto;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
`;

const ImageWrapper = styled.figure`
  width: 100%;
  text-align: center;
`;


export default LoginModalComponent;