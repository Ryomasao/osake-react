import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import PostShowPage from './pages/PostShowPage';
import PostCreatePage from './pages/PostCreatePage';
import PostEditPage from './pages/PostEditPage';

const App = () => (
  <BrowserRouter>
    <React.Fragment>
      <Route path="/" exact component={IndexPage} />
      <Route path="/posts/new" exact component={PostCreatePage} />
      <Route path="/posts/show/:id" exact component={PostShowPage} />
      <Route path="/posts/edit/:id" exact component={PostEditPage} />
    </React.Fragment>
  </BrowserRouter>
);

export default App;
