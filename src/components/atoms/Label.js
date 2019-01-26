import React from 'react';

const LabelComponent = props => {
  return <label className="label" {...props} >{props.children}</label>;
};

export default LabelComponent;
