/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { Words } from '@/types/response.types';
import getWords from '@/utils/getWords';

import styles from './style.scss';

const LearnNewWord = (): JSX.Element => {
  const [words, setWords] = useState<Words>([]);
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
  const [currentWord, setCurrentWord] = useState(0);
  const [inputState, setInputState] = useState('');

  useEffect(() => {
    getWords(0, 0)
      .then(content => setWords(content))
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

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputState === word.word) {
      setCurrentWord(currentWord + 1);
      setInputState('');
    }
  };

  return (
    <div className={styles['learning-card']}>
      <img src={`https://reat-learnwords.herokuapp.com/${word.image}`} alt="Text" />
      <h2>{word.word}</h2>
      <h2>{word.transcription}</h2>
      <h2>{word.wordTranslate}</h2>
      <p>{word.textMeaning}</p>
      <p>{word.textMeaningTranslate}</p>
      <p>{word.textExample}</p>
      <p>{word.textExampleTranslate}</p>
      <form onSubmit={submitHandler}>
        <input value={inputState} type="text" onChange={inputHandler} />
        <button type="submit">Проверить</button>
      </form>
      <button type="button">Показать ответ</button>
    </div>
  );
};

export default LearnNewWord;
