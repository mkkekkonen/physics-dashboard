import { createSelector } from '@reduxjs/toolkit';

export const getPolygons = (state) => {
  return state.polygons;
};

export const getPolygonJson = createSelector(
  getPolygons,
  (polygons) => {
    return [
      polygons.getIn(['poly1', 'polygon']),
      polygons.getIn(['poly2', 'polygon']),
    ];
  },
);
