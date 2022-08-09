import { POINT } from '../actions';

const INITIAL_STATE = {
  points: 0,
};

const pointReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case POINT:
    return {
      ...state,
      points: action.points + 1,
    };
  default:
    return state;
  }
};

export default pointReducer;
