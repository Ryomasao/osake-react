import React from 'react';
import styled from 'styled-components';

const LoginButtons = props => {
  return (
    <Buttons>
      { props.children }
    </Buttons>
  );
};

const Buttons = styled.div`
  width: 100%;

  button {
    margin-bottom: 0.5rem;
  }

`;

export default LoginButtons;
