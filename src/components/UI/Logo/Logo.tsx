import React from 'react';
import { useHistory } from 'react-router';

import styles from './style.scss';

const Logo = (): JSX.Element => {
  const history = useHistory();

  const clickHandler = () => {
    history.push('/');
  };

  return (
    <button type="button" onClick={clickHandler} className={styles['logo']}>
      <img className={styles['logo-img']} src="../../../assets/image/Logo.png" alt="RS Lang logo" />
    </button>
  );
};

export default Logo;
