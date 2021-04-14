import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import InfoIcon from '../gamesTools/infoIcon/infoIcon';
import Cadencer from '../gamesTools/services/cadencer';
import { getRandomNumber } from '../gamesTools/services/random';
import StatModal from '../gamesTools/statModal/StatModal';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import sprintStyles from './Sprint.scss';

const cadencer = new Cadencer();
const startTimeLeft = 50;
const infoIconDisplayDelay = 1000;

//* ****LEVEL PARAMS*****
const group = 1;
const page = 1;
const wordsQty = 20;
//* *********************

function Sprint(): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(startTimeLeft + 1);
  const [isDisplayInfo, setIsDisplayInfo] = useState(false);
  const [isCorrectVariantProposed, setIsCorrectVariantProposed] = useState(true);
  const [isRightAnswerReceived, setIsRightAnswerReceived] = useState(true);
  const [gameResults, setGameResults] = useState<GameResults>({ goodAnswers: [], badAnswers: [] });
  const [currentWord, setCurrentWord] = useState(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [russianWord, setRussianWord] = useState<string>('');
  const [wordsList, setWordList] = useState<AggregatedWord[]>([]);
  const [showResults, setShowResults] = useState(false);

  const history = useHistory();

  function exitGame() {
    setShowResults(false);
    history.push('/home/mini-games');
  }

  useEffect(() => {
    function decTimeLeft() {
      setTimeLeft((prev: number) => {
        if (prev) {
          return prev - 1;
        }
        setShowResults(true);
        return 0;
      });
    }

    cadencer.setCallback(decTimeLeft);
    cadencer.start();

    return () => {
      cadencer.setCallback(null);
      cadencer.stop();
    };
  }, []);

  function proceedWithWord(wordNumber: number) {
    if (wordNumber < wordsQty) {
      setEnglishWord(wordsList[wordNumber].word);
      const isCorrectVariantInUse = Boolean(getRandomNumber(0, 1));
      if (isCorrectVariantInUse) {
        setRussianWord(wordsList[wordNumber].wordTranslate);
      } else {
        let variant: number;
        do {
          variant = getRandomNumber(0, wordsQty - 1);
        } while (variant === wordNumber);
        setRussianWord(wordsList[variant].wordTranslate);
      }
      setIsCorrectVariantProposed(isCorrectVariantInUse);
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
    setIsRightAnswerReceived(isCorrectAnswer);
    showInfoIcon();
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

  function onCorrectButtonPressed() {
    if (isCorrectVariantProposed) {
      processResult(true);
    } else {
      processResult(false);
    }
    setCurrentWord((prev: number) => prev + 1);
  }

  function onIncorrectButtonPressed() {
    if (!isCorrectVariantProposed) {
      processResult(true);
    } else {
      processResult(false);
    }
    setCurrentWord((prev: number) => prev + 1);
  }

  function SprintGame(time: number): JSX.Element {
    return (
      <div className={sprintStyles['sprint-game']}>
        <GameCounter label="ВРЕМЯ:" count={time} />
        <WordPlate label={englishWord} isBig />
        <WordPlate label={russianWord} isBig={false} />
        {isDisplayInfo && <InfoIcon isPositive={isRightAnswerReceived} />}
        <StatModal gameResults={gameResults} statShow={showResults} onHide={exitGame} />
      </div>
    );
  }

  function SprintControls(): JSX.Element {
    return (
      <div className={sprintStyles['sprint-controls']}>
        <Button variant="danger" size="lg" onClick={onIncorrectButtonPressed}>
          Неверно
        </Button>
        <Button variant="success" size="lg" onClick={onCorrectButtonPressed}>
          Верно
        </Button>
      </div>
    );
  }

  return <GameContainer gameScreen={SprintGame(timeLeft)} controlsScreen={SprintControls()} />;
}

export default Sprint;
