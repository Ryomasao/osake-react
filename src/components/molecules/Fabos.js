import React from 'react';
import styled from 'styled-components';
import Icon from '../atoms/Icon';

const Fabos = props => {
  const element = [];

  for(let i = 0; i < props.count; i++ ) {
    element.push(<Icon key={i}/>);
  }

  return (
    <FabosWrapper>
      {element}
    </FabosWrapper>
  ) ;
};

const FabosWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & div {
    width: 10%;
  }

`;

export default Fabos;
