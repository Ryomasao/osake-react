import React from 'react';
import { connect } from 'react-redux';
import DefaultTemplate from '../template/DefaultTemplate';
import PostList from '../organisms/PostList';
import LoginModal from '../organisms/LoginModal';
import LoadingModal from '../organisms/LoadingModal';
import { firebaseLogin } from '../../firebase';
import Link from '../atoms/Link';

class IndexPage extends React.Component {
  state = { showLoginModal: true };

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

  renderMainContent = () => {
    return (
      <section className="seciton">
        { this.props.isSignedIn &&
          <React.Fragment>
            <Link to="/posts/new" addClassName="is-large is-fullwidth is-success">
              投稿する
            </Link>
          </React.Fragment>
        }
        <PostList />
      </section>
    );
  }

  whatShoudIRender() {
    if (this.props.isSignedIn === null) {
      return LoadingModal;
    } else if(this.props.isSignedIn === false && this.state.showLoginModal) {
      return this.renderLoginModal;
    } else {
      return this.renderMainContent;
    }
  }

  render() {
    // DefaultTemplateのchild要素として、bodyを入れた方が分かりやすい気がする。
    // しかし、DefaultTemplate側で、props.children(props)をする必要があり、うまくいかなかったので、やめた。
    // 方法自体は、以下の通り、React.cloneElementをつかばいける。
    // https://medium.com/@markgituma/passing-data-to-props-children-in-react-5399baea0356
    // なんだけど、React.Children.mapの組み合わせでやった場合、childがネストしているchildにも、propsを渡そうとする。
    // 結果、うまくいかなかった。エラー忘れた、、、
    // React.Children.mapで最上位のノードのみ処理すればいいだけの気もするが、とりあえずbodyプロパティで渡すことにした。
    return (
      <DefaultTemplate body={this.whatShoudIRender()}>
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
