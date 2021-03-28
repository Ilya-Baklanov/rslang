/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';

import getUserInfo from '@/utils/getUserInfo';

import styles from './style.scss';

const LoggedUserInfo = () => {
  const [userInfo, setUserInfo] = useState({});

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const getUserData = (token: string, userId: string) => {
    getUserInfo(token, userId).then(content => {
      setUserInfo(content);
    });
  };

  useEffect(() => {
    getUserData(token || '', userId || '');
  }, []);

  return (
    <div className={styles['userInfo']}>
      <img src={userInfo['photo']} alt="User is not found" />
      <div className={styles['userName']}>
        <div className={styles['firstName']}>{userInfo['name']}</div>
      </div>
    </div>
  );
};

export default LoggedUserInfo;
