import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from '../template/DefaultTemplate';
import PostCreate from '../organisms/PostCreate';

class PostCreatePage extends React.Component {

  renderMainContent = () => {
    return (
      <Wrapper>
        <section className="section">
          <PostCreate/>
        </section>
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
