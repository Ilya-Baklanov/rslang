/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { WordCategorySwitcherProps } from '@/types/props.types';
import putUserWord from '@/utils/putUserWord';

import styles from './style.scss';

const WordCategorySwitcher = ({
  wordCategory,
  word,
  onSwitch,
}: WordCategorySwitcherProps): JSX.Element => {
  const [wordCategoryChanged, setWordCategory] = useState('');
  const [categorySwitcherButtons, setCategorySwitcherButtons] = useState([
    'Добавить в сложные',
    'Удалить',
  ]);

  const date = new Date().toLocaleDateString();

  useEffect(() => {
    switch (wordCategory) {
      case 'learned':
        setCategorySwitcherButtons(['Добавить в "сложные"', 'Удалить']);
        break;
      case 'hard':
        setCategorySwitcherButtons(['Добавить в "изученные"', 'Удалить']);
        break;
      case 'deleted':
        setCategorySwitcherButtons(['Добавить в "изученные"', 'Добавить в "сложные"']);
        break;
      default:
        setCategorySwitcherButtons(['Добавить в сложные', 'Удалить']);
    }
  }, [wordCategory]);

  const categorySwitchHandler = (categoryMassage: string) => {
    switch (categoryMassage) {
      case 'Добавить в "изученные"':
        setWordCategory('learned');
        break;
      case 'Добавить в "сложные"':
        setWordCategory('hard');
        break;
      case 'Удалить':
        setWordCategory('deleted');
        break;
      default:
        setWordCategory('');
    }
  };

  useEffect(() => {
    if (wordCategoryChanged !== '') {
      const option = word.userWord ? word.userWord.optional : { date };
      putUserWord(word._id!, wordCategoryChanged, option)
        .then(() => {
          onSwitch();
          setWordCategory('');
        })
        .catch((err) => console.log(err));
    }
  }, [wordCategoryChanged]);

  return (
    <React.Fragment>
      {categorySwitcherButtons.map((el) => (
        <div className={styles['word-category-switcher-buttons']}>
          <button onClick={() => categorySwitchHandler(el)} type="button">
            {el}
          </button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default WordCategorySwitcher;
