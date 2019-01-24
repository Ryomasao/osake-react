import React from 'react';
import DefaultTemplate from '../template/DefaultTemplate';
import PostList from '../organisms/PostList';
import LoginModal from '../organisms/LoginModal';

class IndexPage extends React.Component {
  render() {
    return (
      <DefaultTemplate>
        <PostList />
        <LoginModal/>
      </DefaultTemplate>
    );
  }
}

export default IndexPage;
