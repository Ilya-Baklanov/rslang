import { AnyAction } from 'redux';

import { BurgerReducerState } from '@/types/states.types';

import { BURGER_ACTIVATED, BURGER_INACTIVATED } from './constants';

const initialState: BurgerReducerState = {
  burgerIsActive: false,
};

const burgerMenuReducer = (state = initialState, action: AnyAction): BurgerReducerState => {
  switch (action.type) {
    case BURGER_ACTIVATED:
      return { ...state, burgerIsActive: true };
    case BURGER_INACTIVATED:
      return { ...state, burgerIsActive: false };
    default:
      return state;
  }
};

export default burgerMenuReducer;
