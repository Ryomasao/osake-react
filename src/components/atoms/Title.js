import React from 'react';

const TitleComponent = props => {
  return <h4 className="title is-4" {...props}>{props.children}</h4>;
};

export default TitleComponent;
