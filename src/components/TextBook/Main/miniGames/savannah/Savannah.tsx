/* eslint-disable no-console */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React, { useState, useEffect, AnimationEvent } from 'react';
import { Button } from 'react-bootstrap';
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
// const group = 1;
// const page = 1;
const wordsQty = 20;
//* *********************

function Savannah({ isAuth }: MiniGameProps): JSX.Element {
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
    const { learnedWords } = statistic;
    const {
      audioCallStats,
      audioReplyStats,
      sprintStats,
      savannahStats,
      allStats,
    } = statistic.optional;

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
    setWords((prev: number) => prev - 1);
    setCurrentWord((prev: number) => prev + 1);
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
        {responseSequence.map((button) => (
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

const mapStateToProps = (state: State) => ({
  isAuth: state.authReducer?.auth,
});

export default connect(mapStateToProps, null)(Savannah);
