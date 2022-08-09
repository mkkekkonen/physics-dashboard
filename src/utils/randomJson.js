import Immutable from 'immutable';

import { Polygon, Vector2 } from '../math';
import * as mathUtils from '../math/utils';

export const generateRandomPolygon = () => {
  return Immutable.fromJS(
    Polygon.generateRandom(
      mathUtils.randRangeInt(3, 6 + 1),
    ),
  );
};

export const generateRandomVector = (rangeLengthStart = 1, rangeLengthEnd = 5) => {
  return Immutable.fromJS(
    Vector2.generateRandom(rangeLengthStart, rangeLengthEnd),
  );
};

export const generateRandomVectorFromCoords = (
  rangeXStart,
  rangeXEnd,
  rangeYStart,
  rangeYEnd,
) => {
  return Immutable.fromJS(
    Vector2.generateRandomFromCoords(
      rangeXStart,
      rangeXEnd,
      rangeYStart,
      rangeYEnd,
    ),
  );
};
