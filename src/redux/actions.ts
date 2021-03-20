import { AnyAction } from 'redux';

import { TestActionCreator, TestAction } from '@/redux/actions.types';

import {
  LOADER_OFF, LOADER_ON, LOGIN, QUIT,
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

export {
  authAction, quitAction, showLoaderAction, hideLoaderAction, testAction,
};
