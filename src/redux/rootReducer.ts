import { combineReducers } from 'redux';

import authReducer from './authReducer';
import burgerMenuReducer from './burgerMenuReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
  authReducer,
  loaderReducer,
  burgerMenuReducer,
});

export default rootReducer;
