import React, { useState, FormEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styles from '@/authorization/style.scss';
import { authAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import Auth from '@/utils/Authorization/authEvents';

const AuthForm = (): JSX.Element => {
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const auth = new Auth();

  const registrationHandler = () => {
    history.push('/registration');
  };

  useEffect(() => {
    auth.goLogin();
  });

  const guestHandler = () => {
    history.push('/rs-lang/guest');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };

  return (
    <React.Fragment>
      <div className={styles['login-page-wrapper']}>
        <div className={styles['authorization']}>
          <div className={styles['form-wrapper']} id="form-login">
            <h1 className={styles['form-title']}>RS-Lang</h1>
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
                  Электронная почта:
                </Form.Label>
                <Form.Control
                  className={styles['form__input']}
                  required
                  type="email"
                  placeholder="your@e-mail"
                  id="login"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Электронная почта в формате Your@e-mail.com
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password" className={styles['form__label']}>
                  Пароль:
                </Form.Label>
                <Form.Control
                  required
                  className={styles['form__input']}
                  type="password"
                  id="password"
                />
                <Form.Control.Feedback>Готово!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Только цифры (от 8 до 16 символов)
                </Form.Control.Feedback>
              </Form.Group>

              <div className={styles['buttons-wrapper']}>
                <Button
                  onClick={registrationHandler}
                  className={styles['submit-button']}
                  id="registration-btn"
                  type="button"
                >
                  Регистрация
                </Button>

                <Button className={styles['submit-button']} id="login-btn" type="submit">
                  Вход
                </Button>

                <Button
                  onClick={guestHandler}
                  className={styles['guest-submit-button']}
                  id="guest-login-btn"
                  type="submit"
                >
                  Войти как гость
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

export default connect(null, mapDispatchToProps)(AuthForm);
