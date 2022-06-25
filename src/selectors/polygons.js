import { createSelector } from '@reduxjs/toolkit';
import Immutable from 'immutable';

export const getPolygons = (state) => {
  return state.polygons;
};

export const getPolygonList = createSelector(
  getPolygons,
  (polygons) => {
    return Immutable.fromJS([
      polygons.get('poly1'),
      polygons.get('poly2'),
    ]);
  },
);

export const getPolygonJson = createSelector(
  getPolygons,
  (polygons) => {
    return [
      polygons.getIn(['poly1', 'polygon']),
      polygons.getIn(['poly2', 'polygon']),
    ];
  },
);
