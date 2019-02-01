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
    const HeaderContent = this.props.header ||DefaultHeader;
    const FooterContent = this.props.header ||DefaultFooter;
    const Body = this.props.body;

    return (
      <Wrapper>
        <header className="header">
          <HeaderContent isSignedIn={this.props.isSignedIn}/>
        </header>
        <Main>
          <Body isSignedIn={this.props.isSignedIn}/>
        </Main>
        <Footer style={{ backgroundColor: `${Colors.footer}`} }>
          <FooterContent />
        </Footer>
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

//102px = headerHeight + footerHeight
const Main = styled.main`
  min-height: calc(100vh - 102px);
`;

const Footer = styled.footer`
  height: 50px;
  background-color: ${Colors.footer};
`;


export default connect(mapStateToProps, {
  signIn,
  signOut,
})(DefaultTemplate);