import { AnyActionCreator } from '@/redux/actions.types';

interface AppProps {
  isAuth?: boolean;
}
interface AuthorizationProps {
  authAction: AnyActionCreator;
}

interface QuitActionProps {
  quitAction: AnyActionCreator;
}

interface TextBookProps {
  burgerIsActive?: boolean;
  hideBurgerMenuAction?: AnyActionCreator;
}

interface BurgerMenuProps {
  burgerIsActive?: boolean;
  sectionName?: string;
  showBurgerMenuAction?: AnyActionCreator;
  hideBurgerMenuAction?: AnyActionCreator;
}

export {
  AppProps, AuthorizationProps, TextBookProps, BurgerMenuProps, QuitActionProps,
};
