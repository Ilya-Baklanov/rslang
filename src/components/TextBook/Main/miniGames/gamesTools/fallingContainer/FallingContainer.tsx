import React from 'react';

import fcStyles from './FallingContainer.scss';

interface FallingContainerProps {
  content: JSX.Element;
}

function FallingContainer({ content }: FallingContainerProps): JSX.Element {
  return <div className={fcStyles['falling-container']}>{content}</div>;
}

export default FallingContainer;
