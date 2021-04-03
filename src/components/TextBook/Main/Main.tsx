import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { MainContentProps } from '@/types/props.types';
import { State } from '@/types/states.types';

import Developers from './Developers/Developers';
import Dictionary from './Dictionary/Dictionary';
import Progress from './Progress/Progress';
import Settings from './Settings/Settings';
import Statistics from './Statistics/Statistics';
import MiniGames from './miniGames/MiniGames';
import MiniGamesCards from './miniGames/MiniGamesCards';
import styles from './style.scss';

const Main = ({ isAuth }: MainContentProps): JSX.Element => {
  const currentLocation = isAuth ? '/home' : '/rs-lang/guest';

  return (
    <div className={styles['main']}>
      <Redirect to={`${currentLocation}/progress`} />
      <Route path={`${currentLocation}/progress`}>
        <Progress />
      </Route>
      <Route path={`${currentLocation}/dictionary`}>
        <Dictionary />
      </Route>
      <Route path={`${currentLocation}/mini-games`}>
        <MiniGamesCards />
        <MiniGames />
      </Route>
      <Route path={`${currentLocation}/statistics`}>
        <Statistics />
      </Route>
      <Route path={`${currentLocation}/settings`}>
        <Settings />
      </Route>
      <Route path={`${currentLocation}/developers`}>
        <Developers />
      </Route>
    </div>
  );
};

const mapStateToProps = (state: State): MainContentProps => ({
  isAuth: state.authReducer!.auth,
});

export default connect(mapStateToProps, null)(Main);
