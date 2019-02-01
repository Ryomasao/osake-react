import { render, fireEvent, wait } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { setUp } from '../utils/setup';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import PostCretePage from './PostCreatePage';

// PostCreatePage特有のロジックがないのでPostForm or PostCreateとしてテストしたほうがいいのかな
// なのでスキップ
test.skip('投稿ページが表示されること', async ()=> {

  const store = createStore(reducers, applyMiddleware(thunk));
  const targetComponent =  setUp(PostCretePage, store);
  const { getByText } = render(targetComponent);
  const submitButton = getByText('投稿する');

  fireEvent.click(submitButton);

  // なにも入力しないで投稿した場合、しゃしんのバリデーションでエラーになる
  await wait(() => {
    expect(getByText('しゃしんは必須だよ！')).toBeInTheDocument();
  });

});