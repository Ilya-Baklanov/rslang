import classnames from 'classnames';
import React from 'react';

import wpStyles from './WordPlate.scss';

interface WordPlateProps {
  label: string;
  isBig?: boolean;
  isShadowed?: boolean;
}

function WordPlate({ label, isBig = false, isShadowed = false }: WordPlateProps): JSX.Element {
  return (
    <div
      className={classnames(
        wpStyles['word-plate'],
        isBig ? wpStyles['big'] : '',
        isShadowed ? wpStyles['shadowed'] : ''
      )}
    >
      {label}
    </div>
  );
}

WordPlate.defaultProps = {
  isBig: false,
  isShadowed: false,
};

export default WordPlate;
