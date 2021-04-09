import React from 'react';

import styles from './style.scss';

const GuestUserInfo = () => (
  <div className={styles['userInfo']}>
    <img src="../../../assets/image/guest.svg" alt="Guest is not found" />
    <div className={styles['userNameGuest']}>
      <div className={styles['guestName']}>Гость</div>
    </div>
  </div>
);

export default GuestUserInfo;
