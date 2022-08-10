import { combineReducers } from 'redux';
import login from './login';
import feedback from './feedback';
import player from './player';

const rootReducer = combineReducers({
  login,
  feedback,
  player,
});

export default rootReducer;
