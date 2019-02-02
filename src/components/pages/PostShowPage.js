import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions';
import Link from '../atoms/Link';
import Button from '../atoms/Button';
import DefaultTemplate from '../template/DefaultTemplate';
import PostDetail from '../organisms/PostDetail';
import LoadingModal from '../organisms/LoadingModal';
import ConfirmModal from '../organisms/ConfirmModal';

class PostShowPage extends React.Component {

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
          onClick={() => this.setState({showModal: true})}
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

  renderMainContent = () => {
    if(!this.props.post) {
      return <LoadingModal />;
    }

    return (
      <Wrapper>
        <section className="section">
          <PostDetail post={this.props.post}/>
          {this.props.isOwnPost ? this.renderIfOwnPost() : null}
        </section>
      </Wrapper>
    );
  }

  render() {
    return (
      <DefaultTemplate>
        {this.renderMainContent()}
      </DefaultTemplate>
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

const Wrapper = styled.div`
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default withRouter(connect(mapStateToProps, {
  fetchPost,
  deletePost
})(PostShowPage));
