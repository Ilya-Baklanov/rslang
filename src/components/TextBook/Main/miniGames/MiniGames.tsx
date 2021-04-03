import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { MiniGamesProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import AudioCall from './audioCall/AudioCall';
import AudioReply from './audioReply/AudioReply';
import Savannah from './savannah/Savannah';
import Sprint from './sprint/Sprint';

const MiniGames = ({ isAuth }: MiniGamesProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <div>
      <Route path={`${currentLocation}/mini-games/audio-call`}>
        <AudioCall />
      </Route>
      <Route path={`${currentLocation}/mini-games/own-game`}>
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
