import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';

const GoodCount = props => (
  <Wrapper>
    <Button 
      name="increment" 
      addClassName="is-primary" 
      onClick={props.onClick}
    >
    おいしい</Button>
    <span>{props.value}</span>
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
`;

export default GoodCount;

