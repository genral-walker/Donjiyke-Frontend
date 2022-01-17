
import { combineReducers } from 'redux';
import ledgersReducer from './ledgers';
import salesReducer from './sales';
import stocksReducer from './stocks';
import userReducer from './user';
import usersReducer from './users';
import paymentsReducer from './payments';
const rootReducer = combineReducers({
  user: userReducer,
  sales: salesReducer,
  stocks: stocksReducer,
  users: usersReducer,
  ledgers: ledgersReducer,
  payments: paymentsReducer    
});


export default rootReducer;

   