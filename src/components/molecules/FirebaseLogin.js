import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';

class FirebaseLogin extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.signIn(user);
      } else {
        // 未認証時はログアウトと同様の扱い
        this.props.signOut();
      }
    });
  }

  handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  handleLogout = () => {
    firebase.auth().signOut();
    this.props.signOut();
  }


  render() {
    if (this.props.isSignedIn) {
      return <button type="button" onClick={this.handleLogout}>Logout</button>;
    }
    return <button type="button" onClick={this.handleLogin}>Login</button>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { 
  signIn,
  signOut,
})(FirebaseLogin);
