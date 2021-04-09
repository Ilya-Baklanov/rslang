import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { showBurgerMenuAction, hideBurgerMenuAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { BurgerMenuProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import BurgerMenuItem from './BurgerMenuItem';
import styles from './style.scss';

const BurgerMenu = ({
  burgerIsActive,
  isAuth,
  showBurgerMenuAction,
  hideBurgerMenuAction,
}: BurgerMenuProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <div className={styles['burger-menu-wrapper']}>
      <button
        className={
          burgerIsActive ? styles['burger-menu-button_active'] : styles['burger-menu-button']
        }
        type="button"
        onClick={burgerIsActive ? hideBurgerMenuAction : showBurgerMenuAction}
      >
        <img
          className={styles['burger-menu-icon']}
          src="../../../assets/image/burger-menu_icon.png"
          alt="menu"
        />
      </button>
      <nav className={styles['burger-menu-navbar']}>
        <ul className={styles['burger-menu-navbar-list']}>
          <li>
            <Link to={`${currentLocation}/progress`}>
              <BurgerMenuItem sectionName="Прогресс" />
            </Link>
          </li>
          <li>
            <Link to={`${currentLocation}/dictionary`}>
              <BurgerMenuItem sectionName="Словарь" />
            </Link>
          </li>
          <li>
            <Link to={`${currentLocation}/mini-games`}>
              <BurgerMenuItem sectionName="Мини-игры" />
            </Link>
          </li>
          <li>
            <Link to={`${currentLocation}/statistics`}>
              <BurgerMenuItem sectionName="Статистика" />
            </Link>
          </li>
          <li>
            <Link to={`${currentLocation}/settings`}>
              <BurgerMenuItem sectionName="Настройки" />
            </Link>
          </li>
          <li>
            <Link to={`${currentLocation}/developers`}>
              <BurgerMenuItem sectionName="Разработчики" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state: State): BurgerMenuProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
  isAuth: state.authReducer!.auth,
});

const mapDispatchToProps: Actions = {
  showBurgerMenuAction,
  hideBurgerMenuAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
