import { render, fireEvent, wait } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { setUp } from '../utils/setup';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import IndexPage from './IndexPage';
import { 
  firebaseLogin as mockFirebaseLogin, 
  fireBaseAuthObserver  as mockFireBaseAuthObserver
} from '../../firebase';
import { signIn, signOut } from '../../actions';
import firebaseREST ,* as mockFirebaseREST from '../../apis/firebase';
import { posts, user } from '../../mock/dummyData';

jest.mock('../../firebase');
jest.mock('../../apis/firebase', () => (
  { get: jest.fn() }
));

afterEach(() => {
  mockFireBaseAuthObserver.mockClear();
  mockFirebaseREST.get.mockClear();
});

test('firebaseの認証情報取得中は、ちょっとまってねのモーダルが表示され、そこからログインモーダルが表示されること', async () => {
  // 認証状態を監視する関数を何もしない関数に置き換えとく
  mockFireBaseAuthObserver.mockImplementation(() => {});
  // mockが呼ばれたことを確認するため、jest.fnを返す
  mockFirebaseLogin.mockImplementation(() => jest.fn());
  //
  firebaseREST.get.mockResolvedValue({
    data: {}
  });

  const store = createStore(reducers, applyMiddleware(thunk));
  const targetComponent = setUp(IndexPage, store);
  const { getByTestId, getByText } = render(targetComponent);

  // 初回ロード時に、ちょっとまってねのモーダルが表示されること
  // テキストを変更した場合にテストが壊れない様に、toBeInTheDocumentのほうがいいかも？
  expect(getByTestId('loading-modal')).toHaveTextContent('ちょっとまってね');

  // firebaseの初期表示が未認証状態で終わった状態を再現
  store.dispatch(signOut());

  // ログイン用モーダルが表示されること
  expect(getByTestId('login-modal')).toBeInTheDocument();

  const LoginButton = getByText('ログインして利用する');
  // ログイン操作
  fireEvent.click(LoginButton);
  // 実際は外部認証サイトにリダイレクトするところを、mockが呼ばれたことでOKとする
  expect(mockFirebaseLogin).toHaveBeenCalled();
});

test('ログイン後は、アイテムの一覧が表示されること', async () => {
  const store = createStore(reducers, applyMiddleware(thunk));
  const targetComponent = setUp(IndexPage, store);

  // ログイン状態を再現
  store.dispatch(signIn(user));

  firebaseREST.get.mockResolvedValue({
    data: posts
  });

  const { getByTestId } = render(targetComponent);

  // PostItemが表示されていること
  await wait(() => expect(getByTestId('post-item')).toBeInTheDocument());

  //await wait(() => {
  //  return new Promise((resolve) => {
  //    setTimeout(() => resolve(), 3000)
  //  })
  //});
});




