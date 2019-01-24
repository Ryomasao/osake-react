import React from 'react';
import { connect } from 'react-redux';
import DefaultTemplate from '../template/DefaultTemplate';
import PostList from '../organisms/PostList';
import LoginModal from '../organisms/LoginModal';
import { firebaseLogin, firebaseLogout } from '../../firebase';

class IndexPage extends React.Component {
  state = { showLoginModal: true };

  handleCloseButton = () => {
    this.setState({ showLoginModal: false });
  }

  handleLoginButton = () => {
    firebaseLogin();
  }

  handleClickLogout = () => {
    firebaseLogout();
  }

  renderLodaingOrContent() {
    if (this.props.isSignedIn === null) {
      return <div> Loading...</div>;
    } else if(this.props.isSignedIn === false && this.state.showLoginModal) {
      return (
        <LoginModal 
          onClickCloseButton={this.handleCloseButton}
          onClickLoginButton={this.handleLoginButton}
        />
      );
    } else {
      return (
        <section className="seciton">
          <button type="button" onClick={this.handleClickLogout}>logout</button>
          <PostList />
        </section>
      );
    }
  }

  render() {
    return (
      <DefaultTemplate>
        {this.renderLodaingOrContent()}
      </DefaultTemplate>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps)(IndexPage);
