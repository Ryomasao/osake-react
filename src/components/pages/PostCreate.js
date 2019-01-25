import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { createPost } from '../../actions';
import PostForm from '../organisms/PostForm';

class PostCreate extends React.Component {
  handleSubmit = async formValue => {
    await this.props.createPost(formValue)
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
      });

    // loading
    // https://developers.freee.co.jp/entry/react-loading-pattern
    // withRouter
    // https://qiita.com/junara/items/a4a98c27dc23fd53ebb9
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        PostCreate
        <PostForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(PostCreate));