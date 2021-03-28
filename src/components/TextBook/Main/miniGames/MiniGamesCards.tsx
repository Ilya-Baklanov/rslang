import React from 'react';
import { Route, Link } from 'react-router-dom';

import styles from './style.scss';

const MiniGamesCards = (): JSX.Element => (
  <Route exact path="/home/mini-games">
    <div className={styles['mini-games-cards-wrapper']}>
      <Link className={styles['mini-games-cards']} to="/home/mini-games/audio-call">
        AudioCall
      </Link>
      <Link className={styles['mini-games-cards']} to="/home/mini-games/own-game">
        OwnGame
      </Link>
      <Link className={styles['mini-games-cards']} to="/home/mini-games/savannah">
        Savannah
      </Link>
      <Link className={styles['mini-games-cards']} to="/home/mini-games/sprint">
        Sprint
      </Link>
    </div>
  </Route>
);

export default MiniGamesCards;
