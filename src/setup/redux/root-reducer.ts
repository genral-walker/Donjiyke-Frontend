
import { combineReducers } from 'redux';
import salesReducer from './sales/salesReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  sales: salesReducer
});


export default rootReducer;

