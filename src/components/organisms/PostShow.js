import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions';
import LoadingModal from '../organisms/LoadingModal';
import ConfirmModal from '../organisms/ConfirmModal';
import Link from '../atoms/Link';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

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

  handleCloseModalButton = () => {
    this.setState({ showModal: false });
  };

  renderIfOwnPost() {
    const { id } = this.props.match.params;

    return (
      <Buttons>
        <Link 
          to={`/posts/edit/${id}`}
          addClassName="is-success"
        >
          おもいでを編集する
        </Link>
        <Button 
          type="button" 
          addClassName = "is-danger"
          onClick={() => this.setState({ showModal: true })}
        >
          おもいでを削除する
        </Button>
        { 
          this.state.showModal ?
            <ConfirmModal title="おもいでを削除しますか？" onClickCloseButton={this.handleCloseModalButton}>
              <Button onClick={this.handleCloseModalButton}>やっぱりやめる</Button>
              <Button addClassName="is-danger" onClick={this.handleDeleteButton}>消す</Button>
            </ConfirmModal>
            : null
        }
      </Buttons>
    );
  }

  render() {

    if(!this.props.post) {
      return <LoadingModal />;
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
        <Label>飲んだ日</Label>
        <p>{date}</p>
        <img src={imagePath} alt="osake"/>
        <Label>おもいで</Label>
        <p>{note}</p>
        <Label>作成した日</Label>
        <p>{createdAt}</p>
        <Label>更新した日</Label>
        <p>{updatedAt}</p>
        <Label>評価</Label>
        <p>{favos}</p>
        {this.props.isOwnPost ? this.renderIfOwnPost() : null}
      </div>
    );
  }
}

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

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