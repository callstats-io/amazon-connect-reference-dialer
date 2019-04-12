import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import acManager from './api/acManager';

const middlewares = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const AppStore = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
	applyMiddleware(...middlewares)
));

acManager.register(AppStore.dispatch);
export default AppStore;
