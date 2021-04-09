import classnames from 'classnames';
import React, { AnimationEvent } from 'react';

import fcStyles from './FallingContainer.scss';

export const animationFall = 'falling';
export const animationBlow = 'blowing';

interface FallingContainerProps {
  content: JSX.Element;
  isBlow?: boolean;
  onAnimationEnd?: (event: AnimationEvent) => void;
}

function FallingContainer({ content, isBlow, onAnimationEnd }: FallingContainerProps): JSX.Element {
  return (
    <div
      className={classnames(fcStyles['falling-container'], isBlow ? fcStyles['blow'] : '')}
      onAnimationEnd={onAnimationEnd}
    >
      {content}
    </div>
  );
}

FallingContainer.defaultProps = {
  isBlow: false,
  onAnimationEnd: null,
};

export default FallingContainer;
