/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import store from '@/index';
import { authAction } from '@/redux/actions';
import { AuthData } from '@/redux/actions.types';

import createUser from '../registration';
import loginUser from '../signIn';

import { getErrors } from './authErrorEnum';
// listen for auth status changes

export default class Auth {
  goSignUp() {
    // signup
    const registerButton = document.querySelector('#registration-btn-regForm');

    registerButton?.addEventListener('click', () => {
      // get user info
      const userName = document.querySelector('#user-name') as HTMLInputElement;
      const mail = document.querySelector('#login-reg-form') as HTMLInputElement;
      const password = document.querySelector('#password-reg-form') as HTMLInputElement;

      const userFullObject = {
        name: userName.value,
        email: mail.value,
        password: password.value,
      };

      const loginUserObject = {
        email: mail.value,
        password: password.value,
      };

      createUser(userFullObject)
        .then(() => {
          localStorage.setItem('isAuth', 'true');
          loginUser(loginUserObject)
            .then(content => {
              const { userId, token } = content;

              const authJson: AuthData = {
                userId,
                token,
              };

              localStorage.setItem('userId', userId);
              localStorage.setItem('token', token);
              store.dispatch(authAction(authJson));
            })
            .catch(er => {
              localStorage.setItem('isAuth', 'false');
              localStorage.removeItem('userId');
              localStorage.removeItem('token');
              const errServ = document.querySelector('#errServ') as HTMLElement;
              errServ.innerHTML = getErrors(er.stack) || '';
            });
        })
        .catch(er => {
          localStorage.setItem('isAuth', 'false');
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          const errServ = document.querySelector('#errServ') as HTMLElement;
          errServ.innerHTML = getErrors(er.stack) || '';
        });
    });
  }

  goLogin() {
    const logInButton = document.querySelector('#login-btn');

    logInButton?.addEventListener('click', () => {
      const mail = document.querySelector('#login') as HTMLInputElement;
      const password = document.querySelector('#password') as HTMLInputElement;

      const loginUserObject = {
        email: mail.value,
        password: password.value,
      };

      // log the user in
      loginUser(loginUserObject)
        .then(content => {
          localStorage.setItem('isAuth', 'true');

          const { userId, token } = content;

          const authJson: AuthData = {
            userId,
            token,
          };

          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);
          store.dispatch(authAction(authJson));
        })
        .catch(er => {
          localStorage.setItem('isAuth', 'false');
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          const errServ = document.querySelector('#errServ') as HTMLElement;
          errServ.innerHTML = getErrors(er.stack) || '';
        });
    });
  }
}
