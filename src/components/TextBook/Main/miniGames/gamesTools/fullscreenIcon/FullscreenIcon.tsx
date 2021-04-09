/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import classnames from 'classnames';
import React from 'react';

import fscrStyles from './FullscreenIcon.scss';

interface FullscreenIconProps {
  isFullscreenIcon: boolean;
  onClick: () => void;
}

function FullscreenIcon({ isFullscreenIcon, onClick }: FullscreenIconProps): JSX.Element {
  return (
    <div
      className={fscrStyles['fullscreen-icon-container']}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className={classnames('material-icons', fscrStyles['fullscreen-icon'])}>
        {isFullscreenIcon ? 'fullscreen' : 'fullscreen_exit'}
      </span>
    </div>
  );
}

export default FullscreenIcon;
