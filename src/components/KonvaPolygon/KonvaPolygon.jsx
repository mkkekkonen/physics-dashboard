import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-konva';

import * as mathUtils from '../../math/utils';
import { Polygon } from '../../math';

export class KonvaPolygon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: null,
      y: null,
    };
  }

  componentDidMount() {
    const { width } = this.props;

    if (width) {
      this.setState({
        x: mathUtils.randRangeInt(0, width),
        y: mathUtils.randRangeInt(0, width),
      });
    }
  }

  render() {
    const { polygon } = this.props;
    const { x, y } = this.state;

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
  width: PropTypes.number.isRequired,
};
