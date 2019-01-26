import React from 'react';
import styled from 'styled-components';
import DefaultTemplate from '../template/DefaultTemplate';
import PostShow from '../organisms/PostShow';

class PostShowPage extends React.Component {

  renderMainContent = () => {
    return (
      <Wrapper>
        <section className="section">
          <PostShow />
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

export default PostShowPage;
