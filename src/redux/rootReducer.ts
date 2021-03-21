import { combineReducers } from 'redux';

import authReducer from './authReducer';
import loaderReducer from './loaderReducer';
import registrationReducer from './registrationReducer';

const rootReducer = combineReducers({
  authReducer,
  loaderReducer,
  registrationReducer,
});

export default rootReducer;
