import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostShow extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { post: state.posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchPost
})(PostShow);
