import React from 'react';
import { connect } from 'react-redux';

import { BurgerMenuProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const BurgerMenu = ({ burgerIsActive }: BurgerMenuProps): JSX.Element => (
  <div className={styles['burger-menu-wrapper']}>
    <nav className={styles['burger-menu-navbar']}>
      <ul className={styles['burger-menu-navbar-list']}>
        <li>
          <a href="#progress">{burgerIsActive ? 'Прогресс' : 'П'}</a>
        </li>
        <li>
          <a href="#dictionary">Словарь</a>
        </li>
        <li>
          <a href="#mini-game">Мини-игры</a>
        </li>
        <li>
          <a href="#statistics">Статистика</a>
        </li>
        <li>
          <a href="#settings">Настройки</a>
        </li>
        <li>
          <a href="#developers">Разработчики</a>
        </li>
      </ul>
    </nav>
  </div>
);

const mapStateToProps = (state: State): BurgerMenuProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

export default connect(mapStateToProps, null)(BurgerMenu);
