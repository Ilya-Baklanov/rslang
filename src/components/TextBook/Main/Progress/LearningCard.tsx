/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { AggregatedWords, Statistic, AggregatedWord } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';
import getStatistic from '@/utils/getStatistic';
import postStatistic from '@/utils/postStatistic';
import postUserWord from '@/utils/postUserWord';

import styles from './style.scss';

const LearningCard = (): JSX.Element => {
  const [words, setWords] = useState<AggregatedWord[]>([]);
  const [word, setWord] = useState({
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
      currentGroup: 0,
      currentPage: 0,
    },
  });

  useEffect(() => {
    getStatistic()
      .then((responseStatistic: Statistic) => (responseStatistic.learnedWords === 0
        ? postStatistic(statistic)
          .then()
          .catch(err => console.log(err))
        : setStatistic(responseStatistic)))
      .catch(err => console.log(err));

    getAggregatedWords('empty', 'empty', 'empty', '{"userWord":null}')
      .then((content: AggregatedWords) => setWords(content.paginatedResults))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (words[currentWord]) {
      const {
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
    const { currentGroup, currentPage } = statistic.optional;
    event.preventDefault();
    event.stopPropagation();
    postStatistic({
      learnedWords: learnedWords + 1,
      optional: {
        currentGroup,
        currentPage,
      },
    })
      .then((content: Statistic) => setStatistic(content))
      .catch(err => console.log(err));
    postUserWord(words[currentWord]._id, wordCategory)
      .then()
      .catch(err => console.log(err));
    setCurrentWord(currentWord + 1);
    setViewAnswer(false);
    setInputState('');
    setAnswerIsCorrect(false);
    setAnswerIsHidden(true);
    setWordCategory('learned');
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
      <div className={styles['learning-card']}>
        <img
          className={styles['image']}
          src={`https://reat-learnwords.herokuapp.com/${word.image}`}
          alt="Text"
        />
        {answerIsHidden ? '' : <h2 className={styles['word']}>{word.word}</h2>}
        {answerIsHidden ? '' : <h2 className={styles['transcription']}>{word.transcription}</h2>}
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
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default LearningCard;
