import { combineReducers } from 'redux';
import { 
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
} from '../actions/types';

const postReducer = (state = {}, action) => {
  // stateはarrayじゃなくってObjectでもったほうがいい
  switch (action.type) {
  case FETCH_POSTS:
    return { ...state, ...action.payload };
  case FETCH_POST:
    return { ...state, ...action.payload };
  case CREATE_POST:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default combineReducers({
  posts: postReducer
});
