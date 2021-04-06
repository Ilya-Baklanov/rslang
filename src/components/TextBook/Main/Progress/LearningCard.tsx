/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Loader from '@/components/UI/Loader/Loader';
import { showLoaderAction, hideLoaderAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { LearningCardProps } from '@/types/props.types';
import { AggregatedWords, Statistic, AggregatedWord } from '@/types/response.types';
import { State } from '@/types/states.types';
import getAggregatedWords from '@/utils/getAggregatedWords';
import getStatistic from '@/utils/getStatistic';
import postStatistic from '@/utils/postStatistic';
import postUserWord from '@/utils/postUserWord';
import putUserWord from '@/utils/putUserWord';

import styles from './style.scss';

const LearningCard = ({
  filterType,
  showLoaderAction,
  hideLoaderAction,
  loaderIsActive,
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
  });
  const [inputState, setInputState] = useState('');
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [answerIsHidden, setAnswerIsHidden] = useState(true);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordCategory, setWordCategory] = useState('learned');
  const [statistic, setStatistic] = useState<Statistic>({
    learnedWords: 0,
    optional: {
      audioCallStats: [],
      audioReplyStats: [],
      sprintStats: [],
      savannahStats: [],
      allStats: {
        '': 0,
      },
    },
  });
  const [filter, setFilter] = useState('new');
  const date = new Date().toLocaleDateString();

  const resetStateLearningCard = () => {
    setViewAnswer(false);
    setInputState('');
    setAnswerIsCorrect(false);
    setAnswerIsHidden(true);
    setWordCategory('learned');
  };

  useEffect(() => {
    if (filterType === 'new') {
      setFilter('{"userWord":null}');
    } else if (filterType === 'repeat') {
      setFilter('{"userWord.difficulty":"repeat"}');
    } else if (filterType === 'hard') {
      setFilter('{"userWord.difficulty":"hard"}');
    }
  }, [filterType]);

  useEffect(() => {
    getStatistic()
      .then((responseStatistic: Statistic) => setStatistic(responseStatistic))
      .catch(err => console.log(err));

    getAggregatedWords('empty', 'empty', 'empty', filter)
      .then((content: AggregatedWords) => {
        setWords(content.paginatedResults);
        resetStateLearningCard();
      })
      .catch(err => console.log(err));
  }, [filter]);

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
      });
    }
  }, [words, currentWord]);

  useEffect(() => {
    if (answerIsCorrect && filterType === 'new') {
      postUserWord(words[currentWord]._id, wordCategory, { date })
        .then()
        .catch(err => console.log(err));
    }
  }, [answerIsCorrect]);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(event.target.value);
  };

  const submitHandlerValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputState === word.word) {
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
    console.log(statistic);

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
      .catch(err => console.log(err));

    const option = words[currentWord].userWord ? words[currentWord].userWord.optional : { date };
    putUserWord(words[currentWord]._id, wordCategory, option)
      .then()
      .catch(err => console.log(err));
    setCurrentWord(currentWord + 1);
    resetStateLearningCard();
  };

  const viewAnswerHandler = () => {
    setViewAnswer(true);
    setAnswerIsCorrect(true);
    setAnswerIsHidden(false);
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

  const createMarkup = (text: string, answerIsCorrect: boolean) => {
    const innerText = answerIsCorrect ? text : text.replace(/<.*>/, '[...]');
    return {
      __html: innerText,
    };
  };

  return (
    <React.Fragment>
      {words.length === 0 ? (
        <div>NET SLOV</div>
      ) : (
        <div className={styles['learning-card-wrapper']}>
          <div className={styles['learning-card']}>
            <img
              className={styles['image']}
              src={`https://reat-learnwords.herokuapp.com/${word.image}`}
              alt="Text"
            />
            {answerIsHidden ? '' : <h2 className={styles['word']}>{word.word}</h2>}
            {answerIsHidden ? (
              ''
            ) : (
              <h2 className={styles['transcription']}>{word.transcription}</h2>
            )}
            <h2 className={styles['word-translate']}>{word.wordTranslate}</h2>
            <p
              dangerouslySetInnerHTML={createMarkup(word.textMeaning, answerIsCorrect)}
              className={styles['text-meaning']}
            />
            {answerIsHidden ? (
              ''
            ) : (
              <p className={styles['text-meaning-translate']}>{word.textMeaningTranslate}</p>
            )}
            <p
              dangerouslySetInnerHTML={createMarkup(word.textExample, answerIsCorrect)}
              className={styles['text-example']}
            />
            {answerIsHidden ? (
              ''
            ) : (
              <p className={styles['text-example-translate']}>{word.textExampleTranslate}</p>
            )}
            <form
              className={styles['form']}
              onSubmit={answerIsCorrect ? submitHandlerNextWord : submitHandlerValidation}
            >
              <input
                className={styles['input']}
                value={viewAnswer ? word.word : inputState}
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
            <div className={styles['category-buttons']}>
              <button onClick={repeatWordHandler} type="button">
                Это нужно повторить
              </button>
              <button onClick={hardWordHandler} type="button">
                Это было сложно
              </button>
              <button onClick={deletedWordHandler} type="button">
                Удалить это слово, я его знаю
              </button>
              {filterType === 'repeat' || 'hard' ? (
                <button onClick={deletedWordHandler} type="button">
                  Больше не повторять
                </button>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  loaderIsActive: state.loaderReducer!.isLoading,
});

const mapDispatchToProps: Actions = {
  showLoaderAction,
  hideLoaderAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LearningCard);
