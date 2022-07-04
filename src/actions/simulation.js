export const SET_STAGE_BOUNDS = 'SET_STAGE_BOUNDS';

export const setStageBounds = (width, height) => {
  return {
    type: SET_STAGE_BOUNDS,
    payload: {
      width,
      height,
    },
  };
};
