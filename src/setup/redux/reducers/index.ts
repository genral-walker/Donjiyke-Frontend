
import { combineReducers } from 'redux';
import ledgersReducer from './ledgers';
import salesReducer from './sales';
import stocksReducer from './stocks';
import userReducer from './user';
import usersReducer from './users';

const rootReducer = combineReducers({
  user: userReducer,
  sales: salesReducer,
  stocks: stocksReducer,
  users: usersReducer,
  ledgers: ledgersReducer       
});


export default rootReducer;

   