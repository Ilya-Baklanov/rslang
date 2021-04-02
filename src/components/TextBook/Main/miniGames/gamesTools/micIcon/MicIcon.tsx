/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import classnames from 'classnames';
import React from 'react';

import micStyles from './MicIcon.scss';

interface MicIconProps {
  isRecording: boolean;
  onClick: () => void;
}

function MicIcon({ isRecording, onClick }: MicIconProps): JSX.Element {
  return (
    <div
      className={classnames(
        micStyles['mic-icon-container'],
        isRecording ? micStyles['recording'] : ''
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className={classnames('material-icons', micStyles['mic-icon'])}>
        {isRecording ? 'mic' : 'mic_off'}
      </span>
    </div>
  );
}

export default MicIcon;
