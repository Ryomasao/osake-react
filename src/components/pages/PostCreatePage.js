import React from 'react';
import DefaultTemplate from '../template/DefaultTemplate';
import PostCreate from '../organisms/PostCreate';

class PostCreatePage extends React.Component {

  renderMainContent = () => {
    return (
      <PostCreate />
    );
  }

  render() {
    return (
      <DefaultTemplate body={this.renderMainContent} />
    );
  }
}

export default PostCreatePage;
