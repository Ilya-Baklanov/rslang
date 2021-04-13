import classnames from 'classnames';
import React from 'react';

import iStyles from './infoIcon.scss';

interface InfoIconProps {
  isPositive?: boolean;
}

function InfoIcon({ isPositive }: InfoIconProps): JSX.Element {
  return (
    <div
      className={classnames(
        iStyles['info-icon-container'],
        isPositive ? iStyles['positive'] : iStyles['negative']
      )}
    >
      <span className={classnames('material-icons', iStyles['info-icon'])}>
        {isPositive ? 'check' : 'close'}
      </span>
    </div>
  );
}

InfoIcon.defaultProps = {
  isPositive: true,
};

export default InfoIcon;
