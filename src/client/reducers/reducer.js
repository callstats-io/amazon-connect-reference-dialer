import {combineReducers} from "redux";
import loginReducer from './login'
import callReducer from './call'

const rootReducer = combineReducers({
	login: loginReducer,
	call: callReducer,
});

export default rootReducer;
