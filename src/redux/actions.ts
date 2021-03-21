import { AnyAction } from 'redux';

import { TestActionCreator, TestAction } from '@/redux/actions.types';

import {
  LOADER_OFF, LOADER_ON, LOGIN, QUIT, REGISTRATION_SUCCESS,
} from './constants';

const authAction = (): AnyAction => ({
  type: LOGIN,
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
  testAction,
  registrationSuccess,
};
