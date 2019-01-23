import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import PostList from './posts/PostList';
import PostShow from './posts/PostShow';
import PostCreate from './posts/PostCreate';
import PostEdit from './posts/PostEdit';

const App = () => (
  <BrowserRouter>
    <Wrapper className="container">
      <Header></Header>
      <Route path="/" exact component={PostList} />
      <Route path="/posts/new" exact component={PostCreate} />
      <Route path="/posts/show/:id" exact component={PostShow} />
      <Route path="/posts/edit/:id" exact component={PostEdit} />
    </Wrapper>
  </BrowserRouter>
);

const Wrapper = styled.div`
  font-family: 'Sawarabi Gothic', sans-serif;
`;



export default App;
