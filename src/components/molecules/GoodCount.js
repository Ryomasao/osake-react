import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Fabos from './Fabos';

const GoodCount = props => (
  <Wrapper>
    <Button 
      name="increment" 
      addClassName="is-primary" 
      onClick={props.onClick}
    >
    おいしい</Button>
    <Fabos count={props.value}/>
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

export default GoodCount;
