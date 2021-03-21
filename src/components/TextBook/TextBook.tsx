import React from 'react';
import { connect } from 'react-redux';

import { showBurgerMenuAction, hideBurgerMenuAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { TextBookProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import styles from './style.scss';

const TextBook = ({
  burgerIsActive,
  showBurgerMenuAction,
  hideBurgerMenuAction,
}: TextBookProps): JSX.Element => (
  <div>
    <button type="button" onClick={burgerIsActive ? hideBurgerMenuAction : showBurgerMenuAction}>
      BurgerMenu
    </button>
    <div className={burgerIsActive ? styles['burger-wrapper_active'] : styles['burger-wrapper']}>
      <BurgerMenu />
    </div>
    TEXT BOOK
  </div>
);

const mapStateToProps = (state: State): TextBookProps => ({
  burgerIsActive: state.burgerMenuReducer!.burgerIsActive,
});

const mapDispatchToProps: Actions = {
  showBurgerMenuAction,
  hideBurgerMenuAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBook);
