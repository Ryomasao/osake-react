import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, deletePost, fetchPostIds } from '../../actions';
import posed from 'react-pose';
import { Link } from 'react-router-dom';
import  LinkButton   from '../atoms/Link';
import Button from '../atoms/Button';
import DefaultTemplate from '../template/DefaultTemplate';
import PostDetail from '../organisms/PostDetail';
import LoadingModal from '../organisms/LoadingModal';
import ConfirmModal from '../organisms/ConfirmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

class PostShowPage extends React.Component {

  state = { showModal: false, isVisible: false }

  componentDidMount() {
    this.props.fetchPosts();
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
        <LinkButton
          to={`/posts/edit/${id}`}
          addClassName="is-success"
        >
          おもいでを編集する
        </LinkButton>
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
        <Header>
          {this.props.prevPost && 
            <Link to={`/posts/show/${this.props.prevPost.id}`}>
              前の投稿へ
            </Link>
          }
          <Link to="/">
            一覧へ
          </Link>
          {this.props.nextPost && 
            <Link to={`/posts/show/${this.props.nextPost.id}`}>
              後の投稿へ
            </Link>
          }
        </Header>
        {this.props.prevPost && 
          <Link to={`/posts/show/${this.props.prevPost.id}`}>
            <LeftBar>
              <FontAwesomeIcon icon={faArrowCircleLeft} size="3x"/>
            </LeftBar>
          </Link>
        }
        <section className="section">
          <PostDetail post={this.props.post}/>
          {this.props.isOwnPost ? this.renderIfOwnPost() : null}
        </section>
        {this.props.nextPost && 
          <Link to={`/posts/show/${this.props.nextPost.id}`}>
            <RightBar>
              <FontAwesomeIcon icon={faArrowCircleRight} size="3x"/>
            </RightBar>
          </Link>
        }
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
  const posts = Object.values(state.posts);
  const postIndex = posts.findIndex(post => post.id === ownProps.match.params.id);

  const prevPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  return { 
    post,
    prevPost,
    nextPost,
    auth: state.auth,
    // postがloadingできていない状態を考慮
    isOwnPost: post && post.userId === state.auth.userId
  };
};

const Wrapper = styled.div`
  text-align: center;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;


const LeftAnimation = posed.div({
  hoverable: true,
  init: {
    opacity: 0,
    x: '0%'
  },
  hover: {
    opacity: 1,
    x: '10%'
  }
});

const LeftBar = styled(LeftAnimation)`
  position: absolute;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
`;

const RightAnimation = posed.div({
  hoverable: true,
  init: {
    opacity: 0,
    x: '0%'
  },
  hover: {
    opacity: 1,
    x: '-10%'
  }
});

const RightBar = styled(RightAnimation)`
  position: absolute;
  top:0;
  right:0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default withRouter(connect(mapStateToProps, {
  fetchPosts,
  deletePost,
  fetchPostIds
})(PostShowPage));
