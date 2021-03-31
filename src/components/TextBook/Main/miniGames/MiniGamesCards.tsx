import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { MiniGamesCardsProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import styles from './style.scss';

const MiniGamesCards = ({ isAuth }: MiniGamesCardsProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <Route exact path={`${currentLocation}/mini-games`}>
      <div className={styles['mini-games-cards-wrapper']}>
        <Link
          className={styles['mini-games-cards']}
          to={`${currentLocation}/mini-games/audio-call`}
        >
          AudioCall
        </Link>
        <Link className={styles['mini-games-cards']} to={`${currentLocation}/mini-games/own-game`}>
          OwnGame
        </Link>
        <Link className={styles['mini-games-cards']} to={`${currentLocation}/mini-games/savannah`}>
          Savannah
        </Link>
        <Link className={styles['mini-games-cards']} to={`${currentLocation}/mini-games/sprint`}>
          Sprint
        </Link>
      </div>
    </Route>
  );
};

const mapStateToProps = (state: State): MiniGamesCardsProps => ({
  isAuth: state.authReducer!.auth,
});

export default connect(mapStateToProps, null)(MiniGamesCards);
