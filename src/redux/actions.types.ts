import { AnyAction } from 'redux';

type AnyActionCreator = () => AnyAction;

interface TestAction {
  type: string;
  payload?: string | number | null;
}

type TestActionCreator = (testPayload: string) => TestAction;

interface AuthAction {
  type: string;
  payload?: AuthData;
}

interface AuthData {
  userId: string;
  token: string;
}

type AuthActionCreator = (authData: AuthData) => AuthAction;

interface Actions {
  quitAction?: AnyActionCreator;
  showLoaderAction?: AnyActionCreator;
  hideLoaderAction?: AnyActionCreator;
  showBurgerMenuAction?: AnyActionCreator;
  hideBurgerMenuAction?: AnyActionCreator;
  testAction?: TestActionCreator;
  authAction?: AuthActionCreator;
}

export {
  AnyActionCreator,
  TestAction,
  TestActionCreator,
  Actions,
  AuthAction,
  AuthData,
  AuthActionCreator,
};
