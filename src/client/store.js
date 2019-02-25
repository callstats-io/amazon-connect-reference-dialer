import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import acManager from './api/acManager';

const middlewares = [thunk];
const AppStore = createStore(rootReducer, applyMiddleware(...middlewares));
acManager.register(AppStore.dispatch);
export default AppStore;
