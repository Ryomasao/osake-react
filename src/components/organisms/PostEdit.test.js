import 'jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import postReducer from '../../reducers/postReducer';
import PostEdit from './PostEdit';
import firebase, * as mockFireBase from '../../apis/firebase';

jest.mock('../../apis/firebase', () => (
  { get: jest.fn() }
));

const store = createStore(postReducer, applyMiddleware(thunk));

const setUp = (TargetComponent, id) => {
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

test('render post edit', async () => {

  firebase.get.mockResolvedValue({
    data: {
      note: 'note',
      date: '2018/12/31',
      favos: '1',
      imagePath: 'https://placehold.jp/150x150.png',
    }
  });
  const id = '-LWfM_dJUDcxDdpAvOza';
  const target = setUp(PostEdit, id);
  const { getByTestId } = render(target);

  // mockが呼ばれたかどうか
  expect(mockFireBase.get).toHaveBeenCalled();
  // mockに渡された引数のチェック
  expect(mockFireBase.get).toHaveBeenCalledWith(`/posts/${id}.json`);
  // fetchが終わって、post-formが見えるようになるまで待機
  // expectは必須じゃなくって、検証もかねてるからいれてるだけ
  await wait(() => expect(getByTestId('post-form')).toBeInTheDocument());
});
