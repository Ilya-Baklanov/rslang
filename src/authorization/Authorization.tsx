import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authAction } from '@/redux/actions';
import { Actions } from '@/redux/actions.types';
import { AuthorizationProps } from '@/types/props.types';

const Authorization = ({ authAction }: AuthorizationProps): JSX.Element => {
  const history = useHistory();

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => {
          authAction();
        }}
      >
        Auth
      </button>
      <button
        type="button"
        onClick={() => {
          history.push('/registration');
        }}
      >
        Registration
      </button>
    </React.Fragment>
  );
};

const mapDispatchToProps: Actions = {
  authAction,
};

export default connect(null, mapDispatchToProps)(Authorization);
