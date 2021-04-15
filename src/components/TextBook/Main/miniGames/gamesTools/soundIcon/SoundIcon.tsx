/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import classnames from 'classnames';
import React from 'react';

import soundStyles from './SoundIcon.scss';

interface SoundIconProps {
  isPlaying: boolean;
  onClick: () => void;
}

function SoundIcon({ isPlaying, onClick }: SoundIconProps): JSX.Element {
  return (
    <div
      className={classnames(
        soundStyles['sound-icon-container'],
        isPlaying ? soundStyles['playing'] : ''
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className={classnames('material-icons', soundStyles['sound-icon'])}>volume_up</span>
    </div>
  );
}

export default SoundIcon;
