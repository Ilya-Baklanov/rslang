import { AnyAction } from 'redux';

import { AuthReducerState } from '@/types/states.types';

import { LOGIN, QUIT } from './constants';

const initialState: AuthReducerState = {
  auth: false,
};

const authReducer = (state = initialState, action: AnyAction): AuthReducerState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, auth: true };
    case QUIT:
      return { ...state, auth: false };
    default:
      return state;
  }
};

export default authReducer;
