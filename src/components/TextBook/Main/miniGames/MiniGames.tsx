import React from 'react';
import { Route } from 'react-router-dom';

import AudioCall from './audioCall/AudioCall';
import OwnGame from './ownGame/OwnGame';
import Savannah from './savannah/Savannah';
import Sprint from './sprint/Sprint';

const MiniGames = (): JSX.Element => (
  <div>
    <Route path="/home/mini-games/audio-call">
      <AudioCall />
    </Route>
    <Route path="/home/mini-games/own-game">
      <OwnGame />
    </Route>
    <Route path="/home/mini-games/savannah">
      <Savannah />
    </Route>
    <Route path="/home/mini-games/sprint">
      <Sprint />
    </Route>
  </div>
);

export default MiniGames;
