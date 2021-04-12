import React, { useState } from 'react';

import LearningCard from './LearningCard/LearningCard';
import styles from './style.scss';

const Progress = (): JSX.Element => {
  const [typeOfLearning, setTypeOfLearning] = useState('new');

  const newWordHandler = () => {
    setTypeOfLearning('new');
  };

  const repeatWordHandler = () => {
    setTypeOfLearning('repeat');
  };

  const hardWordHandler = () => {
    setTypeOfLearning('hard');
  };

  return (
    <div className={styles['progress']}>
      <div className={styles['type-of-learning-switcher']}>
        <button
          className={
            typeOfLearning === 'new'
              ? styles['type-of-learning-button_active']
              : styles['type-of-learning-button']
          }
          onClick={newWordHandler}
          type="button"
        >
          Новые
        </button>
        <button
          className={
            typeOfLearning === 'repeat'
              ? styles['type-of-learning-button_active']
              : styles['type-of-learning-button']
          }
          onClick={repeatWordHandler}
          type="button"
        >
          Повторить
        </button>
        <button
          className={
            typeOfLearning === 'hard'
              ? styles['type-of-learning-button_active']
              : styles['type-of-learning-button']
          }
          onClick={hardWordHandler}
          type="button"
        >
          Сложные
        </button>
      </div>
      <div className={styles['learning-zone']}>
        <LearningCard filterType={typeOfLearning} />
      </div>
    </div>
  );
};

export default Progress;
