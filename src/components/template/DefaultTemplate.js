import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn, signOut } from '../../actions';
import DefaultHeader from '../organisms/Header';
import DefaultFooter from '../organisms/Footer';
import { fireBaseAuthObserver } from '../../firebase';
import Colors from '../atoms/Colors';

class DefaultTemplate extends React.Component {
  // @ToDO HOOKSを使えばFunctionalComponentにできるかな
  componentDidMount() {
    fireBaseAuthObserver(this.props.signIn, this.props.signOut);
  }

  render() {
    const Header = this.props.header ||DefaultHeader;
    const Footer = this.props.header ||DefaultFooter;
    const Body = this.props.body;

    return (
      <Wrapper>
        <header className="header">
          <Header isSignedIn={this.props.isSignedIn}/>
        </header>
        <main>
          <Body isSignedIn={this.props.isSignedIn}/>
        </main>
        <footer className="footer" style={{ backgroundColor: `${Colors.mainBackground}`} }>
          <Footer />
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