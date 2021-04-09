import React from 'react';

import gpStyles from './GamePlayContainer.scss';

interface GamePlayContainerProps {
  content: JSX.Element;
}

function GamePlayContainer({ content }: GamePlayContainerProps): JSX.Element {
  return <div className={gpStyles['gameplay-container']}>{content}</div>;
}

export default GamePlayContainer;
