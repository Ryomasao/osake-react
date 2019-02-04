import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import DefaultTemplate from '../template/DefaultTemplate';
import ProductContext from '../../context/ProductContext';
import PostList from '../organisms/PostList';
import LoginModal from '../organisms/LoginModal';
import LoadingModal from '../organisms/LoadingModal';
import { firebaseLogin } from '../../firebase';
import Link from '../atoms/Link';
import Supply from '../atoms/Supply';

class IndexPage extends React.Component {
  state = { showLoginModal: true };

  // @TODO 必要に応じて文言をかえるかも
  static contextType = ProductContext;

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleCloseButton = () => {
    this.setState({ showLoginModal: false });
  }

  handleLoginButton = () => {
    firebaseLogin();
  }

  renderLoginModal = () => {
    return (
      <LoginModal 
        onClickCloseButton={this.handleCloseButton}
        onClickLoginButton={this.handleLoginButton}
      />
    );
  }

  // https://codesandbox.io/s/o5jk8y0ny6
  renderMainContent= () => {
    return (
      <section className="section">
        { this.props.isSignedIn ?
          <section className="section">
            <Link to="/posts/new" addClassName="is-large is-fullwidth is-success">
              投稿する
            </Link>
          </section>:
          <Wrapper>
            { // eslint-disable-next-line
            }<Supply>おもいでをつくるには<a onClick={this.handleLoginButton}>ログイン</a>してね！</Supply> 
          </Wrapper>
        }
        <PostList posts={this.props.posts}/>
      </section>
    );
  }

  whatShoudIRender = () =>  {
    if (this.props.isSignedIn === null) {
      return LoadingModal();
    } else if(this.props.isSignedIn === false && this.state.showLoginModal) {
      return this.renderLoginModal();
    } else {
      return this.renderMainContent();
    }
  }

  render() {
    return (
      <DefaultTemplate>
        {this.whatShoudIRender()}
      </DefaultTemplate>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
  padding: 1rem;
`;

const mapStateToProps = state => {
  const posts =  state.posts;

  return {
    isSignedIn: state.auth.isSignedIn,
    posts: Object.values(posts),
  };
};

export default connect(mapStateToProps, {
  fetchPosts
})(IndexPage);
