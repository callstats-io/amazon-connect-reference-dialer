import { combineReducers } from 'redux';
import acReducer from './acReducer';

const rootReducer = combineReducers({
  acReducer: acReducer
});

export default rootReducer;
