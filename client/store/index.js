import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import activity from './activity';
import activities from './activities';
import followers from './followers';
import suggested from './suggested';

const reducer = combineReducers({user, activity, activities, followers, suggested});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './activity';
export * from './activities';
export * from './followers';
export * from './suggested';
