import React from 'react';

import Logo from '@/components/UI/Logo/Logo';

import styles from './style.scss';

const Header = (): JSX.Element => (
  <div className={styles['header']}>
    <div className={styles['logo-container']}>
      <a href="#preview">
        <Logo />
      </a>
    </div>
    <nav className={styles['header-navbar']}>
      <ul className={styles['header-navbar-list']}>
        <li>
          <a href="#description">Особенности</a>
        </li>
        <li>
          <a href="#demonstration-app">Демонстрация работы приложения</a>
        </li>
        <li>
          <a href="#about-the-team">О Команде</a>
        </li>
        <li>
          <a href="#mini-games">Мини игры</a>
        </li>
        <li>
          <a href="#statistics">Статистика</a>
        </li>
        <li>
          <a href="-">Войти</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
