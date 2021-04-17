import { AnyActionCreator } from '@/redux/actions.types';

import { AggregatedWord } from './response.types';

interface AppProps {
  isAuth?: boolean;
}
interface AuthorizationProps {
  authAction: AnyActionCreator;
}

interface QuitActionProps {
  quitAction?: AnyActionCreator;
  burgerIsActive?: boolean;
  isAuth?: boolean;
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
  isAuth?: boolean;
}

interface DictionaryProps {
  isAuth?: boolean;
}

interface MiniGameProps {
  isAuth?: boolean;
}

interface WordCategorySwitcherProps {
  wordCategory: string;
  word: AggregatedWord;
  onSwitch: () => void;
}

interface StatisticProps {
  isAuth?: boolean;
}

interface SettingsProps {
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
  DictionaryProps,
  MiniGameProps,
  WordCategorySwitcherProps,
  StatisticProps,
  SettingsProps,
  BurgerMenuProps,
  QuitActionProps,
  MainContentProps,
  MiniGamesProps,
  MiniGamesCardsProps,
  UserInfoProps,
};
