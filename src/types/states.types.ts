interface State {
  authReducer: AuthReducerState;
}

interface AuthReducerState {
  auth: boolean;
}

interface LoaderReducerState {
  isLoading: boolean;
}

interface RegistrationReducerState {
  isRegistration: boolean;
}

export {
  State, AuthReducerState, LoaderReducerState, RegistrationReducerState,
};
