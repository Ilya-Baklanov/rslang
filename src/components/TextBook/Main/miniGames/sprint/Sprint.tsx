import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import Cadencer from '../gamesTools/services/cadencer';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import sprintStyles from './Sprint.scss';

const cadencer = new Cadencer();
const startTimeLeft = 30;

function Sprint(): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(startTimeLeft + 1);

  useEffect(() => {
    function decTimeLeft() {
      // console.log(`dec time!`);
      setTimeLeft((prev: number) => (prev ? prev - 1 : startTimeLeft));
    }

    cadencer.setCallback(decTimeLeft);
    cadencer.start();

    return () => {
      cadencer.setCallback(null);
      cadencer.stop();
    };
  }, []);

  function SprintGame(time: number): JSX.Element {
    return (
      <div>
        <GameCounter label="ВРЕМЯ:" count={time} />
        <WordPlate label="Word" isBig />
        <WordPlate label="Диван" isBig={false} />
      </div>
    );
  }

  function SprintControls(): JSX.Element {
    return (
      <div className={sprintStyles['sprint-controls']}>
        <Button variant="danger" size="lg">
          Неверно
        </Button>
        <Button variant="success" size="lg">
          Верно
        </Button>
      </div>
    );
  }

  return <GameContainer gameScreen={SprintGame(timeLeft)} controlsScreen={SprintControls()} />;
}

export default Sprint;
