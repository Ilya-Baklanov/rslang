import React from 'react';

import hiStyles from './HealthIndicator.scss';

interface HealthIndicatorProps {
  count: number;
}

const maxHealth = 5;

function HealthIndicator({ count }: HealthIndicatorProps): JSX.Element {
  function displayHealth(): JSX.Element[] {
    const render: JSX.Element[] = [];
    let i = 1;
    while (i <= count) {
      render.push(
        <span className="material-icons" key={i}>
          favorite
        </span>
      );
      i += 1;
    }
    while (i <= maxHealth) {
      render.push(
        <span className="material-icons" key={i}>
          favorite_border
        </span>
      );
      i += 1;
    }
    return render;
  }

  return <div className={hiStyles['health-indicator']}>{...displayHealth()}</div>;
}

export default HealthIndicator;
