import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderList() {
    if(!this.props.posts) {
      return null;
    }
    return this.props.posts.map(post => {
      return (
        <div className="post-item" key={post.id}>
          <img src={post.imagePath} alt="osake"/>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="post-list">
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const posts =  state.posts;
  // keyをプロパティに含める
  for(let id in posts) {
    posts[id] = { ...posts[id] , id: id };
  }
  // mapが使えるように、Object in Object から Object in Arrayにする
  return { posts: Object.values(posts) };
};

export default connect(mapStateToProps, {
  fetchPosts
})(PostList);
