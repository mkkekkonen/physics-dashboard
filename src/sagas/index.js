import { put, takeEvery, all, select } from 'redux-saga/effects';
import Immutable from 'immutable';

import { Vector2 } from '../math';

import { SET_STAGE_BOUNDS } from '../actions/simulation';
import { savePolygons, UPDATE_POLYGONS } from '../actions/polygons';

import { getPolygonList } from '../selectors/polygons';

import { generateRandomPolygon, generateRandomVector } from '../utils/randomJson';

const getPolygonInitialState = (id, position) => {
  return Immutable.fromJS({
    id,
    polygon: generateRandomPolygon(),
    velocity: generateRandomVector(75, 150),
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

export function* updatePolygons(action) {
  const { payload: { deltaTime } } = action;
  const deltaSeconds = deltaTime / 3600;

  let polygons = yield select(getPolygonList);

  for (let i = 0; i < polygons.size; i += 1) {
    const polygon = polygons.get(i);
    const positionDelta = polygon.get('velocity').multiplyScalar(deltaSeconds);
    const newPosition = polygon.get('position').addVector(positionDelta);
    polygons = polygons.setIn([i, 'position'], newPosition);
    if (i === 0) {
      console.log(newPosition);
    }
  }

  yield put(savePolygons(polygons));
}

export function* watch() {
  yield takeEvery(SET_STAGE_BOUNDS, generatePolygons);
  yield takeEvery(UPDATE_POLYGONS, updatePolygons);
}

export default function* rootSaga() {
  yield all([
    watch(),
  ]);
}
