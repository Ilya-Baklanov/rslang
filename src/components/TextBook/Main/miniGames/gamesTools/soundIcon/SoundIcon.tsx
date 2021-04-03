import classnames from 'classnames';
import React from 'react';

import soundStyles from './SoundIcon.scss';

interface SoundIconProps {
  isPlaying: boolean;
}

function SoundIcon({ isPlaying }: SoundIconProps): JSX.Element {
  return (
    <div
      className={classnames(
        soundStyles['sound-icon-container'],
        isPlaying ? soundStyles['playing'] : ''
      )}
    >
      <span className={classnames('material-icons', soundStyles['sound-icon'])}>volume_up</span>
    </div>
  );
}

export default SoundIcon;
