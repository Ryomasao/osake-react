import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  render() {
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { post: state.posts };
};

export default connect(mapStateToProps, {
  fetchPost
})(PostShow);
