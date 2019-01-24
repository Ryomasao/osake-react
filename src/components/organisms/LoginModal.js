import React from 'react';
import Modal from '../molecules/Modal';
import styled from 'styled-components';

const LoginModalComponent = () => {
  return (
    <Modal>
      <LoginModal>
        <Header>
          <h4 className="title is-4">こんにちは</h4>
        </Header>
        <ImageWrapper>
          <img src="https://placehold.jp/300x250.png" alt="login"/>
        </ImageWrapper>
        <Buttons>
          <button className="button is-success is-fullwidth">投稿もする</button>
          <button className="button is-info is-fullwidth">みるだけ</button>
        </Buttons>
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

const Buttons = styled.div`
  width: 100%;

  button {
    margin-bottom: 0.5rem;
  }

`;

export default LoginModalComponent;