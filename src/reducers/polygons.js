import Immutable from 'immutable';

import { Polygon, Vector2 } from '../math';
import * as mathUtils from '../math/utils';

const generateRandomPolygon = () => {
  return JSON.stringify(
    Polygon.generateRandom(
      mathUtils.randRangeInt(3, 6 + 1),
    ),
  );
};

const generateRandomVector = () => {
  return JSON.stringify(
    Vector2.generateRandom(),
  );
};

const getPolygonInitialState = (id) => {
  return Immutable.fromJS({
    id,
    polygon: generateRandomPolygon(),
    velocity: generateRandomVector(),
  });
};

const initialState = Immutable.fromJS({
  poly1: getPolygonInitialState(1),
  poly2: getPolygonInitialState(2),
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
