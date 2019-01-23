import { 
  SIGN_IN,
  SIGN_OUT,
} from './types';


export const signIn = (user) => {
  return { type: SIGN_IN, payload: {
    user,
    userId: user.uid,
    userNmae: user.displayName,
  }};
};

export const signOut = () => {
  return { type: SIGN_OUT };
};
