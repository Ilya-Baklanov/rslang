/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { UserInfoProps } from '@/types/props.types';
import { State } from '@/types/states.types';
import getUserInfo from '@/utils/getUserInfo';

import styles from './style.scss';

const LoggedUserInfo = ({ burgerIsActive }: UserInfoProps) => {
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
    <div className={burgerIsActive ? styles['userInfo_active'] : styles['userInfo']}>
      <img src={userInfo['photo']} alt="User is not found" />
      <div className={styles['userName']}>{userInfo['name']}</div>
    </div>
  );
};

const mapStateToProps = (state: State): UserInfoProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

export default connect(mapStateToProps, null)(LoggedUserInfo);
