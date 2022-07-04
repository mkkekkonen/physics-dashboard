import { put, takeEvery, all } from 'redux-saga/effects';
import Immutable from 'immutable';

import { Vector2 } from '../math';

import { SET_STAGE_BOUNDS } from '../actions/simulation';
import { savePolygons } from '../actions/polygons';

import { generateRandomPolygon, generateRandomVector } from '../utils/randomJson';

const getPolygonInitialState = (id, position) => {
  return Immutable.fromJS({
    id,
    polygon: generateRandomPolygon(),
    velocity: generateRandomVector(),
    position,
  });
};

export function* generatePolygons(action) {
  const { width, height } = action.payload;

  const poly1XRange = [0, width / 2];
  const poly2XRange = [width / 2, width];

  const poly1Position = Vector2.generateRandomFromCoords(
    poly1XRange[0],
    poly1XRange[1],
    0,
    height,
  );

  const poly2Position = Vector2.generateRandomFromCoords(
    poly2XRange[0],
    poly2XRange[1],
    0,
    height,
  );

  const poly1 = getPolygonInitialState(1, poly1Position);
  const poly2 = getPolygonInitialState(2, poly2Position);

  const polygons = Immutable.fromJS([poly1, poly2]);

  yield put(savePolygons(polygons));
}

export function* watch() {
  yield takeEvery(SET_STAGE_BOUNDS, generatePolygons);
}

export default function* rootSaga() {
  yield all([
    watch(),
  ]);
}
