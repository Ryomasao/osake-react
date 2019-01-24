import React from 'react';
import { connect } from 'react-redux';
import DefaultTemplate from '../template/DefaultTemplate';
import PostList from '../organisms/PostList';
import LoginModal from '../organisms/LoginModal';
import { firebaseLogin } from '../../firebase';
import Link from '../atoms/Link';
import Button from '../atoms/Button';

class IndexPage extends React.Component {
  state = { showLoginModal: true };

  handleCloseButton = () => {
    this.setState({ showLoginModal: false });
  }

  handleLoginButton = () => {
    firebaseLogin();
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
          { this.props.isSignedIn ?
            <React.Fragment>
              <Link to="/posts/new" text="投稿する" addClassName="is-large is-fullwidth is-success"/>
            </React.Fragment>
            :
            <React.Fragment>
              <Button 
                text="ログインする！" 
                addClassName="is-success is-fullwidth"
                onClick={this.handleLoginButton}
              />
            </React.Fragment>
          }
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
