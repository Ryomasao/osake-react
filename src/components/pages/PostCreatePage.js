import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from '../template/DefaultTemplate';
import PostCreate from '../organisms/PostCreate';
import Modal from '../molecules/ModalCotent';

class PostCreatePage extends React.Component {

  renderMainContent = () => {
    return (
      <Wrapper>
        <Modal>
          <PostCreate />
        </Modal>
      </Wrapper>
    );
  }

  render() {
    return (
      <DefaultTemplate body={this.renderMainContent} />
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
`;

export default PostCreatePage;
