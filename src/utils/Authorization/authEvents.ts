/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */

import store from '@/index';
import { authAction } from '@/redux/actions';
import { AuthData } from '@/redux/actions.types';

import getAvatar from '../getAvatar';
import postStatistic from '../postStatistic';
import putUserSettings from '../putUserSettings';
import createUser from '../registration';
import loginUser from '../signIn';

import { getErrors } from './authErrorEnum';
// listen for auth status changes

export default class Auth {
  goSignUp() {
    // signup
    const registerButton = document.querySelector('#registration-btn-regForm');
    const avatar = document.querySelector('#formElem');
    const errServ = document.querySelector('#errServ') as HTMLElement;
    const errImg = document.querySelector('#errImg') as HTMLElement;

    let avatarUrl = '';

    avatar?.addEventListener('change', e => {
      const target = e.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      if (file['size'] > 5242880) {
        errImg.innerHTML = 'Размер картинки превышает 5 MB';
      } else {
        getAvatar(avatar)
          .then(content => {
            avatarUrl = content.url;
          })
          .catch(er => {
            errServ.innerHTML = er.message || '';
          });
      }
    });

    registerButton?.addEventListener('click', e => {
      // get user info
      const userName = document.querySelector('#user-name') as HTMLInputElement;
      const mail = document.querySelector('#login-reg-form') as HTMLInputElement;
      const password = document.querySelector('#password-reg-form') as HTMLInputElement;
      const errServ = document.querySelector('#errServ') as HTMLElement;

      const target = e.target as HTMLInputElement;
      const targetParent1 = target.parentNode as HTMLInputElement;
      const targetParent2 = targetParent1.parentNode as HTMLInputElement;
      const targetParentChildren = targetParent2.children[1] as HTMLInputElement;
      const targetParentChildNode = targetParentChildren.childNodes[0][0] as HTMLInputElement;
      const targetParentChildNodeFiles = targetParentChildNode.files as FileList;
      const targetParentChildNodeLength = targetParentChildNodeFiles.length;

      const userFullObject = {
        name: userName.value,
        email: mail.value,
        password: password.value,
        photo: avatarUrl,
      };

      const loginUserObject = {
        email: mail.value,
        password: password.value,
      };

      if (targetParentChildNodeLength === 0) {
        errImg.innerHTML = 'Загрузите картинку';
      } else if (
        targetParentChildNodeFiles[0]['type'] === 'image/jpeg'
        || targetParentChildNodeFiles[0]['type'] === 'image/png'
        || targetParentChildNodeFiles[0]['type'] === 'image/jpg'
        || targetParentChildNodeFiles[0]['type'] === 'image/svg+xml'
      ) {
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

                postStatistic({
                  learnedWords: 0,
                  optional: {
                    audioCallStats: {
                      '': 0,
                    },
                    audioReplyStats: {
                      '': 0,
                    },
                    sprintStats: {
                      '': 0,
                    },
                    savannahStats: {
                      '': 0,
                    },
                    allStats: {
                      '': 0,
                    },
                  },
                })
                  .then(() => console.log('success'))
                  .catch(err => console.log(err));

                putUserSettings(10, {
                  wordTranslate: true,
                  textTranslate: true,
                  hardButton: true,
                  repeatButton: true,
                  deleteButton: true,
                })
                  .then(() => console.log('success'))
                  .catch(err => console.log(err));
              })
              .catch(er => {
                localStorage.setItem('isAuth', 'false');
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                errServ.innerHTML = getErrors(er.stack) || '';
              });
          })
          .catch(er => {
            localStorage.setItem('isAuth', 'false');
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            errServ.innerHTML = getErrors(er.stack) || '';
          });
      } else {
        errImg.innerHTML = 'Формат фото может быть jpeg/jpg/png/svg';
      }
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
