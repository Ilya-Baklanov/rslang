import { AnyAction } from 'redux';

import { RegistrationReducerState } from '@/types/states.types';

import { REGISTRATION_SUCCESS, QUIT } from './constants';

const initialState: RegistrationReducerState = {
  isRegistration: false,
};

const registrationReducer = (state = initialState, action: AnyAction): RegistrationReducerState => {
  switch (action.type) {
    case REGISTRATION_SUCCESS:
      return { ...state, isRegistration: true };
    case QUIT:
      return { ...state, isRegistration: false };
    default:
      return state;
  }
};

export default registrationReducer;
