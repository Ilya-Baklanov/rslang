import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Developers from './Developers/Developers';
import Dictionary from './Dictionary/Dictionary';
import Progress from './Progress/Progress';
import Settings from './Settings/Settings';
import Statistics from './Statistics/Statistics';
import MiniGames from './miniGames/MiniGames';
import MiniGamesCards from './miniGames/MiniGamesCards';
import styles from './style.scss';

const Main = (): JSX.Element => (
  <div className={styles['main']}>
    <Redirect to="/home/progress" />
    <Route path="/home/progress">
      <Progress />
    </Route>
    <Route path="/home/dictionary">
      <Dictionary />
    </Route>
    <Route path="/home/mini-games">
      <MiniGamesCards />
      <MiniGames />
    </Route>
    <Route path="/home/statistics">
      <Statistics />
    </Route>
    <Route path="/home/settings">
      <Settings />
    </Route>
    <Route path="/home/developers">
      <Developers />
    </Route>
  </div>
);

export default Main;
