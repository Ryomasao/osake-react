import _ from 'lodash';
import firebaseREST from '../apis/firebase';
import firebase from '../firebase';
import { 
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
} from './types';

export const fetchPosts = () => async dispatch => {
  const response = await firebaseREST.get(`/${process.env.REACT_APP_SAVE_POST_TO}.json`);
  // response data is...
  // @see /mock/dummyData/posts.js
  // { 
  //  id: { postdata }, 
  //  id: { postdata }, 
  //  }
  //

  const posts = response.data;

  // keyをプロパティに含めて
  for(let id in posts) {
    posts[id] = { ...posts[id] , id: id };
  }
  // arrayに変換した上で、dateの降順で並び替えとく
  // https://codepen.io/tohu/pen/YBQeWK

  const orderedArray = _.orderBy(_.toPairs(posts), o => {
    return [ o[1].date, o[1].createdAt ];
  }, ['desc', 'desc']);

  const orderedObj = _.fromPairs(orderedArray);

  dispatch({ type: FETCH_POSTS, payload: orderedObj});
};

export const fetchPost = id => async dispatch => {
  const response = await firebaseREST.get(`/${process.env.REACT_APP_SAVE_POST_TO}/${id}.json`);
  // response data is...
  // { 
  //   postdata, 
  // }
  //
  // add key to postdata

  // fetchPostsにあわせて、idをvalueに含める
  const post = { [id]: {...response.data, id } };
  dispatch({ type: FETCH_POST, payload: post});
};

export const createPost = formValue => async (dispatch, getState) => {
  const token = await getState().auth.user.getIdToken(true);
  const userId = getState().auth.userId;

  const imagePath = await _uploadImage(formValue);
  const post = { ...formValue.post,
    imagePath,
    userId,
    createdAt: new Date().toISOString()
  };
  const response = await firebaseREST.post(`/${process.env.REACT_APP_SAVE_USER_TO}/${userId}/posts.json?auth=${token}`, post );

  const createdPost = { [response.data.name]: post };
  dispatch({ type: CREATE_POST, payload: createdPost});
};

export const editPost = (id, formValue) => async (dispatch, getState) => {
  const token = await getState().auth.user.getIdToken(true);
  // 認証済みユーザーのIDではなく、postのuseridを使うべきな気もする。
  // クライアントで無理やり、userのidとpostのidをあわせると、編集ボタンがだせるから。
  // といっても、クライアントはなんでもありなので、他人のデータに更新かけれないようにするとかは、
  // サーバ側でやるべきだからいいかな。
  const userId = getState().auth.userId;

  // formValueにはimagePathが含まれないので、stateから取得する
  let imagePath = getState().posts[id].imagePath;

  // imgaeが設定されている場合、アップロード後のURLを設定する
  if (formValue.image.file) {
    imagePath = await _uploadImage(formValue);
  }
  
  const post = { ..._.omit(formValue.post, 'userId'),
    imagePath,
    updatedAt: new Date().toISOString()
  };
  const response = await firebaseREST.patch(`/${process.env.REACT_APP_SAVE_USER_TO}/${userId}/posts/${id}.json?auth=${token}`, post );

  const editedPost = { [id]: response.data };
  dispatch({ type: EDIT_POST, payload: editedPost});
};

export const deletePost = id => async (dispatch, getState) => {
  const token = await getState().auth.user.getIdToken(true);
  const userId = getState().auth.userId;

  await firebaseREST.delete(`/${process.env.REACT_APP_SAVE_USER_TO}/${userId}/posts/${id}.json?auth=${token}`);
  dispatch({ type: DELETE_POST, payload: id });
};

const _uploadImage = async ({ image }) => {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`${process.env.REACT_APP_SAVE_POST_IMAGE_TO}`);
  const createdDate = new Date().getTime();
  const spaceRef = imageRef.child(`${createdDate}_${image.name}`);
  await spaceRef.put(image.file)
    .catch(error => {
      // eslint-disable-next-line
      console.error('Image Upload Error:', error);
      throw error;
    });
  
  const bucketName = 'osake-d4cfe.appspot.com';
  const filePath = spaceRef.fullPath;
  // 画像のURLはこんな形式に設定されるみたい
  const imagePath = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
  return imagePath;
};
