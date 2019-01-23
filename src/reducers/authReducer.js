import {
  SIGN_IN,
  SIGN_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isSignedIn: null,
  userId: null,
  userName: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGN_IN:
    return { ...state, ...action.payload };
  case SIGN_OUT:
    return { ...state, ...INITIAL_STATE };
  default:
    return state;
  }
};

export default authReducer;
