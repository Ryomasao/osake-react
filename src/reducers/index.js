import { combineReducers } from 'redux';
import postReducer from './postReducer';
import postIdsReducer from './postIdsReducer';
import authReducer from './authReducer';

export default combineReducers({
  posts: postReducer,
  postIds: postIdsReducer,
  auth: authReducer
});