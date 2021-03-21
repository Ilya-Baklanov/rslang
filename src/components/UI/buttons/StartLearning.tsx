import React from 'react';
import { useHistory } from 'react-router-dom';

const StartLearning = (): JSX.Element => {
  const history = useHistory();

  const clickHandler = () => {
    history.push('/login');
  };

  return (
    <button type="button" onClick={clickHandler}>
      Начать изучать Английский
    </button>
  );
};

export default StartLearning;
