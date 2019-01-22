import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchPost, editPost } from '../../actions';
import PostForm from './PostForm';

class PostEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  handleSubmit = async formValue => {
    await this.props.editPost(this.props.match.params.id, formValue);
    this.props.history.push('/');
  }
    
  render() {
    if(!this.props.post) {
      return <div>Loading...</div>;
    }

    return (
      <div data-testid="post-form">
        <PostForm 
          initialValues={this.props.post} 
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default withRouter(
  connect(mapStateToProps,
    { editPost, fetchPost }
  )(PostEdit)
);
