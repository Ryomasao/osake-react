import { combineReducers } from 'redux';
import { FETCH_POSTS } from '../actions/types';

const postReducer = (state = {}, action) => {
  switch (action.type) {
  case FETCH_POSTS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default combineReducers({
  posts: postReducer
});


