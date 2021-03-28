import React from 'react';
import { connect } from 'react-redux';

import { BurgerMenuProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const BurgerMenuItem = ({ burgerIsActive, sectionName }: BurgerMenuProps): JSX.Element => (
  <div className={burgerIsActive ? styles['link-container_active'] : styles['link-container']}>
    <img
      src={`../../../assets/image/${sectionName!}_icon.png`}
      alt=""
      className={styles['link-logo']}
    />
    <div className={styles['link-text']}>{burgerIsActive ? sectionName : ''}</div>
  </div>
);

const mapStateToProps = (state: State): BurgerMenuProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

export default connect(mapStateToProps, null)(BurgerMenuItem);
