import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';


export const setUp = (TargetComponent, store, id = null) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route 
          render={
            props => { 
              props.match.params = { id };
              return <TargetComponent {...props}/>; 
            }
          }
        />
      </BrowserRouter>
    </Provider>
  );
};
