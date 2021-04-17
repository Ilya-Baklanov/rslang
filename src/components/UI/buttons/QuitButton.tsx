import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { quitAction } from '@/redux/actions';
import { QuitActionProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const QuitButton = ({ quitAction, burgerIsActive, isAuth }: QuitActionProps) => {
  const history = useHistory();
  return (
    <button
      className={burgerIsActive ? styles['quit-button_active'] : styles['quit-button']}
      type="button"
      onClick={() => {
        history.push('/login');
        quitAction!();
      }}
    >
      <img className={styles['quit-icon']} src="../../assets/image/logout_icon.png" alt="logout" />
      <div className={styles['quit-button-label']}>{isAuth ? 'Выйти' : 'Войти'}</div>
    </button>
  );
};

const mapStateToProps = (state: State): QuitActionProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
  isAuth: state.authReducer?.auth,
});

const mapDispatchToProps = {
  quitAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuitButton);
