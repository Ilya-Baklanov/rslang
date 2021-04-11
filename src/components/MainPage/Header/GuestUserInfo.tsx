import React from 'react';
import { connect } from 'react-redux';

import { UserInfoProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const GuestUserInfo = ({ burgerIsActive }: UserInfoProps) => (
  <div className={burgerIsActive ? styles['userInfo_active'] : styles['userInfo']}>
    <img src="../../../assets/image/guest.svg" alt="Guest is not found" />
    <div className={styles['userNameGuest']}>Гость</div>
  </div>
);

const mapStateToProps = (state: State): UserInfoProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

export default connect(mapStateToProps, null)(GuestUserInfo);
