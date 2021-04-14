/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import HealthIndicator from '../gamesTools/healthIndicator/HealthIndicator';
import InfoIcon from '../gamesTools/infoIcon/infoIcon';
import { getRandomSequence } from '../gamesTools/services/random';
import SoundIcon from '../gamesTools/soundIcon/SoundIcon';
import StatModal from '../gamesTools/statModal/StatModal';

import aCallStyles from './AudioCall.scss';

const maxHealth = 5;
const infoIconDisplayDelay = 1000;
const server = 'https://reat-learnwords.herokuapp.com/';

//* ****LEVEL PARAMS*****
const group = 1;
const page = 1;
const wordsQty = 20;
//* *********************

function AudioCall(): JSX.Element {
  const [words, setWords] = useState<number>(wordsQty);
  const [health, setHealth] = useState<number>(maxHealth);
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false);
  const [isDisplayInfo, setIsDisplayInfo] = useState(false);
  const [isRightAnswerReceived, setIsRightAnswerReceived] = useState(true);
  const [gameResults, setGameResults] = useState<GameResults>({ goodAnswers: [], badAnswers: [] });
  const [currentWord, setCurrentWord] = useState(0);
  const [wordsList, setWordList] = useState<AggregatedWord[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [responseSequence, setResponseSequence] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  audioRef.current?.addEventListener('ended', () => {
    setIsSoundPlaying(false);
  });

  function exitGame() {
    setShowResults(false);
    // Здесь необходимо подключить переход на страницу с играми!!!!!
    // Результат игры в gameResults
  }

  function proceedWithWord(wordNumber: number) {
    if (wordNumber < wordsList.length) {
      setResponseSequence(getRandomSequence(wordNumber, wordsList.length));
      setIsSoundPlaying(true);
      audioRef.current?.play().catch(() => {
        setIsSoundPlaying(false);
      });
    } else {
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
      setShowResults(true);
    }
  }, [health]);

  function onGoodAnswer() {
    setIsRightAnswerReceived(true);
    processResult(true);
    showInfoIcon();
  }

  function onBadAnswer() {
    setHealth((prev: number) => prev - 1);
    setIsRightAnswerReceived(false);
    processResult(false);
    showInfoIcon();
  }

  function AudioCallGame(): JSX.Element {
    return (
      <div className={aCallStyles['audio-call-game']}>
        <GameCounter label="СЛОВА:" count={words} />
        <HealthIndicator count={health} />
        <SoundIcon isPlaying={isSoundPlaying} />
        <audio ref={audioRef} src={`${server}${wordsList[currentWord]?.audio}`} />
        {isDisplayInfo && <InfoIcon isPositive={isRightAnswerReceived} />}
        <StatModal gameResults={gameResults} statShow={showResults} onHide={exitGame} />
      </div>
    );
  }

  function AudioCallControls(): JSX.Element {
    return (
      <div className={aCallStyles['audio-call-controls']}>
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

  return <GameContainer gameScreen={AudioCallGame()} controlsScreen={AudioCallControls()} />;
}

export default AudioCall;
