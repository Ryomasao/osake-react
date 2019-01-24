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

    return (
      <Wrapper>
        <header className="header">
          <Header />
        </header>
        <section className="section main">
          {this.props.children}
        </section>
        <footer className="footer">
          {this.props.footer}
        </footer>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  font-family: 'Sawarabi Gothic', sans-serif;
  background-color: #eff0eb;
`;

export default connect(null, {
  signIn,
  signOut,
})(DefaultTemplate);