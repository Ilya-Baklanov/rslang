import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { MiniGamesProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import AudioCall from './audioCall/AudioCall';
import AudioReply from './audioReply/AudioReply';
import Savannah from './savannah/Savannah';
import Sprint from './sprint/Sprint';
import styles from './style.scss';

const MiniGames = ({ isAuth }: MiniGamesProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <div className={styles['mini-game-container-wrapper']}>
      <Route path={`${currentLocation}/mini-games/audio-call`}>
        <AudioCall />
      </Route>
      <Route path={`${currentLocation}/mini-games/audio-reply`}>
        <AudioReply />
      </Route>
      <Route path={`${currentLocation}/mini-games/savannah`}>
        <Savannah />
      </Route>
      <Route path={`${currentLocation}/mini-games/sprint`}>
        <Sprint />
      </Route>
    </div>
  );
};

const mapStateToProps = (state: State): MiniGamesProps => ({
  isAuth: state.authReducer!.auth,
});

export default connect(mapStateToProps, null)(MiniGames);
