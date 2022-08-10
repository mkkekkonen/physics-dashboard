import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-konva';

import * as mathUtils from '../math/utils';
import { Polygon, Vector2 } from '../math';

export class KonvaPolygon extends React.Component {
  render() {
    const {
      polygon,
      radius,
      position,
      rotation,
    } = this.props;
    const { x, y } = position;

    if (!x && !y) {
      return null;
    }

    const rotationDegrees = mathUtils.radiansToDegrees(rotation);

    return (
      <Line
        points={polygon.getKonvaPoints()}
        stroke="black"
        strokeWidth={2}
        x={x}
        y={y}
        offset={{ x: radius, y: radius }}
        rotation={rotationDegrees}
        closed
      />
    );
  }
}

KonvaPolygon.propTypes = {
  polygon: PropTypes.instanceOf(Polygon).isRequired,
  radius: PropTypes.number.isRequired,
  position: PropTypes.instanceOf(Vector2).isRequired,
  rotation: PropTypes.number.isRequired,
};
