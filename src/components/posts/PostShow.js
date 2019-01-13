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
      created_at,
      date,
      favos,
      memo,
    } = this.props.post;

    return (
      <div>
        <h1>PostShow</h1>
        <img src={imagePath} alt="osake"/>
        <p>{created_at}</p>
        <p>{date}</p>
        <p>{favos}</p>
        <p>{memo}</p>
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
