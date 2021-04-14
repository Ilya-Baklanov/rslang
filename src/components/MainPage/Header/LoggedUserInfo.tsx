/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { quitAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { UserInfoProps } from '@/types/props.types';
import { State } from '@/types/states.types';
import getUserInfo from '@/utils/getUserInfo';

import styles from './style.scss';

const LoggedUserInfo = ({ burgerIsActive, quitAction }: UserInfoProps) => {
  const [userInfo, setUserInfo] = useState({});

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useMemo(() => {
    getUserInfo(token!, userId!)
      .then(content => {
        setUserInfo(content);
      })
      .catch(() => quitAction!());
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

const mapDispatchToProps: Actions = {
  quitAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserInfo);
