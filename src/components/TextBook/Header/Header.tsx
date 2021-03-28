import React from 'react';

import Logo from '@/components/UI/Logo/Logo';
import QuitButton from '@/components/UI/buttons/QuitButton';

import styles from './style.scss';

const Header = (): JSX.Element => (
  <div className={styles['header']}>
    <div className={styles['logo-container']}>
      <a href="#preview">
        <Logo />
      </a>
    </div>
    <QuitButton />
  </div>
);

export default Header;
