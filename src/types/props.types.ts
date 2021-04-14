import { AnyActionCreator } from '@/redux/actions.types';

interface AppProps {
  isAuth?: boolean;
}
interface AuthorizationProps {
  authAction: AnyActionCreator;
}

interface QuitActionProps {
  quitAction?: AnyActionCreator;
  burgerIsActive?: boolean;
}

interface TextBookProps {
  burgerIsActive?: boolean;
  hideBurgerMenuAction?: AnyActionCreator;
  isAuth?: boolean;
}

interface ProgressProps {
  loaderIsActive?: boolean;
}

interface LearningCardProps {
  filterType: string;
  showLoaderAction?: AnyActionCreator;
  hideLoaderAction?: AnyActionCreator;
  loaderIsActive?: boolean;
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

interface UserInfoProps {
  burgerIsActive?: boolean;
  quitAction?: AnyActionCreator;
}

export {
  AppProps,
  AuthorizationProps,
  TextBookProps,
  ProgressProps,
  LearningCardProps,
  BurgerMenuProps,
  QuitActionProps,
  MainContentProps,
  MiniGamesProps,
  MiniGamesCardsProps,
  UserInfoProps,
};
