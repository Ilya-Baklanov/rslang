import React from 'react';

import styles from './style.scss';

const Footer = (): JSX.Element => (
  <div className={styles['footer']}>
    <div className={styles['developers']}>
      <a href="https://github.com/Ilya-Baklanov">Ilya</a>
      <a href="https://github.com/dimit999">Dmitry</a>
      <a href="https://github.com/vitaly-kn">Vitaly</a>
    </div>
    <div className={styles['year']}>2021</div>
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
