/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';

import { hideBurgerMenuAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { TextBookProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import Footer from '../MainPage/Footer/Footer';
import GuestUserInfo from '../MainPage/Header/GuestUserInfo';
import LoggedUserInfo from '../MainPage/Header/LoggedUserInfo';
import QuitButton from '../UI/buttons/QuitButton';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import Header from './Header/Header';
import Main from './Main/Main';
import styles from './style.scss';

const TextBook = ({ burgerIsActive, hideBurgerMenuAction, isAuth }: TextBookProps): JSX.Element => (
  <div className={styles['text-book-wrapper']}>
    <header className={styles['text-book-header']}>
      <Header />
    </header>

    <main className={styles['text-book-main']}>
      <div className={burgerIsActive ? styles['burger-wrapper_active'] : styles['burger-wrapper']}>
        <BurgerMenu />
        {isAuth ? <LoggedUserInfo /> : <GuestUserInfo />}
        <QuitButton />
      </div>
      <div className={styles['main-wrapper']}>
        <div className={styles['main-container']}>
          <Main />
        </div>
      </div>
    </main>

    <footer className={styles['footer-wrapper']}>
      <div className={styles['footer-container']}>
        <Footer />
      </div>
    </footer>

    <div
      onClick={hideBurgerMenuAction}
      className={burgerIsActive ? styles['overlay_active'] : styles['overlay']}
    />
  </div>
);

const mapStateToProps = (state: State): TextBookProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
  isAuth: state.authReducer!.auth,
});

const mapDispatchToProps: Actions = {
  hideBurgerMenuAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBook);
