/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import styles from './style.scss';

const Dictionary = (): JSX.Element => {
  const [words, setWords] = useState<AggregatedWord[]>([]);
  const [wordCategory, setWordCategory] = useState('learned');

  useEffect(() => {
    getAggregatedWords('empty', 'empty', 10, `{"userWord.difficulty":"${wordCategory}"}`)
      .then((content: AggregatedWords) => setWords(content.paginatedResults))
      .catch(err => console.log(err));
  }, [wordCategory]);

  const learnedWordHandler = () => {
    setWordCategory('learned');
  };

  const hardWordHandler = () => {
    setWordCategory('hard');
  };

  const deletedWordHandler = () => {
    setWordCategory('deleted');
  };

  return (
    <div className={styles['dictionary']}>
      <div className={styles['category-buttons']}>
        <button onClick={learnedWordHandler} type="button">
          Изученные
        </button>
        <button onClick={hardWordHandler} type="button">
          Сложные
        </button>
        <button onClick={deletedWordHandler} type="button">
          Удалённые
        </button>
      </div>
      <div className={styles['word-list']}>
        {words.map((word: AggregatedWord) => (
          <div className={styles['word-wrapper']}>
            <img
              className={styles['image']}
              src={`https://reat-learnwords.herokuapp.com/${word.image}`}
              alt="Text"
            />
            <div className={styles['word-container']}>
              <span className={styles['word']}>{word.word}</span>
              <span className={styles['word-translate']}>{word.wordTranslate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dictionary;
