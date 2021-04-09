import React, { useState, useRef } from 'react';

// import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import ControlsContainer from '../controlsContainer/ControlsContainer';
import FullscreenIcon from '../fullscreenIcon/FullscreenIcon';
import GamePlayContainer from '../gamePlayContainer/GamePlayContainer';

import gcStyles from './GameContainer.scss';

interface GameContainerProps {
  gameScreen: JSX.Element;
  controlsScreen: JSX.Element;
}

function GameContainer({ gameScreen, controlsScreen }: GameContainerProps): JSX.Element {
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  function fullScreenToggler() {
    setFullScreenMode(!fullScreenMode);
    if (!fullScreenMode) {
      container.current!.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  return (
    <div className={gcStyles['game-container']} ref={container}>
      <div className={gcStyles['game-inner-container']}>
        <GamePlayContainer content={gameScreen} />
        <ControlsContainer content={controlsScreen} />
        <FullscreenIcon isFullscreenIcon={!fullScreenMode} onClick={fullScreenToggler} />
      </div>
    </div>
  );
}

export default GameContainer;
