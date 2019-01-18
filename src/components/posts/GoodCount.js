import React from 'react';

const GoodCount = (props) => (
  <div>
    <p>いいね： {props.value}</p>
    <button type="button" name="increment" onClick={props.onClick}>+</button>
    <button type="button" name="decrement" onClick={props.onClick}>-</button>
  </div>
);

export default GoodCount;
