import { createSelector } from '@reduxjs/toolkit';
import Immutable from 'immutable';

export const getPolygons = (state) => {
  return state.polygons;
};

export const getPolygonList = createSelector(
  getPolygons,
  (polygons) => {
    return polygons.get('polygons');
  },
);
