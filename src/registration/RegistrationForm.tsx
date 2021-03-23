import React, { FormEvent, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import styles from '@/registration/style.scss';

import Auth from '../utils/Authorization/authEvents';

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const auth = new Auth();

  const loginHandler = () => {
    history.push('/login');
  };

  useEffect(() => {
    auth.goSignUp();
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  return (
    <React.Fragment>
      <div className={styles['login-page-wrapper']}>
        <div className={styles['registration']}>
          <div className={styles['form-wrapper']} id="reg-form-login">
            <div className={styles['form-title-wrapper']}>
              <h1 className={styles['form-title']}>Регистрация</h1>
              <Button
                onClick={loginHandler}
                className={styles['back-to-login-button']}
                id="back-to-login-btn"
                type="button"
              >
                <img
                  className={styles['back-to-login-icon']}
                  src="../../assets/image/logout_icon.png"
                  alt="back-to-login"
                />
                {' '}
                Назад
              </Button>
            </div>
            <Form
              noValidate
              validated={validated}
              className={styles['form']}
              onSubmit={event => {
                handleSubmit(event);
              }}
            >
              <Form.Group>
                <Form.Label htmlFor="login" className={styles['form__label']}>
                  Имя:
                </Form.Label>
                <Form.Control
                  className={styles['form__input']}
                  required
                  type="text"
                  placeholder="Иван"
                  id="user-name"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Введите корректное имя</Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group>
                <Form.Label htmlFor="login" className={styles['form__label']}>
                  Фамилия:
                </Form.Label>
                <Form.Control
                  className={styles['form__input']}
                  required
                  type="text"
                  placeholder="Иванов"
                  id="user-surname"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Введит корректную фамилию
                </Form.Control.Feedback>
              </Form.Group> */}
              <Form.Group>
                <Form.Label htmlFor="login" className={styles['form__label']}>
                  Электронная почта:
                </Form.Label>
                <Form.Control
                  className={styles['form__input']}
                  required
                  type="email"
                  placeholder="your@e-mail"
                  id="login-reg-form"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Электронная почта в формате Your@e-mail.com
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password" className={styles['form__label']}>
                  Пароль
                </Form.Label>
                <Form.Control
                  required
                  className={styles['form__input']}
                  type="password"
                  id="password-reg-form"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Только цифры (от 8 до 16 символов)
                </Form.Control.Feedback>
              </Form.Group>
              <div className={styles['buttons-wrapper']}>
                <Button
                  className={styles['submit-button']}
                  id="registration-btn-regForm"
                  type="submit"
                >
                  Зарегистрироваться
                </Button>
              </div>
              <div className={styles['errorServ']} id="errServ" />
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps: Actions = {
  authAction,
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
