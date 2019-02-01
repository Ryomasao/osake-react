import React from 'react';
import PostItem from '../molecules/PostItem';
import styled from 'styled-components';

class PostListComponent extends React.Component {
  renderList() {
    if(!this.props.posts) {
      return null;
    }

    if(this.props.posts.length === 0) {
      return (
        <Noting>
            まだ、なにもない
        </Noting>
      );
    }

    return this.props.posts.map(post => {
      return (
        <PostItemWrapper key={post.id}>
          <PostItem
            to={`posts/show/${post.id}`}
            post={post}
          />
        </PostItemWrapper>
      );
    });
  }

  render() {
    return (
      <PostList>
        {this.renderList()}
      </PostList>
    );
  }
}

const PostList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PostItemWrapper = styled.div`
  width: 30%;
`;

const Noting = styled.div`
  text-align: center;
  width: 100%;
`;

export default PostListComponent;
