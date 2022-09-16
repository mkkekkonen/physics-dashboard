export const SAVE_POLYGONS = 'SAVE_POLYGONS';
export const UPDATE_POLYGONS = 'UPDATE_POLYGONS';

export const savePolygons = (polygons) => {
  return {
    type: SAVE_POLYGONS,
    payload: {
      polygons,
    },
  };
};

export const updatePolygons = (deltaTime) => {
  return {
    type: UPDATE_POLYGONS,
    payload: {
      deltaTime,
    },
  };
};
