import React from 'react';

import ControlsContainer from '../controlsContainer/ControlsContainer';
import GamePlayContainer from '../gamePlayContainer/GamePlayContainer';

import gcStyles from './GameContainer.scss';

interface GameContainerProps {
  gameScreen: JSX.Element;
  controlsScreen: JSX.Element;
}

function GameContainer({ gameScreen, controlsScreen }: GameContainerProps): JSX.Element {
  return (
    <div className={gcStyles['game-container']}>
      <div className={gcStyles['game-inner-container']}>
        <GamePlayContainer content={gameScreen} />
        <ControlsContainer content={controlsScreen} />
      </div>
    </div>
  );
}

export default GameContainer;
