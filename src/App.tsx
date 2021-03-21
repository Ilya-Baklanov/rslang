import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import {} from './redux/actions';
import Authorization from '@/Authorization/Authorization';
import Registration from '@/Registration/Registration';
import MainPage from '@/components/MainPage/MainPage';

import { AppProps } from './types/props.types';
import { State } from './types/states.types';

const App = ({ isAuth }: AppProps) => {
  const RouteHome = () => {
    if (isAuth) {
      return <Redirect to="/home" />;
    }
    return <Redirect to="/guest" />;
  };

  const RouteLogin = () => {
    if (isAuth) {
      return <Redirect to="/home" />;
    }
    return <Authorization />;
  };

  const RouteRegistration = () => {
    if (isAuth) {
      return <Redirect to="/home" />;
    }
    return <Registration />;
  };

  return (
    <BrowserRouter basename="#">
      <Switch>
        <Route path="/guest">{isAuth ? <Redirect to="/home" /> : <MainPage />}</Route>
        <Route exact path="/">
          <RouteHome />
        </Route>
        <Route push path="/login">
          <RouteLogin />
        </Route>
        <Route push path="/registration">
          <RouteRegistration />
        </Route>
        {isAuth ? (
          <React.Fragment>
            <Route path="/home">
              <MainPage />
            </Route>
            <Route push path="/test">
              <div>TEST PAGE</div>
            </Route>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: State): AppProps => ({
  isAuth: state.authReducer.auth,
});

export default connect(mapStateToProps, null)(App);
