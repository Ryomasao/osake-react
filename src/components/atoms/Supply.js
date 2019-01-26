import React from 'react';
import styled, { css } from  'styled-components';

const SupplyComponent = props => {
  return <Supply {...props}>{props.children}</Supply>;
};

const Supply = styled.div`
  font-size: 0.8rem;
  color: gray;

  ${props => props.error && css`
    color: red;
  `}
`;

export default SupplyComponent;
