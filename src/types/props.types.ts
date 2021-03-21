import { AnyActionCreator } from '@/redux/actions.types';

interface AppProps {
  isAuth?: boolean;
}
interface AuthorizationProps {
  authAction: AnyActionCreator;
}

interface TextBookProps {
  burgerIsActive?: boolean;
  showBurgerMenuAction?: AnyActionCreator;
  hideBurgerMenuAction?: AnyActionCreator;
}

interface BurgerMenuProps {
  burgerIsActive?: boolean;
}

export {
  AppProps, AuthorizationProps, TextBookProps, BurgerMenuProps,
};
