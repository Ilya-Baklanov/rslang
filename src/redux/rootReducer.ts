import { combineReducers } from 'redux';

import authReducer from './authReducer';
import burgerMenuReducer from './burgerMenuReducer';
import loaderReducer from './loaderReducer';
import registrationReducer from './registrationReducer';

const rootReducer = combineReducers({
  authReducer,
  loaderReducer,
  registrationReducer,
  burgerMenuReducer,
});

export default rootReducer;
