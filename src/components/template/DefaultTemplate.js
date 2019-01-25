import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import DefaultHeader from '../organisms/Header';
import { fireBaseAuthObserver } from '../../firebase';

class DefaultTemplate extends React.Component {
  // @ToDO HOOKSを使えばFunctionalComponentにできるかな
  componentDidMount() {
    fireBaseAuthObserver(this.props.signIn, this.props.signOut);
  }

  render() {
    const Header = this.props.header ? this.props.header : DefaultHeader;
    const Body = this.props.body;

    return (
      <Wrapper>
        <header className="header">
          <Header isSignedIn={this.props.isSignedIn}/>
        </header>
        <section className="section main">
          <Body isSignedIn={this.props.isSignedIn}/>
        </section>
        <footer className="footer">
          {this.props.footer}
        </footer>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

const Wrapper = styled.div`
  font-family: 'Sawarabi Gothic', sans-serif;
  background-color: #eff0eb;
  color: #363636;
`;


export default connect(mapStateToProps, {
  signIn,
  signOut,
})(DefaultTemplate);