import React from 'react';
import styled from 'styled-components';
import DefaultHeader from '../organisms/Header';

const DefaultTemplate = props => {
  const Header = props.header ? props.header : DefaultHeader;

  return (
    <Wrapper>
      <header className="header">
        <Header />
      </header>
      <section className="section main">
        {props.children}
      </section>
      <footer className="footer">
        {props.footer}
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-family: 'Sawarabi Gothic', sans-serif;
  background-color: #eff0eb;
`;

export default DefaultTemplate;