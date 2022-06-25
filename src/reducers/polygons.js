import Immutable from 'immutable';

import { Polygon } from '../math';
import * as mathUtils from '../math/utils';

const generateRandomPolygon = () => {
  return JSON.stringify(
    Polygon.generateRandom(
      mathUtils.randRangeInt(3, 6 + 1),
    ),
  );
};

const getPolygonInitialState = () => {
  return Immutable.fromJS({
    polygon: generateRandomPolygon(),
  });
};

const initialState = Immutable.fromJS({
  poly1: getPolygonInitialState(),
  poly2: getPolygonInitialState(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
