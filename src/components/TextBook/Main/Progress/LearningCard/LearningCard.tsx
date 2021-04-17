/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Loader from '@/components/UI/Loader/Loader';
import { showLoaderAction, hideLoaderAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { LearningCardProps } from '@/types/props.types';
import {
  AggregatedWords, Statistic, AggregatedWord, UserSettings,
} from '@/types/response.types';
import { State } from '@/types/states.types';
import getAggregatedWords from '@/utils/getAggregatedWords';
import getStatistic from '@/utils/getStatistic';
import getUserSettings from '@/utils/getUserSettings';
import postStatistic from '@/utils/postStatistic';
import postUserWord from '@/utils/postUserWord';
import putUserSettings from '@/utils/putUserSettings';
import putUserWord from '@/utils/putUserWord';

import styles from './style.scss';

const LearningCard = ({
  filterType,
  showLoaderAction,
  hideLoaderAction,
  loaderIsActive,
  isAuth,
}: LearningCardProps): JSX.Element => {
  const [words, setWords] = useState<AggregatedWord[]>([]);
  const [word, setWord] = useState({
    _id: '',
    image: '',
    word: '',
    textMeaning: '',
    textExample: '',
    transcription: '',
    textExampleTranslate: '',
    textMeaningTranslate: '',
    wordTranslate: '',
    audio: '',
    audioExample: '',
    audioMeaning: '',
  });
  const [inputState, setInputState] = useState('');
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [answerIsHidden, setAnswerIsHidden] = useState(true);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [learnedWordsToday, setLearnedWordsToday] = useState(0);
  const [wordCategory, setWordCategory] = useState('learned');
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
  const [filter, setFilter] = useState('{"userWord":null}');
  const [settings, setSettings] = useState<UserSettings>({
    wordsPerDay: 10,
    optional: {
      wordTranslate: false,
      textTranslate: false,
      hardButton: false,
      repeatButton: false,
      deleteButton: false,
    },
  });
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const textMeaningRef = useRef<HTMLAudioElement>(null);
  const textExampleRef = useRef<HTMLAudioElement>(null);

  const history = useHistory();

  const resetStateLearningCard = () => {
    setReadyToSubmit(false);
    setInputState('');
    setAnswerIsCorrect(false);
    setAnswerIsHidden(true);
  };

  useEffect(() => {
    if (date !== new Date().toLocaleDateString()) {
      putUserSettings(10, settings.optional)
        .then((responseSettings: UserSettings) => setSettings(responseSettings))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (filterType === 'new') {
      setFilter('{"userWord":null}');
      setWordCategory('learned');
    } else if (filterType === 'repeat') {
      setFilter('{"userWord.difficulty":"repeat"}');
      setWordCategory('repeat');
    } else if (filterType === 'hard') {
      setFilter('{"userWord.difficulty":"hard"}');
      setWordCategory('hard');
    }
  }, [filterType]);

  useEffect(() => {
    resetStateLearningCard();
    setCurrentWord(0);
    getUserSettings()
      .then((responseSettings: UserSettings) => setSettings(responseSettings))
      .catch((err) => console.log(err));

    getStatistic()
      .then((responseStatistic: Statistic) => {
        setStatistic(responseStatistic);
        setLearnedWordsToday(responseStatistic.optional.allStats[`${date}`]);
      })
      .catch((err) => console.log(err));

    getAggregatedWords('empty', 'empty', 'empty', filter)
      .then((content: AggregatedWords) => {
        setWords(content.paginatedResults);
      })
      .catch((err) => console.log(err));
  }, [filter]);

  useEffect(() => {
    if (learnedWordsToday === settings.wordsPerDay) {
      const incrementWordsLimit = confirm(
        'Лимит слов на сегодня закончен. Хотите увеличить лимит?'
      );
      if (incrementWordsLimit) {
        putUserSettings(settings.wordsPerDay + 10, settings.optional)
          .then((responseSettings: UserSettings) => setSettings(responseSettings))
          .catch((err) => console.log(err));

        getAggregatedWords('empty', 'empty', 'empty', filter)
          .then((content: AggregatedWords) => {
            setWords(content.paginatedResults);
            resetStateLearningCard();
          })
          .catch((err) => console.log(err));
      }

      setCurrentWord(0);
    }
  }, [learnedWordsToday]);

  useEffect(() => {
    if (words[currentWord]) {
      const {
        _id,
        image,
        word,
        textMeaning,
        textExample,
        transcription,
        textExampleTranslate,
        textMeaningTranslate,
        wordTranslate,
        audio,
        audioExample,
        audioMeaning,
      } = words[currentWord];

      setWord({
        _id,
        image,
        word,
        textMeaning,
        textExample,
        transcription,
        textExampleTranslate,
        textMeaningTranslate,
        wordTranslate,
        audio,
        audioExample,
        audioMeaning,
      });
    }
  }, [words, currentWord]);

  useEffect(() => {
    if (answerIsCorrect && filterType === 'new') {
      postUserWord(words[currentWord]._id, wordCategory, { date })
        .then()
        .catch((err) => console.log(err));
    }
  }, [answerIsCorrect]);

  useEffect(() => {
    if (readyToSubmit) {
      const option = words[currentWord].userWord ? words[currentWord].userWord!.optional : { date };
      putUserWord(words[currentWord]._id, wordCategory, option)
        .then()
        .catch((err) => console.log(err));
    }
  }, [wordCategory]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const submitHandlerValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputState === word.word) {
      setReadyToSubmit(true);
      setAnswerIsCorrect(true);
      setAnswerIsHidden(false);
    }
  };

  const submitHandlerNextWord = (event: React.FormEvent<HTMLFormElement>) => {
    const { learnedWords } = statistic;
    const {
      audioCallStats,
      audioReplyStats,
      sprintStats,
      savannahStats,
      allStats,
    } = statistic.optional;

    event.preventDefault();
    event.stopPropagation();

    if (allStats[`${date}`]) {
      allStats[`${date}`] = allStats[`${date}`] + 1;
    } else {
      allStats[`${date}`] = 1;
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
      .catch((err) => console.log(err));

    if (currentWord < 9) {
      setCurrentWord(currentWord + 1);
    }
    setLearnedWordsToday(learnedWordsToday + 1);
    resetStateLearningCard();
  };

  const viewAnswerHandler = () => {
    setReadyToSubmit(true);
    setAnswerIsCorrect(true);
    setAnswerIsHidden(false);
    setWordCategory('repeat');
    setInputState(word.word);
  };

  const repeatWordHandler = () => {
    setWordCategory('repeat');
  };

  const hardWordHandler = () => {
    setWordCategory('hard');
  };

  const deletedWordHandler = () => {
    setWordCategory('deleted');
  };

  const learnedWordHandler = () => {
    setWordCategory('learned');
  };

  const audioHandler = (typeOfText: string) => {
    if (typeOfText === 'textMeaning') {
      textMeaningRef.current?.play();
    }
    if (typeOfText === 'textExample') {
      textExampleRef.current?.play();
    }
  };

  const createMarkup = (text: string, answerIsCorrect: boolean) => {
    const innerText = answerIsCorrect ? text : text.replace(/<.*>/, '[...]');
    return {
      __html: innerText,
    };
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  const {
    wordTranslate,
    textTranslate,
    hardButton,
    repeatButton,
    deleteButton,
  } = settings.optional;

  return (
    <React.Fragment>
      {words.length === 0 ? (
        isAuth ? (
          <div className={styles['no-words']}>Добавьте слова</div>
        ) : (
          <button onClick={redirectToLogin} type="button">
            <div className={styles['no-words']}>Добавьте слова</div>
          </button>
        )
      ) : (
        <div className={styles['learning-card-wrapper']}>
          <div className={styles['learning-card']}>
            <img
              className={styles['image']}
              src={`https://reat-learnwords.herokuapp.com/${word.image}`}
              alt="Text"
            />
            {answerIsHidden ? '' : <span className={styles['word']}>{word.word}</span>}
            {answerIsHidden ? (
              ''
            ) : (
              <span className={styles['transcription']}>{word.transcription}</span>
            )}
            {wordTranslate ? (
              <span className={styles['word-translate']}>{word.wordTranslate}</span>
            ) : (
              ''
            )}
            <div className={styles['text-meaning']}>
              <p dangerouslySetInnerHTML={createMarkup(word.textMeaning, answerIsCorrect)} />
              <button
                type="button"
                onClick={() => audioHandler('textMeaning')}
                className={styles['audio-play-button']}
              >
                Play
                <audio
                  ref={textMeaningRef}
                  src={`https://reat-learnwords.herokuapp.com/${word.audioMeaning}`}
                >
                  <track kind="captions" />
                </audio>
              </button>
            </div>
            {answerIsHidden ? (
              ''
            ) : textTranslate ? (
              <p className={styles['text-meaning-translate']}>{word.textMeaningTranslate}</p>
            ) : (
              ''
            )}
            <div className={styles['text-example']}>
              <p dangerouslySetInnerHTML={createMarkup(word.textExample, answerIsCorrect)} />
              <button
                type="button"
                onClick={() => audioHandler('textExample')}
                className={styles['audio-play-button']}
              >
                Play
                <audio
                  ref={textExampleRef}
                  src={`https://reat-learnwords.herokuapp.com/${word.audioExample}`}
                >
                  <track kind="captions" />
                </audio>
              </button>
            </div>
            {answerIsHidden ? (
              ''
            ) : textTranslate ? (
              <p className={styles['text-example-translate']}>{word.textExampleTranslate}</p>
            ) : (
              ''
            )}
            <form
              className={styles['form']}
              onSubmit={answerIsCorrect ? submitHandlerNextWord : submitHandlerValidation}
            >
              <input
                className={styles['input']}
                value={inputState}
                type="text"
                onChange={inputHandler}
              />
              <button className={styles['submit-button']} type="submit">
                {answerIsCorrect ? 'Следующее слово' : 'Проверить'}
              </button>
            </form>
            <button onClick={viewAnswerHandler} className={styles['view-answer']} type="button">
              Показать ответ
            </button>
          </div>
          {answerIsCorrect ? (
            <div className={styles['category-switcher']}>
              {repeatButton ? (
                <button
                  className={
                    wordCategory === 'repeat'
                      ? styles['category-button_active']
                      : styles['category-button']
                  }
                  onClick={repeatWordHandler}
                  type="button"
                >
                  Это нужно повторить
                </button>
              ) : (
                ''
              )}
              {hardButton ? (
                <button
                  className={
                    wordCategory === 'hard'
                      ? styles['category-button_active']
                      : styles['category-button']
                  }
                  onClick={hardWordHandler}
                  type="button"
                >
                  Это было сложно
                </button>
              ) : (
                ''
              )}
              {deleteButton && filterType === 'new' ? (
                <button
                  className={
                    wordCategory === 'deleted'
                      ? styles['category-button_active']
                      : styles['category-button']
                  }
                  onClick={deletedWordHandler}
                  type="button"
                >
                  Удалить это слово, я его знаю
                </button>
              ) : (
                ''
              )}
              {filterType === 'repeat' || filterType === 'hard' ? (
                <button
                  className={
                    wordCategory === 'learned'
                      ? styles['category-button_active']
                      : styles['category-button']
                  }
                  onClick={learnedWordHandler}
                  type="button"
                >
                  Больше не повторять
                </button>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className={styles['category-switcher']} />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  loaderIsActive: state.loaderReducer!.isLoading,
  isAuth: state.authReducer?.auth,
});

const mapDispatchToProps: Actions = {
  showLoaderAction,
  hideLoaderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningCard);
