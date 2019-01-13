import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PostList from './posts/PostList';
import PostShow from './posts/PostShow';

const App = () => (
  <div className="container">
    <BrowserRouter>
      <div>
        <h1>Header</h1>
        <Route path="/" exact component={PostList} />
        <Route path="/articles/show/:id" exact component={PostShow} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
