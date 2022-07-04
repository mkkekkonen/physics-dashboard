export const SAVE_POLYGONS = 'SAVE_POLYGONS';

export const savePolygons = (polygons) => {
  return {
    type: SAVE_POLYGONS,
    payload: {
      polygons,
    },
  };
};
