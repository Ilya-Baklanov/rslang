interface State {
  authReducer: AuthReducerState;
}

interface AuthReducerState {
  auth: boolean;
}

interface LoaderReducerState {
  isLoading: boolean;
}

export { State, AuthReducerState, LoaderReducerState };
