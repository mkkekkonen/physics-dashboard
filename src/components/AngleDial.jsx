import React, { useRef } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import {
  Stage,
  Layer,
  Circle,
  Arc,
  Text,
} from 'react-konva';

import * as uiConstants from '../constants/uiConstants';

import { DialBase } from './DialBase';

export const AngleDial = ({ angle, ...props }) => {
  const text = useRef(null);

  const dimHalved = uiConstants.dialBaseDimensionsPx / 2;

  const _angle = (angle < 0) ? (360 + angle) : angle;

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
            innerRadius={dimHalved / 2}
            outerRadius={dimHalved}
            angle={_angle}
            rotationDeg={-90}
            fill="#77d"
          />
          <Text
            ref={text}
            x={dimHalved}
            y={dimHalved}
            offsetX={(text && text.current) ? (text.current.width() / 2) : 0}
            offsetY={10}
            text={Math.round(_angle).toString()}
            fontSize={20}
            fontFamily="monospace"
            fill={uiConstants.dark}
          />
        </Layer>
      </Stage>
    </DialBase>
  )
};

AngleDial.propTypes = {
  angle: propTypes.number,
};

AngleDial.defaultProps = {
  angle: 0,
};
