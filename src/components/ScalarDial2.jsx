import React from 'react';
import propTypes from 'prop-types';

import {
  Stage,
  Layer,
  Circle,
  Text,
  Arc,
  Line,
} from 'react-konva';

import { Vector2 } from '../math';
import * as mathUtils from '../math/utils';

import * as uiConstants from '../constants/uiConstants';

import { DialBase } from './DialBase';

const RANGE_DEG = 270;
const RANGE_ARC_ANGLE = 230;
const RANGE_ARC_ROTATION = 155;

const dimHalved = uiConstants.dialBaseDimensionsPx / 2;
const dialLabelRadius = uiConstants.dialBaseDimensionsPx / 3;

const rangeStartLabelCoords = Vector2.polarCoordinates(
  mathUtils.degreesToRadians(225),
  dialLabelRadius,
);
const rangeEndLabelCoords = Vector2.polarCoordinates(
  mathUtils.degreesToRadians(315),
  dialLabelRadius,
);

const Label = ({
  refProp,
  x,
  y,
  offsetX,
  text,
  ...props
}) => {
  return (
    <Text
      ref={refProp}
      x={x}
      y={y}
      offsetX={offsetX}
      offsetY={5}
      text={text}
      fontSize={10}
      fontFamily="monospace"
      fill={uiConstants.dark}
    />
  );
};

Label.propTypes = {
  refProp: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(React.Component) }),
  ]),
  x: propTypes.number,
  y: propTypes.number,
  offsetX: propTypes.number,
  text: propTypes.string,
};

Label.defaultProps = {
  refProp: null,
  x: 0,
  y: 0,
  offsetX: 0,
  text: '',
};

export class ScalarDial2 extends React.Component {
  constructor(props) {
    super(props);

    const range = props.negative ? 10 : 5;
    const multiplier = RANGE_DEG / range;

    this.state = {
      rangeStart: props.negative ? -5 : 0,
      rangeEnd: 5,
      multiplier,
    };

    this.rangeStartLabel = React.createRef();
    this.rangeEndLabel = React.createRef();
  }

  componentDidUpdate() {
    const { value, negative } = this.props;
    const { rangeEnd } = this.state;

    const range = Math.round(value * 2);

    if (value > rangeEnd) {
      const _range = negative ? (range * 2) : range;
      const multiplier = RANGE_DEG / _range;

      this.setState({
        rangeStart: negative ? -range : 0,
        rangeEnd: range,
        multiplier,
      });
    }
  }

  get indicatorAngle() {
    const { value, negative } = this.props;
    const { rangeStart, rangeEnd } = this.state;

    const totalRange = rangeEnd - rangeStart;

    const normalizedValue = !negative
      ? value
      : -(value * 2);

    const ratio = normalizedValue / totalRange;

    return RANGE_ARC_ANGLE * ratio;
  }

  render() {
    const { rangeStart, rangeEnd } = this.state;

    console.log(this.indicatorAngle);

    const indicatorVector = Vector2.polarCoordinates(
      mathUtils.degreesToRadians((180 - 25) + this.indicatorAngle),
      dimHalved - 3,
    );

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
            <Arc
              x={dimHalved}
              y={dimHalved}
              outerRadius={dimHalved - 5}
              innerRadius={dimHalved - 10}
              stroke={uiConstants.dark}
              strokeWidth={1}
              angle={RANGE_ARC_ANGLE}
              rotation={RANGE_ARC_ROTATION}
            />
            <Line
              points={[
                dimHalved,
                dimHalved,
                indicatorVector.x + dimHalved,
                indicatorVector.y + dimHalved,
              ]}
              stroke={uiConstants.lightBlue}
              strokeWidth={2}
            />
            <Label
              refProp={this.rangeStartLabel}
              x={rangeStartLabelCoords.x + dimHalved}
              y={-rangeEndLabelCoords.y + dimHalved}
              offsetX={(this.rangeStartLabel && this.rangeStartLabel.current)
                ? (this.rangeStartLabel.current.width() / 2)
                : 0}
              text={rangeStart.toString()}
            />
            <Label
              refProp={this.rangeEndLabel}
              x={rangeEndLabelCoords.x + dimHalved}
              y={-rangeEndLabelCoords.y + dimHalved}
              offsetX={(this.rangeEndLabel && this.rangeEndLabel.current)
                ? (this.rangeEndLabel.current.width() / 2)
                : 0}
              text={rangeEnd.toString()}
            />
          </Layer>
        </Stage>
      </DialBase>
    );
  }
}

ScalarDial2.propTypes = {
  value: propTypes.number,
  negative: propTypes.bool,
};

ScalarDial2.defaultProps = {
  value: 0,
  negative: false,
};
