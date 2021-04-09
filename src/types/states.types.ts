import { AuthData } from '@/redux/actions.types';

interface State {
  authReducer?: AuthReducerState;
  loaderReducer?: LoaderReducerState;
  registrationReducer?: RegistrationReducerState;
  burgerMenuReducer?: BurgerReducerState;
}

interface AuthReducerState {
  auth: boolean;
  authData: AuthData;
}

interface LoaderReducerState {
  isLoading: boolean;
}

interface RegistrationReducerState {
  isRegistration: boolean;
}

interface BurgerReducerState {
  burgerIsActive: boolean;
}

export {
  State,
  AuthReducerState,
  LoaderReducerState,
  RegistrationReducerState,
  BurgerReducerState,
};
