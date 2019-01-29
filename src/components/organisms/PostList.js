import React from 'react';
import PostItem from '../molecules/PostItem';
import styled from 'styled-components';

class PostListComponent extends React.Component {
  renderList() {
    if(!this.props.posts) {
      return null;
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

export default PostListComponent;
