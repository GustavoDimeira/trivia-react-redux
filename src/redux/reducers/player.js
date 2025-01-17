import { POINT, USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case POINT:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case 'SCORE':
    return {
      ...state,
      score: action.score + state.score,
    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
    };
  case 'RESET_ASSERTIONS':
    return {
      ...state,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
