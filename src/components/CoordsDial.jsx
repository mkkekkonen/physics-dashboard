import React from 'react';
import propTypes from 'prop-types';

import { Vector2 } from '../math';

import { DialBase } from './DialBase';

export const CoordsDial = ({ coords, ...props }) => {
  if (!coords) {
    return (
      <DialBase />
    );
  }

  return (
    <DialBase fontSize="20px">
      {`(${Math.round(coords.x)},${Math.round(coords.y)})`}
    </DialBase>
  );
};

CoordsDial.propTypes = {
  coords: propTypes.instanceOf(Vector2),
};

CoordsDial.defaultProps = {
  coords: new Vector2({ x: 0, y: 0 }),
};
