import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../../actions';
import Modal from '../Modal';

class PostShow extends React.Component {
  state = { showModal: false }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  handleDeleteButton = async () => {
    await this.props.deletePost(this.props.match.params.id);
    this.props.history.push('/');
  }

  renderAdmin() {
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
      date,
      favos,
      note,
    } = this.props.post;

    
    return (
      <div>
        <h1>PostShow</h1>
        <img src={imagePath} alt="osake"/>
        <p>{createdAt}</p>
        <p>{date}</p>
        <p>{favos}</p>
        <p>{note}</p>
        {this.renderAdmin()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default withRouter(connect(mapStateToProps, {
  fetchPost,
  deletePost
})(PostShow));
