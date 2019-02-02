import React from 'react';
import styled from 'styled-components';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

function createIcons (count) {
  let element = [];
  for(let i = 0; i < count; i++ ) {
    element.push(<Icon key={i}/>);
  }
  return element;
}

const GoodCount = props => (
  <Wrapper>
    <Button 
      name="increment" 
      addClassName="is-primary" 
      onClick={props.onClick}
    >
    おいしい</Button>
    <Favos>{createIcons(props.value)}</Favos>
    <Button 
      type="button" 
      name="decrement" 
      addClassName="is-danger" 
      onClick={props.onClick}>
    ありゃま </Button>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Favos = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & div {
    width: 10%;
  }

`;

export default GoodCount;
