import { render, fireEvent } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { setUp } from '../utils/setup';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import IndexPage from './IndexPage';
import { 
  firebaseLogin as mockFirebaseLogin, 
  fireBaseAuthObserver  as mockFireBaseAuthObserver
} from '../../firebase';
import { signOut } from '../../actions';

// moduleの特定の関数のみmockにしたい
//https://github.com/facebook/jest/issues/936#issuecomment-445275844
//jest.mock('../../firebase', () => ({
//  ...jest.requireActual('../../firebase'),
//  firebaseLogin: jest.fn() 
//}));

jest.mock('../../firebase');

test('firebaseの認証情報取得中は、ちょっとまってねのモーダルが表示されること', async () => {

  // 認証状態を監視する関数を何もしない関数に置き換えとく
  mockFireBaseAuthObserver.mockImplementation(() => {});
  // mockが呼ばれたことを確認するため、jest.fnを返す
  mockFirebaseLogin.mockImplementation(() => jest.fn());

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
