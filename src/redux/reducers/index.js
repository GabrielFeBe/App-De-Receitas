import { combineReducers } from 'redux';
import login from './login';
import recommend from './recommend';
import search from './search';

const rootReducer = combineReducers({
  login,
  search,
  recommend,

});

export default rootReducer;
