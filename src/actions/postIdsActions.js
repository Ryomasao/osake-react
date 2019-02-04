import firebaseREST from '../apis/firebase';
import { 
  FETCH_POSTIDS,
} from './types';

export const fetchPostIds = () => async dispatch => {
  const response = await firebaseREST.get(`/${process.env.REACT_APP_SAVE_POST_TO}.json?shallow=true`);
  // response data is...
  // @see /mock/dummyData/posts.js
  // { 
  //  id: { postdata }, 
  //  id: { postdata }, 
  //  }
  //
  dispatch({ type: FETCH_POSTIDS, payload: response.data});
};
