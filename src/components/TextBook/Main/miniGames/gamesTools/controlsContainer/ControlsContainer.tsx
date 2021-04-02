import React from 'react';

import ctrlStyles from './ControlsContainer.scss';

interface ControlContainerProps {
  content: JSX.Element;
}

function ControlContainer({ content }: ControlContainerProps): JSX.Element {
  return <div className={ctrlStyles['controls-container']}>{content}</div>;
}

export default ControlContainer;
