import * as constants from '../constants';

export const degreesToRadians = (degrees) => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians) => {
  return (radians * 180) / Math.PI;
};

export const randRangeFloat = (min, max) => {
  return (Math.random() * (max - min)) + min;
};

export const randRangeInt = (min, max) => {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor((Math.random() * (_max - _min)) + _min);
};

export const clampFloat = (n, min, max) => {
  if (n < min) {
    return min;
  }
  if (n > max) {
    return max;
  }

  return n;
};

export const approximately = (n, value) => {
  if (n >= (value - constants.EPSILON) && n <= (value + constants.EPSILON)) {
    return true;
  }

  return false;
};
