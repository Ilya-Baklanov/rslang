import React from 'react';

import styles from './style.scss';

const Footer = (): JSX.Element => (
  <div className={styles['footer']}>
    <div className={styles['developers']}>
      <a href="https://github.com/Ilya-Baklanov" className={styles['oneDev']}>
        Ilya
      </a>
      <a href="https://github.com/dimit999" className={styles['twoDev']}>
        Dmitry
      </a>
      <a href="https://github.com/vitaly-kn" className={styles['threeDev']}>
        Vitaly
      </a>
    </div>
    <div className={styles['bubbles']}>
      <h1 className={styles['year']}>2021</h1>
    </div>
    <a href="https://rs.school/js/">
      <img
        src="/assets/image/rs_school_js.svg"
        alt="RS-Sсhool"
        className={styles['footer__RS-logo']}
      />
    </a>
  </div>
);

export default Footer;
