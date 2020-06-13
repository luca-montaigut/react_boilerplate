
import { combineReducers } from 'redux';
import authReducer from './authentication/authReducer';
import flashReducer from './flashmessages/flashReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
});

export default RootReducer