interface State {
  authReducer?: AuthReducerState;
  burgerMenuReducer?: BurgerReducerState;
}

interface AuthReducerState {
  auth: boolean;
}

interface LoaderReducerState {
  isLoading: boolean;
}

interface BurgerReducerState {
  burgerIsActive: boolean;
}

export {
  State, AuthReducerState, LoaderReducerState, BurgerReducerState,
};
