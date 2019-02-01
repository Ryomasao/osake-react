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

  // ものすごくはまった
  // action - INIT 
  // 1.render: ちょっとまってね
  // action - SignIn
  // 2.render: PostList ← Postsのデータなし
  // action - fetchPost
  // 3.render: PostList  ← Postsのデータ取得完了
  //
  // このとき、3のrenderでPostListにアイテムが表示されなかった。

  // というのも、
  // * renderメソッドは、this.whatShoudIrender()を実行している
  // * whatShowIRenderは、this.renderMainContent関数を返していた ←ここ重要
  // 
  // 3.renderのときにthis.renderMainContentは2.renderと同じ結果になってしまっていた。
  // なので、関数を返すのではなく、都度実行させるようにしてる。
  // 
  // うーむ、別環境でやっても再現できない、、、
  // https://codesandbox.io/s/o5jk8y0ny6

  renderMainContent= () => {
    return (() => (
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
    ));
  }

  whatShoudIRender() {
    if (this.props.isSignedIn === null) {
      return LoadingModal;
    } else if(this.props.isSignedIn === false && this.state.showLoginModal) {
      return this.renderLoginModal;
    } else {
      //return this.renderMainContent;
      return this.renderMainContent();
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

const Wrapper = styled.div`
  text-align: center;
  padding: 1rem;
`;

const mapStateToProps = state => {
  const posts =  state.posts;
  // keyをプロパティに含める
  for(let id in posts) {
    posts[id] = { ...posts[id] , id: id };
  }

  return {
    isSignedIn: state.auth.isSignedIn,
    // mapが使えるように、Object in Object から Object in Arrayにする
    posts: Object.values(posts),
  };
};

export default connect(mapStateToProps, {
  fetchPosts
})(IndexPage);
