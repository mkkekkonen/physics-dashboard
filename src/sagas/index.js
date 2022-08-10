import { put, takeEvery, all, select } from 'redux-saga/effects';
import Immutable from 'immutable';

import { Vector2 } from '../math';

import { SET_STAGE_BOUNDS } from '../actions/simulation';
import { savePolygons, UPDATE_POLYGONS } from '../actions/polygons';

import { getPolygonList } from '../selectors/polygons';

import { generateRandomPolygon, generateRandomVector } from '../utils/randomJson';
import * as mathUtils from '../math/utils';

const CIRCLE_RADIANS = 2 * Math.PI;
const OMEGA_RANGE_PERCENTAGE = 0.06;
const OMEGA_RANGE_ABS = CIRCLE_RADIANS * OMEGA_RANGE_PERCENTAGE;

const getPolygonInitialState = (id, position) => {
  const polygon = generateRandomPolygon();

  return Immutable.fromJS({
    id,
    polygon,
    radius: polygon.radius,
    position,
    rotation: 0,
    velocity: generateRandomVector(75, 150), // magnitude: speed per second
    angularVelocity:
      mathUtils.randRangeFloat(-OMEGA_RANGE_ABS, OMEGA_RANGE_ABS), // radians per second
  });
};

export function* generatePolygons(action) {
  const { width, height } = action.payload;

  const poly1XRange = [50, width / 2];
  const poly2XRange = [width / 2, width - 50];

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

    const rotationDelta = polygon.get('angularVelocity') * deltaSeconds;
    const newRotation = polygon.get('rotation') + rotationDelta;
    polygons = polygons.setIn([i, 'rotation'], newRotation);
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
