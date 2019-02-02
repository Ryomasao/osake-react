import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from '../template/DefaultTemplate';
import PostEdit from '../organisms/PostEdit';

class PostEditPage extends React.Component {

  renderMainContent = () => {
    return (
      <Wrapper>
        <section className="section">
          <PostEdit />
        </section>
      </Wrapper>
    );
  }

  render() {
    return (
      <DefaultTemplate>
        {this.renderMainContent()}
      </DefaultTemplate>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
`;

export default PostEditPage;
