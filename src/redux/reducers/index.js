import { combineReducers } from 'redux';
import login from './login';
import feedback from './feedback';

const rootReducer = combineReducers({
  login,
  feedback,
});

export default rootReducer;
