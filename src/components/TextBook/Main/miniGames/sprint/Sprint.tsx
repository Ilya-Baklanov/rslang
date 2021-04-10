import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import InfoIcon from '../gamesTools/infoIcon/infoIcon';
import Cadencer from '../gamesTools/services/cadencer';
import getRandomNumber from '../gamesTools/services/random';
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
  const [, /* score*/ setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [englishWord, setEnglishWord] = useState<string>('');
  const [russianWord, setRussianWord] = useState<string>('');
  const [wordsList, setWordList] = useState<AggregatedWord[]>([]);

  useEffect(() => {
    function decTimeLeft() {
      setTimeLeft((prev: number) => (prev ? prev - 1 : startTimeLeft));
    }

    cadencer.setCallback(decTimeLeft);
    cadencer.start();

    return () => {
      cadencer.setCallback(null);
      cadencer.stop();
    };
  }, []);

  function proceedWithWord(wordNumber: number) {
    // console.log(wordNumber);
    if (wordNumber < wordsQty) {
      // console.log(wordsList[wordNumber]);
      setEnglishWord(wordsList[wordNumber].word);
      const isCorrectVariantInUse = Boolean(getRandomNumber(0, 1));
      if (isCorrectVariantInUse) {
        // console.log('using correct variant!');
        setRussianWord(wordsList[wordNumber].wordTranslate);
      } else {
        let variant: number;
        do {
          variant = getRandomNumber(0, wordsQty - 1);
        } while (variant === wordNumber);
        // console.log(
        //  `using incorrect variant! n=${variant} translation=${wordsList[variant]?.wordTranslate}`
        // );
        setRussianWord(wordsList[variant].wordTranslate);
      }
      setIsCorrectVariantProposed(isCorrectVariantInUse);
      // console.log(`isCorrectVariantInUse = ${isCorrectVariantInUse}`);
      // console.log(`isCorrectVariantProposed = ${isCorrectVariantProposed}`);
    } else {
      // console.log(`game over! final score: ${score}`);
    }
  }

  useEffect(() => {
    let cleanupFunction = false;
    getAggregatedWords(group, page, wordsQty, 'empty')
      .then((content: AggregatedWords) => {
        // console.log(content);
        if (!cleanupFunction) setWordList(content.paginatedResults);
      })
      .catch(() => {});
    return () => {
      cleanupFunction = true;
    };
  }, []);

  useEffect(() => {
    if (wordsList.length) {
      // console.log('wordslist loaded!');
      // console.log(wordsList);
      proceedWithWord(currentWord);
    }
  }, [wordsList]);

  useEffect(() => {
    if (currentWord) proceedWithWord(currentWord);
  }, [currentWord]);

  function showInfoIcon() {
    setIsDisplayInfo(true);
    setTimeout(() => {
      setIsDisplayInfo(false);
    }, infoIconDisplayDelay);
  }

  function onCorrectButtonPressed() {
    if (isCorrectVariantProposed) {
      setIsRightAnswerReceived(true);
      setScore((prev: number) => prev + 1);
      // console.log(`correct! actual score: ${score}`);
      showInfoIcon();
    } else {
      setIsRightAnswerReceived(false);
      // console.log(`incorrect! actual score: ${score}`);
      showInfoIcon();
    }
    setCurrentWord((prev: number) => prev + 1);
    // setCurrentWord(score + 1);
    // proceedWithWord(currentWord);
  }

  function onIncorrectButtonPressed() {
    if (!isCorrectVariantProposed) {
      setIsRightAnswerReceived(true);
      setScore((prev: number) => prev + 1);
      // console.log(`correct! actual score: ${score}`);
      showInfoIcon();
    } else {
      setIsRightAnswerReceived(false);
      // console.log(`incorrect! actual score: ${score}`);
      showInfoIcon();
    }
    setCurrentWord((prev: number) => prev + 1);
    // setCurrentWord(score + 1);
    // proceedWithWord(currentWord);
  }

  function SprintGame(time: number): JSX.Element {
    return (
      <div className={sprintStyles['sprint-game']}>
        <GameCounter label="ВРЕМЯ:" count={time} />
        <WordPlate label={englishWord} isBig />
        <WordPlate label={russianWord} isBig={false} />
        {isDisplayInfo && <InfoIcon isPositive={isRightAnswerReceived} />}
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
