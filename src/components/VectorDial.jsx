import React from 'react';
import propTypes from 'prop-types';

import {
  Stage,
  Layer,
  Circle,
  Text,
  Line,
} from 'react-konva';

import { Vector2 } from '../math';

import * as uiConstants from '../constants/uiConstants';

import { DialBase } from './DialBase';

const maxVectorLength = uiConstants.dialBaseDimensionsPx / 2;

export class VectorDial extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      range: 5,
      lengthDivider: 5 / maxVectorLength,
    };

    this.text = React.createRef();
  }

  componentDidUpdate() {
    const { vector: { magnitude } } = this.props;
    const { range } = this.state;

    if (magnitude > range) {
      const lengthDivider = magnitude / maxVectorLength;

      this.setState({
        range: magnitude,
        lengthDivider,
      });
    }
  }

  render() {
    const { vector } = this.props;
    const { range, lengthDivider } = this.state;

    const dimHalved = uiConstants.dialBaseDimensionsPx / 2;
    const scaledVector = vector.divideScalar(lengthDivider);

    return (
      <DialBase>
        <Stage
          width={uiConstants.dialBaseDimensionsPx}
          height={uiConstants.dialBaseDimensionsPx}
        >
          <Layer>
            <Circle
              x={dimHalved}
              y={dimHalved}
              radius={dimHalved}
              fill="#fff"
            />
            <Circle
              x={dimHalved}
              y={dimHalved}
              radius={dimHalved / 2}
              stroke={uiConstants.dark}
              strokeWidth={1}
            />
            <Text
              ref={this.text}
              x={dimHalved}
              y={5}
              offsetX={(this.text && this.text.current) ? (this.text.current.width() / 2) : 0}
              text={Math.round(range).toString()}
              fontSize={10}
              fontFamily="monospace"
              fill={uiConstants.dark}
            />
            <Line
              points={[
                dimHalved,
                dimHalved,
                scaledVector.x + dimHalved,
                scaledVector.y + dimHalved,
              ]}
              stroke={uiConstants.lightBlue}
              strokeWidth={2}
            />
          </Layer>
        </Stage>
      </DialBase>
    );
  }
}

VectorDial.propTypes = {
  vector: propTypes.instanceOf(Vector2),
};

VectorDial.defaultProps = {
  vector: new Vector2({ x: 0, y: 0 }),
};
