import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-konva';

import * as mathUtils from '../math/utils';
import { Polygon, Vector2 } from '../math';

export class KonvaPolygon extends React.Component {
  render() {
    const { polygon, position } = this.props;
    const { x, y } = position;

    if (!x && !y) {
      return null;
    }

    return (
      <Line
        points={polygon.getKonvaPoints()}
        stroke="black"
        strokeWidth={2}
        x={x}
        y={y}
        closed
      />
    );
  }
}

KonvaPolygon.propTypes = {
  polygon: PropTypes.instanceOf(Polygon).isRequired,
  position: PropTypes.instanceOf(Vector2).isRequired,
};
