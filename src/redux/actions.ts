import { AnyAction } from 'redux';

import {
  TestActionCreator,
  TestAction,
  AuthAction,
  AuthActionCreator,
} from '@/redux/actions.types';

import {
  LOADER_OFF,
  LOADER_ON,
  LOGIN,
  QUIT,
  REGISTRATION_SUCCESS,
  BURGER_ACTIVATED,
  BURGER_INACTIVATED,
} from './constants';

const authAction: AuthActionCreator = (authData): AuthAction => ({
  type: LOGIN,
  payload: authData,
});

const quitAction = (): AnyAction => ({
  type: QUIT,
});

const showLoaderAction = (): AnyAction => ({
  type: LOADER_ON,
});

const hideLoaderAction = (): AnyAction => ({
  type: LOADER_OFF,
});

const showBurgerMenuAction = (): AnyAction => ({
  type: BURGER_ACTIVATED,
});

const hideBurgerMenuAction = (): AnyAction => ({
  type: BURGER_INACTIVATED,
});

const testAction: TestActionCreator = (testPayload): TestAction => ({
  type: LOADER_OFF,
  payload: testPayload,
});

const registrationSuccess = (): AnyAction => ({
  type: REGISTRATION_SUCCESS,
});

export {
  authAction,
  quitAction,
  showLoaderAction,
  hideLoaderAction,
  registrationSuccess,
  showBurgerMenuAction,
  hideBurgerMenuAction,
  testAction,
};
