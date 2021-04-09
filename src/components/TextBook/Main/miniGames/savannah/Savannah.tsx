import React, { useState, AnimationEvent } from 'react';
import { Button } from 'react-bootstrap';

import FallingContainer, { animationBlow } from '../gamesTools/fallingContainer/FallingContainer';
import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import savannahStyles from './Savannah.scss';

const maxHealth = 5;
const maxWords = 20;
const wordRespawnDelay = 200;

function Savannah(): JSX.Element {
  const [blow, setBlow] = useState<boolean>(false);
  const [words, setWords] = useState<number>(maxWords);
  const [health, setHealth] = useState<number>(maxHealth);
  const [displayWord, setDisplayWord] = useState<boolean>(true);

  function onGoodAnswer() {
    setBlow(true);
  }

  function onBadAnswer() {
    setHealth((prev: number) => (prev ? prev - 1 : maxHealth));
  }

  function wordRespawn() {
    setDisplayWord(false);
    setTimeout(() => {
      setBlow(false);
      setDisplayWord(true);
    }, wordRespawnDelay);
  }

  function onWordAnimationEnd(event: AnimationEvent) {
    const animation = event.animationName;
    if (animation.includes(animationBlow)) {
      // win routine
      setWords((prev: number) => (prev ? prev - 1 : maxWords));
      wordRespawn();
    } else {
      // fail routine
      setHealth((prev: number) => (prev ? prev - 1 : maxHealth));
      setWords((prev: number) => (prev ? prev - 1 : maxWords));
      wordRespawn();
    }
  }

  function SavannahGame(): JSX.Element {
    return (
      <div>
        <GameCounter label="СЛОВА:" count={words} />
        <HealthIndicator count={health} />
        {displayWord && (
          <FallingContainer
            content={<WordPlate label="Word" isBig />}
            isBlow={blow}
            onAnimationEnd={onWordAnimationEnd}
          />
        )}
      </div>
    );
  }

  function SavannahControls(): JSX.Element {
    return (
      <div className={savannahStyles['savannah-controls']}>
        <Button variant="outline-secondary" onClick={onBadAnswer}>
          Критика
        </Button>
        <Button variant="outline-secondary" onClick={onGoodAnswer}>
          Слово
        </Button>
        <Button variant="outline-secondary" onClick={onBadAnswer}>
          Диван
        </Button>
        <Button variant="outline-secondary" onClick={onBadAnswer}>
          Стул
        </Button>
      </div>
    );
  }

  return <GameContainer gameScreen={SavannahGame()} controlsScreen={SavannahControls()} />;
}

export default Savannah;
