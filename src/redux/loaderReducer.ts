import { AnyAction } from 'redux';

import { LoaderReducerState } from '@/types/states.types';

import { LOADER_OFF, LOADER_ON } from './constants';

const initialState: LoaderReducerState = {
  isLoading: true,
};

const loaderReducer = (state = initialState, action: AnyAction): LoaderReducerState => {
  switch (action.type) {
    case LOADER_ON:
      return { ...state, isLoading: true };
    case LOADER_OFF:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loaderReducer;
