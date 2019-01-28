import { render, wait } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { setUp } from '../utils/setup';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import IndexPage from './IndexPage';


test('未認証時には、ログイン用のモーダルが見えること', async () => {

  const store = createStore(reducers, applyMiddleware(thunk));
  const targetComponent = setUp(IndexPage, store);
  const { getByTestId, debug } = render(targetComponent);
  debug();
  await wait(() => getByTestId('loading-modal'))
  debug();

});