import React from 'react';
import { Button } from 'react-bootstrap';

import FallingContainer from '../gamesTools/fallingContainer/FallingContainer';
import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import savannahStyles from './Savannah.scss';

function Savannah(): JSX.Element {
  function SavannahGame(): JSX.Element {
    return (
      <div>
        <GameCounter label="СЛОВА:" count={3} />
        <HealthIndicator count={3} />
        <FallingContainer content={<WordPlate label="Word" isBig />} />
      </div>
    );
  }

  function SavannahControls(): JSX.Element {
    return (
      <div className={savannahStyles['savannah-controls']}>
        <Button variant="outline-secondary">Критика</Button>
        <Button variant="outline-secondary">Слово</Button>
        <Button variant="outline-secondary">Диван</Button>
        <Button variant="outline-secondary">Стул</Button>
      </div>
    );
  }

  return (
    <div>
      <GameContainer gameScreen={SavannahGame()} controlsScreen={SavannahControls()} />
    </div>
  );
}

export default Savannah;
