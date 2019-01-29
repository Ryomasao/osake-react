# テスト備忘録
テストでハマったところを記載しておく。


### axiosをラップしてる関数のモック

#### テスト対象
<b>firebase.js</b>
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'https://hogehoge-firebase.com'
});
```

<b>actions/index.js</b>
```javascript
import firebase from '../apis/firebase';

export const fetchPost = id => async dispatch => {
  const response = await firebase.get(`/posts/${id}.json`);
  const post = { [id]: response.data };
  dispatch({ type: 'FETCH_POST', payload: post});
};
```

<b>PostEdit.js</b>
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../../actions';

class PostEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }
  render() {
    // 省略
  }
}
```

#### テストコード

<b>PostEdit.js</b>
```javascript
import firebase, * as mockFireBase from '../../apis/firebase';

jest.mock('../../apis/firebase', () => {
  return {get: () => Promise.resolve({
    data: {
      note: 'aaa'
    }
  })};
});
```
`mockImplementation`と`mockResolvedValue`が便利そうだけど、mock対象の`firebase`はなんの関数も返さないので、自動mockにならない。  
https://jestjs.io/docs/ja/mock-function-api#mockfnmockimplementationfn
https://jestjs.io/docs/ja/mock-function-api#mockfnmockresolvedvaluevalue

`mockReturnValue`は、関数が返せない。

なので上記のようにするか、下記のようにモックを返すように設定して、

<b>PostEdit.js</b>
```javascript
import firebase, * as mockFireBase from '../../apis/firebase';

jest.mock('../../apis/firebase', () => (
  { get: jest.fn() }
));
```

テスト内で、mockの設定をする。
```javascript
test('render post edit', async () => {
  firebase.get.mockResolvedValue({
    data: {
      note: 'note',
      date: '2018/12/31',
      favos: '1',
      imagePath: 'https://placehold.jp/150x150.png',
    }
  });
```

### Router配下のコンポーネントでprops.match.paramsを参照してる

https://reacttraining.com/react-router/web/api/Route/component


こんな感じで、Routeのrenderメソッドを使えばいい
```javascript
const setUp = TargetComponent => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route 
          render={
            props => { 
              // propsにつっこむぜ！
              props.match.params.id = '-LWfM_dJUDcxDdpAvOza';
              // なお、{...props } をしなくてもコンポーネント内で参照できる。なんでだろう。
              return <TargetComponent {...props}/>; 
            }
          }
        />
      </BrowserRouter>
    </Provider>
  );
};
```

### jestで特定のモジュールのみmockにしたい

mock対象のmodule
<b>firebase.ks</b>
```javascript
export const login = () => {
  // login用の何かしらの処理
};

export const logout = () => {
  // logout用の処理
};
```

```javascript
import { firebase as mockLogin } from '../../firebase';
// moduleの特定の関数のみmockにしたい
//https://github.com/facebook/jest/issues/936#issuecomment-445275844
jest.mock('../../firebase', () => ({
  ...jest.requireActual('../../firebase'),
  login: jest.fn() 
}));

test('特定のmoduleのみmockにした',  () => {
  fireEvent.click(LoginButton);
  expect(mockLogin).toHaveBeenCalled();
})

```

## jestのconfig
https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment

create-react-appでつくったパッケージの場合、`src/setupTest.js`に書いとくと勝手に読み込む。
本来は、package.jsonで参照先を書いたりするみたい。

jestのversion24をつかえるようになったら試す。create-react-appがjest23なので使ってない。
https://www.youtube.com/watch?v=VZEszZxeJQs



