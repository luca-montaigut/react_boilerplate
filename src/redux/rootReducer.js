
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import flashReducer from './reducers/flashReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
});

export default RootReducer