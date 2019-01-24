import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import PostShow from './pages/PostShow';
import PostCreate from './pages/PostCreate';
import PostEdit from './pages/PostEdit';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path="/" exact component={IndexPage} />
      <Route path="/posts/new" exact component={PostCreate} />
      <Route path="/posts/show/:id" exact component={PostShow} />
      <Route path="/posts/edit/:id" exact component={PostEdit} />
    </React.Fragment>
  </BrowserRouter>
);

export default App;
