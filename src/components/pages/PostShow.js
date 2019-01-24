import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../../actions';
import Modal from '../molecules/Modal';

class PostShow extends React.Component {
  state = { showModal: false }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  handleDeleteButton = async () => {
    await this.props.deletePost(this.props.match.params.id)
      .catch(error => {
        // eslint-disable-next-line
        console.error(error);
      });
    this.props.history.push('/');
  }

  renderIfOwnPost() {
    const { id } = this.props.match.params;

    return (
      <div>
        <Link 
          to={`/posts/edit/${id}`}
        >
          Edit
        </Link>
        <button 
          type="button" 
          onClick={() => this.setState({ showModal: true })}
        >
          Delete
        </button>
        { 
          this.state.showModal ?
            <Modal>
              <p>are you sure?</p>
              <button onClick={() => this.setState({ showModal: false })}>no</button>
              <button onClick={this.handleDeleteButton}>yes</button>
            </Modal>
            : null
        }
      </div>
    );
  }

  render() {

    if(!this.props.post) {
      return <div>Loading...</div>;
    }

    const { 
      imagePath,
      createdAt,
      updatedAt,
      date,
      favos,
      note,
    } = this.props.post;

    return (
      <div>
        <h1>PostShow</h1>
        <img src={imagePath} alt="osake"/>
        <p>{createdAt}</p>
        <p>{updatedAt}</p>
        <p>{date}</p>
        <p>{favos}</p>
        <p>{note}</p>
        {this.props.isOwnPost ? this.renderIfOwnPost() : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = state.posts[ownProps.match.params.id];
  return { 
    post,
    auth: state.auth,
    // postがloadingできていない状態を考慮
    isOwnPost: post && post.userId === state.auth.userId
  };
};

export default withRouter(connect(mapStateToProps, {
  fetchPost,
  deletePost
})(PostShow));
