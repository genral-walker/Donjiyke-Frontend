
import { combineReducers } from 'redux';
import salesReducer from './sales';
import userReducer from './user';

const rootReducer = combineReducers({
  user: userReducer,
  sales: salesReducer
});


export default rootReducer;

