
import { combineReducers } from 'redux';
import salesReducer from './sales';
import stocksReducer from './stocks';
import userReducer from './user';
import usersReducer from './users';

const rootReducer = combineReducers({
  user: userReducer,
  sales: salesReducer,
  stocks: stocksReducer,
  users: usersReducer       
});


export default rootReducer;

   