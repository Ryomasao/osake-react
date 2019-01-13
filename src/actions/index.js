import firebase from '../apis/firebase';
import { FETCH_POSTS } from './types';

export const fetchPosts = () => async dispatch => {
  const response = await firebase.get('/articles.json');
  dispatch({ type: FETCH_POSTS, payload: response.data});
};
