import firebase from '../apis/firebase';
import { 
  FETCH_POSTS,
  FETCH_POST,
} from './types';

export const fetchPosts = () => async dispatch => {
  const response = await firebase.get('/articles.json');
  dispatch({ type: FETCH_POSTS, payload: response.data});
};

export const fetchPost = id => async dispatch => {
  const response = await firebase.get(`/articles/${id}.json`);
  dispatch({ type: FETCH_POST, payload: response.data});
};
