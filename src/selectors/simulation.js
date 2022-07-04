import { createSelector } from '@reduxjs/toolkit';

export const getSimulationState = (state) => {
  return state.simulation;
};

export const getStageBounds = createSelector(
  getSimulationState,
  (simulationState) => {
    return {
      width: simulationState.get('width'),
      height: simulationState.get('height'),
    };
  },
);
