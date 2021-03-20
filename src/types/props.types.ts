import { AnyActionCreator } from '@/redux/actions.types';

interface AppProps {
  isAuth?: boolean;
}
interface AuthorizationProps {
  authAction: AnyActionCreator;
}

export { AppProps, AuthorizationProps };
