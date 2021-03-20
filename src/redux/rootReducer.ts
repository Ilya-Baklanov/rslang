import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loaderReducer from './loaderReducer';

const rootReducer = combineReducers({
  authReducer,
  loaderReducer,
});

export default rootReducer;
