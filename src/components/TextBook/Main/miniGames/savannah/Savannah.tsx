/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React, { useState, useEffect, AnimationEvent } from 'react';
import { Button } from 'react-bootstrap';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import FallingContainer, { animationBlow } from '../gamesTools/fallingContainer/FallingContainer';
import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import InfoIcon from '../gamesTools/infoIcon/infoIcon';
import { getRandomSequence } from '../gamesTools/services/random';
import StatModal from '../gamesTools/statModal/StatModal';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import savannahStyles from './Savannah.scss';

const maxHealth = 5;
const wordRespawnDelay = 200;
const infoIconDisplayDelay = 1000;

//* ****LEVEL PARAMS*****
const group = 1;
const page = 1;
const wordsQty = 20;
//* *********************

function Savannah(): JSX.Element {
  const [blow, setBlow] = useState<boolean>(false);
  const [words, setWords] = useState<number>(wordsQty);
  const [health, setHealth] = useState<number>(maxHealth);
  const [displayWord, setDisplayWord] = useState<boolean>(true);
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(true);
  const [isDisplayInfo, setIsDisplayInfo] = useState(false);
  const [isRightAnswerReceived, setIsRightAnswerReceived] = useState(true);
  const [gameResults, setGameResults] = useState<GameResults>({ goodAnswers: [], badAnswers: [] });
  const [currentWord, setCurrentWord] = useState(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [wordsList, setWordList] = useState<AggregatedWord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [responseSequence, setResponseSequence] = useState<number[]>([]);

  function exitGame() {
    setShowResults(false);
    // Здесь необходимо подключить переход на страницу с играми!!!!!
    // Результат игры в gameResults
  }

  function proceedWithWord(wordNumber: number) {
    if (wordNumber < wordsList.length) {
      setEnglishWord(wordsList[wordNumber].word);
      setResponseSequence(getRandomSequence(wordNumber, wordsList.length));
    } else {
      setIsGamePlaying(false);
      setShowResults(true);
    }
  }

  function showInfoIcon() {
    setIsDisplayInfo(true);
    setTimeout(() => {
      setIsDisplayInfo(false);
    }, infoIconDisplayDelay);
  }

  function processResult(isCorrectAnswer: boolean): void {
    const answerRecord = wordsList[currentWord];
    if (isCorrectAnswer) {
      setGameResults((prev: GameResults) => {
        prev.goodAnswers.push(answerRecord);
        return prev;
      });
    } else {
      setGameResults((prev: GameResults) => {
        prev.badAnswers.push(answerRecord);
        return prev;
      });
    }
    setWords((prev: number) => prev - 1);
    setCurrentWord((prev: number) => prev + 1);
  }

  useEffect(() => {
    let cleanupFunction = false;
    getAggregatedWords(group, page, wordsQty, 'empty')
      .then((content: AggregatedWords) => {
        if (!cleanupFunction) setWordList(content.paginatedResults);
      })
      .catch(() => {});
    return () => {
      cleanupFunction = true;
    };
  }, []);

  useEffect(() => {
    if (wordsList.length) {
      proceedWithWord(currentWord);
    }
  }, [wordsList]);

  useEffect(() => {
    if (currentWord) proceedWithWord(currentWord);
  }, [currentWord]);

  useEffect(() => {
    if (!health) {
      setIsGamePlaying(false);
      setShowResults(true);
    }
  }, [health]);

  function onGoodAnswer() {
    setBlow(true);
    setIsRightAnswerReceived(true);
    showInfoIcon();
  }

  function onBadAnswer() {
    setHealth((prev: number) => prev - 1);
    setIsRightAnswerReceived(false);
    showInfoIcon();
  }

  function wordRespawn() {
    setDisplayWord(false);
    setTimeout(() => {
      setBlow(false);
      setDisplayWord(true);
    }, wordRespawnDelay);
  }

  function onWordAnimationEnd(event: AnimationEvent) {
    if (!isGamePlaying) return;
    const animation = event.animationName;
    if (animation.includes(animationBlow)) {
      processResult(true);
    } else {
      processResult(false);
    }
    wordRespawn();
  }

  function SavannahGame(): JSX.Element {
    return (
      <div className={savannahStyles['savannah-game']}>
        <GameCounter label="СЛОВА:" count={words} />
        <HealthIndicator count={health} />
        {displayWord && (
          <FallingContainer
            content={<WordPlate label={englishWord} isBig />}
            isBlow={blow}
            onAnimationEnd={onWordAnimationEnd}
          />
        )}
        {isDisplayInfo && <InfoIcon isPositive={isRightAnswerReceived} />}
        <StatModal gameResults={gameResults} statShow={showResults} onHide={exitGame} />
      </div>
    );
  }

  function SavannahControls(): JSX.Element {
    return (
      <div className={savannahStyles['savannah-controls']}>
        {responseSequence.map(button => (
          <Button
            key={wordsList[button]._id}
            variant="outline-secondary"
            onClick={button === currentWord ? onGoodAnswer : onBadAnswer}
          >
            {wordsList[button].wordTranslate}
          </Button>
        ))}
      </div>
    );
  }

  return <GameContainer gameScreen={SavannahGame()} controlsScreen={SavannahControls()} />;
}

export default Savannah;
