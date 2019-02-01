import React from 'react';
import PostDetail from '../molecules/PostDetail';

class PostShow extends React.Component {
  render() {
    return <PostDetail post={this.props.post}/>;
  }
}


export default PostShow;
