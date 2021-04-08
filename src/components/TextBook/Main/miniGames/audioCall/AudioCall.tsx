import React from 'react';
import { Button } from 'react-bootstrap';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import SoundIcon from '../gamesTools/soundIcon/SoundIcon';

import aCallStyles from './AudioCall.scss';

function AudioCall(): JSX.Element {
  function AudioCallGame(): JSX.Element {
    return (
      <div>
        <GameCounter label="СЛОВА:" count={3} />
        <HealthIndicator count={3} />
        <SoundIcon isPlaying />
      </div>
    );
  }

  function AudioCallControls(): JSX.Element {
    return (
      <div className={aCallStyles['audio-call-controls']}>
        <Button variant="outline-secondary">Критика</Button>
        <Button variant="outline-secondary">Слово</Button>
        <Button variant="outline-secondary">Диван</Button>
        <Button variant="outline-secondary">Стул</Button>
      </div>
    );
  }

  return <GameContainer gameScreen={AudioCallGame()} controlsScreen={AudioCallControls()} />;
}

export default AudioCall;
