import React, { useState, useEffect } from 'react';

import GameResults from '@/types/gameresult.types';
import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import GameContainer from '../gamesTools/gameContainer/GameContainer';
import GameCounter from '../gamesTools/gameCounter/GameCounter';
import InfoIcon from '../gamesTools/infoIcon/infoIcon';
import MicIcon from '../gamesTools/micIcon/MicIcon';
import StatModal from '../gamesTools/statModal/StatModal';
import WordPlate from '../gamesTools/wordPlate/WordPlate';

import aReplyStyles from './AudioReply.scss';

const invitePressAndSpeak = 'Нажмите кнопку микрофона и произнесите слово';
const inviteSpeak = 'Произнесите слово';
const resultDisplayDelay = 1000;
const infoIconDisplayDelay = 2000;

//* ****LEVEL PARAMS*****
const group = 1;
const page = 1;
const wordsQty = 20;
//* *********************

function AudioReply(): JSX.Element {
  const [recording, setRecording] = useState<boolean>(false);
  const [invitation, setInvitation] = useState<string>(invitePressAndSpeak);

  const [words, setWords] = useState<number>(wordsQty);
  const [isAnswerShow, setIsAnswerShow] = useState(false);
  const [isDisplayInfo, setIsDisplayInfo] = useState(false);
  const [isRightAnswerReceived, setIsRightAnswerReceived] = useState(true);
  const [gameResults, setGameResults] = useState<GameResults>({ goodAnswers: [], badAnswers: [] });
  const [russianWord, setRussianWord] = useState<string>('');
  const [currentWord, setCurrentWord] = useState(0);
  const [wordsList, setWordList] = useState<AggregatedWord[]>([]);
  const [showResults, setShowResults] = useState(false);

  function exitGame() {
    setShowResults(false);
    // Здесь необходимо подключить переход на страницу с играми!!!!!
    // Результат игры в gameResults
  }

  function proceedWithWord(wordNumber: number) {
    if (wordNumber < wordsList.length) {
      setRussianWord(wordsList[currentWord].wordTranslate);
    } else {
      setShowResults(true);
    }
  }

  function showInfo() {
    setIsDisplayInfo(true);
    setIsAnswerShow(true);
    setTimeout(() => {
      setIsDisplayInfo(false);
      setIsAnswerShow(false);
      setWords((prev: number) => prev - 1);
      setCurrentWord((prev: number) => prev + 1);
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

  function onGoodAnswer() {
    setIsRightAnswerReceived(true);
    processResult(true);
    showInfo();
  }

  function onBadAnswer() {
    setIsRightAnswerReceived(false);
    processResult(false);
    showInfo();
  }

  function onRecordingClick() {
    if (!recording) {
      if ('webkitSpeechRecognition' in window) {
        setInvitation(inviteSpeak);
        setRecording(true);
        // eslint-disable-next-line
        const recognition: SpeechRecognition = new window['webkitSpeechRecognition']();
        recognition.lang = 'en-GB';
        recognition.start();

        recognition.onend = () => {
          setTimeout(() => {
            setInvitation(invitePressAndSpeak);
            setRecording(false);
          }, resultDisplayDelay);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          if (event.results.length > 0) {
            const result: string = event.results[0][0].transcript;
            setInvitation(result);
            if (result.toLowerCase() === wordsList[currentWord].word.toLowerCase()) {
              onGoodAnswer();
            } else onBadAnswer();
          } else onBadAnswer();
        };
      }
    }
  }

  function AudioReplyGame(): JSX.Element {
    return (
      <div className={aReplyStyles['audio-reply-game']}>
        <GameCounter label="СЛОВА:" count={words} />
        <WordPlate label={russianWord} isBig />
        {isAnswerShow && (
          <WordPlate
            label={`${wordsList[currentWord].word} - ${wordsList[currentWord].transcription}`}
          />
        )}
        {isDisplayInfo && <InfoIcon isPositive={isRightAnswerReceived} />}
        <StatModal gameResults={gameResults} statShow={showResults} onHide={exitGame} />
      </div>
    );
  }

  function AudioReplyControls(): JSX.Element {
    return (
      <div className={aReplyStyles['audio-reply-controls']}>
        <WordPlate label={invitation} isShadowed />
        <MicIcon isRecording={recording} onClick={onRecordingClick} />
      </div>
    );
  }

  return <GameContainer gameScreen={AudioReplyGame()} controlsScreen={AudioReplyControls()} />;
}

export default AudioReply;
