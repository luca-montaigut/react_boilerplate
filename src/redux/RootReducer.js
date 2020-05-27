
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const RootReducer = combineReducers({
  auth: authReducer,
});

export default RootReducer