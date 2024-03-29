import { createSelector } from '@reduxjs/toolkit';
import Immutable from 'immutable';

import { Vector2, Line } from '../math';

export const getSimulationState = (state) => {
  return state.simulation;
};

export const getStageBounds = createSelector(
  getSimulationState,
  (simulationState) => {
    return Immutable.fromJS({
      width: simulationState.get('width'),
      height: simulationState.get('height'),
    });
  },
);

export const getStageBorderingLines = createSelector(
  getStageBounds,
  (bounds) => {
    const { width, height } = bounds.toJS();

    const topLine = new Line({
      point1: new Vector2({ x: 0, y: 0 }),
      point2: new Vector2({ x: width, y: 0 }),
    });
    const rightLine = new Line({
      point1: new Vector2({ x: width, y: 0 }),
      point2: new Vector2({ x: width, y: height }),
    });
    const bottomLine = new Line({
      point1: new Vector2({ x: 0, y: height }),
      point2: new Vector2({ x: width, y: height }),
    });
    const leftLine = new Line({
      point1: new Vector2({ x: 0, y: 0 }),
      point2: new Vector2({ x: 0, y: height }),
    });

    return Immutable.fromJS({
      topLine,
      rightLine,
      bottomLine,
      leftLine,
    });
  },
);
