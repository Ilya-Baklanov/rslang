import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Registration = (): JSX.Element => {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() => {
        history.push('/login');
      }}
    >
      Registration
    </button>
  );
};

export default connect(null, null)(Registration);
