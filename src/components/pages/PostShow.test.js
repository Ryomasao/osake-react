import { render, wait } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { setUp } from '../utils/setup';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import { 
  fireBaseAuthObserver  as mockFireBaseAuthObserver
} from '../../firebase';
import { signIn } from '../../actions';
import firebaseREST from '../../apis/firebase';
import { post as mockPost, user as mockUser } from '../../mock/dummyData';
import PostShowPage from './PostShowPage';

jest.mock('../../firebase');
jest.mock('../../apis/firebase', () => (
  { get: jest.fn() }
));

describe('詳細ページのテスト=>', () => {
  // 認証状態を監視する関数を何もしない関数に置き換えとく
  mockFireBaseAuthObserver.mockImplementation(() => {});

  test('詳細ページをみた場合に、コンテンツが表示されていること', async () => {
    // APIがダミーデータを返すようにしておく
    firebaseREST.get.mockResolvedValue({
      data: mockPost
    });

    // ログイン状態にしておく
    const store = createStore(reducers, applyMiddleware(thunk));
    store.dispatch(signIn(mockUser));

    const id = 'id';
    const targetComponent = setUp(PostShowPage, store, id);
    const { getByText } = render(targetComponent);

    // APIで取得した結果が表示されていること
    // 全部の要素はかかない
    await wait(() => expect(getByText(mockPost.date)).toBeInTheDocument());
  });

  test('他人のデータを参照した場合、コントロールボタンは表示されないこと', async () => {

    //参照データと、ログインユーザーは別にしておく
    const post = {...mockPost, userId: 'hoge'};
    const user = {...mockUser, uid: 'fuga'};

    // APIがダミーデータを返すようにしておく
    firebaseREST.get.mockResolvedValue({
      data: post
    });

    // ログイン状態にしておく
    const store = createStore(reducers, applyMiddleware(thunk));
    store.dispatch(signIn(user));

    const id = 'id';
    const targetComponent = setUp(PostShowPage, store, id);
    const { queryByText } = render(targetComponent);

    // コントール系のボタンがないこと
    await wait(() => expect(queryByText('おもいでを編集する')).not.toBeInTheDocument());
  });

  test('自分の詳細ページをみた場合に、コントール系のボタンが表示されていること', async () => {
    //参照データと、ログインユーザーは同一にしておく
    const post = {...mockPost, userId: 'fuga'};
    const user = {...mockUser, uid: 'fuga'};

    // APIがダミーデータを返すようにしておく
    firebaseREST.get.mockResolvedValue({
      data: post
    });

    // ログイン状態にしておく
    const store = createStore(reducers, applyMiddleware(thunk));
    store.dispatch(signIn(user));
  
    const id = 'id';
    const targetComponent = setUp(PostShowPage, store, id);
    const { getByText } = render(targetComponent);
  
    // コントール系のボタンがあること
    await wait(() => expect(getByText('おもいでを編集する')).toBeInTheDocument());
  });

});

