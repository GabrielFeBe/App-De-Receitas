import { combineReducers } from 'redux';
import login from './login';
import recommend from './recommend';

const rootReducer = combineReducers({
  login,
  recommend,
});

export default rootReducer;
