import { AnyAction } from 'redux';

type AnyActionCreator = () => AnyAction;

interface TestAction {
  type: string;
  payload?: string | number | null;
}

type TestActionCreator = (testPayload: string) => TestAction;

interface Actions {
  authAction?: AnyActionCreator;
  quitAction?: AnyActionCreator;
  showLoaderAction?: AnyActionCreator;
  hideLoaderAction?: AnyActionCreator;
  testAction?: TestActionCreator;
}

export {
  AnyActionCreator, TestAction, TestActionCreator, Actions,
};
