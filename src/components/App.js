import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PostList from './posts/PostList';
import PostShow from './posts/PostShow';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';

const App = () => (
  <div className="container">
    <BrowserRouter>
      <div>
        <h1>Header</h1>
        <Route path="/" exact component={PostList} />
        <Route path="/posts/new" exact component={PostCreate} />
        <Route path="/posts/show/:id" exact component={PostShow} />
        <Route path="/posts/edit/:id" exact component={PostEdit} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
