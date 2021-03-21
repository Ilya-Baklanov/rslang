import React from 'react';

import styles from '@/Authorization/style.scss';

import AuthForm from './AuthForm';

const Authorization = (): JSX.Element => (
  <React.Fragment>
    <div className={styles['authorization-wrapper']}>
      <AuthForm />
    </div>
  </React.Fragment>
);

export default Authorization;
