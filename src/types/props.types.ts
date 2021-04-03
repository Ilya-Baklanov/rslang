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
  isAuth?: boolean;
}

interface MainContentProps {
  isAuth?: boolean;
}

interface MiniGamesProps {
  isAuth?: boolean;
}

interface MiniGamesCardsProps {
  isAuth?: boolean;
}

interface BurgerMenuProps {
  burgerIsActive?: boolean;
  sectionName?: string;
  isAuth?: boolean;
  showBurgerMenuAction?: AnyActionCreator;
  hideBurgerMenuAction?: AnyActionCreator;
}

export {
  AppProps,
  AuthorizationProps,
  TextBookProps,
  BurgerMenuProps,
  QuitActionProps,
  MainContentProps,
  MiniGamesProps,
  MiniGamesCardsProps,
};
