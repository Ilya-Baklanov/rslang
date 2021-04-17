/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import GameResults from '@/types/gameresult.types';
import { MiniGameProps } from '@/types/props.types';
import {
  AggregatedWord, AggregatedWords, Statistic, Words,
} from '@/types/response.types';
import { State } from '@/types/states.types';
import getAggregatedWords from '@/utils/getAggregatedWords';
import getStatistic from '@/utils/getStatistic';
import getWords from '@/utils/getWords';
import postStatistic from '@/utils/postStatistic';
import postUserWord from '@/utils/postUserWord';

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
// const group = 1;
// const page = 1;
const wordsQty = 20;
//* *********************

function AudioReply({ isAuth }: MiniGameProps): JSX.Element {
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
  const date = new Date().toLocaleDateString();
  const filterForRepeatWords = '{"userWord.difficulty":"repeat"}';
  const filterForNewWords = '{"userWord":null}';
  const [filter, setFilter] = useState(filterForRepeatWords);
  const [statistic, setStatistic] = useState<Statistic>({
    learnedWords: 0,
    optional: {
      audioCallStats: {
        '': 0,
      },
      audioReplyStats: {
        '': 0,
      },
      sprintStats: {
        '': 0,
      },
      savannahStats: {
        '': 0,
      },
      allStats: {
        '': 0,
      },
    },
  });

  const history = useHistory();

  function exitGame() {
    setShowResults(false);
    history.push('/home/mini-games');
  }

  useEffect(() => {
    getStatistic()
      .then((responseStatistic: Statistic) => {
        setStatistic(responseStatistic);
      })
      .catch(() => {});
  }, []);

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
    const { learnedWords } = statistic;
    const {
      audioCallStats,
      audioReplyStats,
      sprintStats,
      savannahStats,
      allStats,
    } = statistic.optional;

    setIsRightAnswerReceived(isCorrectAnswer);
    if (isCorrectAnswer) {
      if (isAuth) {
        if (allStats[`${date}`]) {
          allStats[`${date}`] = allStats[`${date}`] + 1;
        } else {
          allStats[`${date}`] = 1;
        }

        if (sprintStats[`${date}`]) {
          sprintStats[`${date}`] = sprintStats[`${date}`] + 1;
        } else {
          sprintStats[`${date}`] = 1;
        }

        postStatistic({
          learnedWords: learnedWords + 1,
          optional: {
            audioCallStats,
            audioReplyStats,
            sprintStats,
            savannahStats,
            allStats,
          },
        })
          .then((content: Statistic) => setStatistic(content))
          .catch(() => {});

        postUserWord(answerRecord._id!, 'learned', { date })
          .then()
          .catch(() => {});
      }
      setGameResults((prev: GameResults) => ({
        ...prev,
        goodAnswers: [...prev.goodAnswers, answerRecord],
      }));
    } else {
      setGameResults((prev: GameResults) => ({
        ...prev,
        badAnswers: [...prev.badAnswers, answerRecord],
      }));
    }
  }

  const getStarted = () => {
    if (isAuth) {
      getAggregatedWords('empty', 'empty', wordsQty, filter)
        .then((content: AggregatedWords) => {
          if (content.paginatedResults.length < wordsQty) {
            setFilter(filterForNewWords);
          }
          setWordList(content.paginatedResults);
        })
        .catch(() => setFilter(filterForNewWords));
    } else {
      getWords(0, 0)
        .then((content: Words) => {
          setWordList(content);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getStarted();
  }, [filter]);

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

const mapStateToProps = (state: State) => ({
  isAuth: state.authReducer?.auth,
});

export default connect(mapStateToProps, null)(AudioReply);
