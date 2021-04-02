import React from 'react';

import gcStyles from './GameCounter.scss';

interface GameCounterProps {
  label?: string;
  count?: number;
}

function GameCounter({ label, count }: GameCounterProps): JSX.Element {
  return (
    <div className={gcStyles['game-counter']}>
      <div className={gcStyles['game-counter-label']}>{label}</div>
      <div className={gcStyles['game-counter-count']}>{count}</div>
    </div>
  );
}

GameCounter.defaultProps = {
  label: '',
  count: 0,
};

export default GameCounter;
