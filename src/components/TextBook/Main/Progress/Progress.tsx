import React, { useState } from 'react';

import LearningCard from './LearningCard';
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
      <div className={styles['type-of-learning-buttons']}>
        <button onClick={newWordHandler} type="button">
          Изучать новые слова
        </button>
        <button onClick={repeatWordHandler} type="button">
          Повторить для закрепления
        </button>
        <button onClick={hardWordHandler} type="button">
          Повторно изучить сложные слова
        </button>
      </div>
      <div className={styles['learning-zone']}>
        <LearningCard filterType={typeOfLearning} />
      </div>
    </div>
  );
};

export default Progress;
