import { 
  FETCH_POSTIDS,
} from '../actions/types';

const postIdsReducer = (state = {}, action) => {
  switch (action.type) {
  case FETCH_POSTIDS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default postIdsReducer;
