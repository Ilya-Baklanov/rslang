/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { DictionaryProps } from '@/types/props.types';
import { AggregatedWord, AggregatedWords, Words } from '@/types/response.types';
import { State } from '@/types/states.types';
import getAggregatedWords from '@/utils/getAggregatedWords';
import getWords from '@/utils/getWords';

import styles from './style.scss';

const Dictionary = ({ isAuth }: DictionaryProps): JSX.Element => {
  const [words, setWords] = useState<AggregatedWord[]>([]);
  const [totalCountWords, settTotalCountWords] = useState(0);
  const [wordCategory, setWordCategory] = useState('learned');
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = wordCategory === 'all' ? 30 : Math.ceil(totalCountWords / 10);

  const history = useHistory();

  useEffect(() => {
    if (wordCategory === 'all') {
      getWords(currentPageAll - 1, currentGroup)
        .then((content: Words) => {
          setWords(content);
        })
        .catch((err) => console.log(err));
    } else if (isAuth) {
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
        .catch((err) => console.log(err));
    }
  }, [wordCategory, currentPage, currentGroup, currentPageAll]);

  const allWordHandler = () => {
    setWordCategory('all');
  };

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

  const inputSwitchPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPageAll(+event.target.value);
  };

  const prevPageHandler = () => {
    if (wordCategory === 'all') {
      if (currentPageAll > 1) {
        setCurrentPageAll(currentPageAll - 1);
      }
    } else if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (wordCategory === 'all') {
      if (currentPageAll < pageCount) {
        setCurrentPageAll(currentPageAll + 1);
      }
    } else if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const redirectToLogin = () => {
    history.push('/login');
  };

  return (
    <div className={styles['dictionary']}>
      <div className={styles['category-buttons']}>
        <button
          className={
            wordCategory === 'all' ? styles['category-button_active'] : styles['category-button']
          }
          onClick={allWordHandler}
          type="button"
        >
          Учебник
        </button>
        <button
          className={
            wordCategory === 'learned'
              ? styles['category-button_active']
              : styles['category-button']
          }
          onClick={learnedWordHandler}
          type="button"
        >
          Изученные
        </button>
        <button
          className={
            wordCategory === 'hard' ? styles['category-button_active'] : styles['category-button']
          }
          onClick={hardWordHandler}
          type="button"
        >
          Сложные
        </button>
        <button
          className={
            wordCategory === 'deleted'
              ? styles['category-button_active']
              : styles['category-button']
          }
          onClick={deletedWordHandler}
          type="button"
        >
          Удалённые
        </button>
      </div>
      <Form className={styles['form-pagination']}>
        <Form.Group className={styles['form-item']}>
          <Form.Label className={styles['form-label']}>Уровень сложности</Form.Label>
          <Form.Control
            className={styles['form-control']}
            as="select"
            onChange={selectHandler}
            name="Level-Group"
            id="level"
            value={currentGroup}
            defaultValue={currentGroup}
            size="sm"
          >
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={2}>3</option>
            <option value={3}>4</option>
            <option value={4}>5</option>
            <option value={5}>6</option>
          </Form.Control>
        </Form.Group>
        <div className={styles['pagination-buttons']}>
          <button type="button" onClick={prevPageHandler}>
            PREV
          </button>
          <div className={styles['current-page-number']}>
            {wordCategory === 'all' ? currentPageAll : currentPage}
          </div>
          <button type="button" onClick={nextPageHandler}>
            NEXT
          </button>
        </div>
        {wordCategory === 'all' && (
          <Form.Group className={styles['form-item']}>
            <Form.Label className={styles['form-label']}>Страница (от 1 до 30)</Form.Label>
            <Form.Control
              className={styles['form-control']}
              type="number"
              max={30}
              min={1}
              value={currentPageAll}
              onChange={inputSwitchPageHandler}
              size="sm"
            />
          </Form.Group>
        )}
      </Form>
      {isAuth ? (
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
      ) : (
        <button onClick={redirectToLogin} type="button">
          <div className={styles['no-words']}>Добавьте слова</div>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isAuth: state.authReducer?.auth,
});

export default connect(mapStateToProps, null)(Dictionary);
