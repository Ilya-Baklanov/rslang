import React from 'react';

import styles from '@/registration/style.scss';

import RegistrationForm from './RegistrationForm';

const Registration = (): JSX.Element => (
  <React.Fragment>
    <div className={styles['authorization-wrapper']}>
      <RegistrationForm />
    </div>
  </React.Fragment>
);

export default Registration;
