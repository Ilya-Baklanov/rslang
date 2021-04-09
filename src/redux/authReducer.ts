import { AnyAction } from 'redux';

import { AuthReducerState } from '@/types/states.types';

import {
  LOGIN, QUIT, LOGIN_TRUE, LOGIN_FALSE,
} from './constants';

function localStorageAuth() {
  switch (localStorage.getItem('isAuth')) {
    case LOGIN_TRUE:
      return true;
    case LOGIN_FALSE:
      return false;
    default:
      return false;
  }
}

const initialState: AuthReducerState = {
  auth: localStorageAuth(),
  authData: {
    userId: '',
    token: '',
  },
};

const authReducer = (state = initialState, action: AnyAction): AuthReducerState => {
  switch (action.type) {
    case LOGIN:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { ...state, auth: true, authData: action.payload };
    case QUIT:
      localStorage.setItem('isAuth', 'false');
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      return { ...state, auth: false };
    default:
      return state;
  }
};

export default authReducer;
