import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import {} from './redux/actions';
import Authorization from '@/authorization/Authorization';
import MainPage from '@/components/MainPage/MainPage';
import Registration from '@/registration/Registration';

import TextBook from './components/TextBook/TextBook';
import { AppProps } from './types/props.types';
import { State } from './types/states.types';

const App = ({ isAuth }: AppProps) => {
  const RouteHome = () => {
    if (isAuth) {
      return <Redirect to="/home" />;
    }
    return <Redirect to="/rs-lang/preview" />;
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
        <Route path="/rs-lang">
          {isAuth ? (
            <Redirect to="/home" />
          ) : (
            <React.Fragment>
              <Route path="/rs-lang/preview">
                <MainPage />
              </Route>
              <Route path="/rs-lang/guest">
                <TextBook />
              </Route>
            </React.Fragment>
          )}
        </Route>
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
              <TextBook />
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
  isAuth: state.authReducer!.auth,
});

export default connect(mapStateToProps, null)(App);
