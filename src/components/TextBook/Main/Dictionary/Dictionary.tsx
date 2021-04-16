/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { AggregatedWord, AggregatedWords } from '@/types/response.types';
import getAggregatedWords from '@/utils/getAggregatedWords';

import styles from './style.scss';

const Dictionary = (): JSX.Element => {
  const [words, setWords] = useState<AggregatedWord[]>([]);
  const [totalCountWords, settTotalCountWords] = useState(0);
  const [wordCategory, setWordCategory] = useState('learned');
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAggregatedWords(
      currentGroup,
      currentPage - 1,
      10,
      `{"userWord.difficulty":"${wordCategory}"}`
    )
      .then((content: AggregatedWords) => {
        setWords(content.paginatedResults);
        settTotalCountWords(content.totalCount[0].count);
      })
      .catch(err => console.log(err));
  }, [wordCategory, currentPage, currentGroup]);

  const learnedWordHandler = () => {
    setCurrentPage(1);
    setWordCategory('learned');
  };

  const hardWordHandler = () => {
    setCurrentPage(1);
    setWordCategory('hard');
  };

  const deletedWordHandler = () => {
    setCurrentPage(1);
    setWordCategory('deleted');
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentGroup(+event.target.value);
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    const pageCount = Math.ceil(totalCountWords / 10);
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
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
      <div>
        <select
          onChange={selectHandler}
          name="Level-Group"
          id="level"
          value={currentGroup}
          defaultValue={currentGroup}
        >
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2}>3</option>
          <option value={3}>4</option>
          <option value={4}>5</option>
          <option value={5}>6</option>
        </select>
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
      <div className={styles['pagination-buttons']}>
        <button type="button" onClick={prevPageHandler}>
          PREV
        </button>
        <div className={styles['current-page-number']}>{currentPage}</div>
        <button type="button" onClick={nextPageHandler}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Dictionary;
