import firebase from '../apis/firebase';
import fireStorage from '../apis/firestorage';
import { 
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
} from './types';

export const fetchPosts = () => async dispatch => {
  const response = await firebase.get('/posts.json');
  dispatch({ type: FETCH_POSTS, payload: response.data});
};

export const fetchPost = id => async dispatch => {
  const response = await firebase.get(`/posts/${id}.json`);
  dispatch({ type: FETCH_POST, payload: response.data});
};

export const createPost = formValue => async dispatch => {
  const imagePath = await _uploadImage(formValue);
  const post = { ...formValue.post,
    imagePath,
    createdAt: new Date().toISOString()
  };
  const response = await firebase.post('/posts.json', post );
  const createdPost = { [response.data.name]: post };
  dispatch({ type: CREATE_POST, payload: createdPost});
};

const _uploadImage = async ({ image }) => {
  const storageRef = fireStorage.storage().ref();
  const imageRef = storageRef.child('osake-images');
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
