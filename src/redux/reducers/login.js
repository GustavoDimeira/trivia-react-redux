import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  gravatarHash: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case 'GRAVATAR_IMAGE':
    return {
      ...state,
      gravatarHash: action.gravatarHash,
    };
  default:
    return state;
  }
};

export default login;
