import React from 'react';
import { connect } from 'react-redux';

import { showBurgerMenuAction, hideBurgerMenuAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { BurgerMenuProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import BurgerMenuItem from './BurgerMenuItem';
import styles from './style.scss';

const BurgerMenu = ({
  burgerIsActive,
  showBurgerMenuAction,
  hideBurgerMenuAction,
}: BurgerMenuProps): JSX.Element => (
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
          <a href="#/home/progress">
            <BurgerMenuItem sectionName="Прогресс" />
          </a>
        </li>
        <li>
          <a href="#/home/dictionary">
            <BurgerMenuItem sectionName="Словарь" />
          </a>
        </li>
        <li>
          <a href="#/home/mini-games">
            <BurgerMenuItem sectionName="Мини-игры" />
          </a>
        </li>
        <li>
          <a href="#/home/statistics">
            <BurgerMenuItem sectionName="Статистика" />
          </a>
        </li>
        <li>
          <a href="#/home/settings">
            <BurgerMenuItem sectionName="Настройки" />
          </a>
        </li>
        <li>
          <a href="#/home/developers">
            <BurgerMenuItem sectionName="Разработчики" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

const mapStateToProps = (state: State): BurgerMenuProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

const mapDispatchToProps: Actions = {
  showBurgerMenuAction,
  hideBurgerMenuAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
