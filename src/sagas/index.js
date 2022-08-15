import { put, takeEvery, all, select } from 'redux-saga/effects';
import Immutable from 'immutable';

import { Vector2 } from '../math';

import { SET_STAGE_BOUNDS } from '../actions/simulation';
import { savePolygons, UPDATE_POLYGONS } from '../actions/polygons';

import { getPolygonList } from '../selectors/polygons';
import { getStageBounds } from '../selectors/simulation';

import { generateRandomPolygon, generateRandomVector } from '../utils/randomJson';
import * as mathUtils from '../math/utils';

const CIRCLE_RADIANS = 2 * Math.PI;
const OMEGA_RANGE_PERCENTAGE = 0.06;
const OMEGA_RANGE_ABS = CIRCLE_RADIANS * OMEGA_RANGE_PERCENTAGE;

const MIN_POSITION_X = 100;
let MAX_POSITION_X;

const MIN_POSITION_Y = 100;
let MAX_POSITION_Y;

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

  MAX_POSITION_X = width - 100;
  MAX_POSITION_Y = height - 100;

  const poly1XRange = [MIN_POSITION_X, width / 2];
  const poly2XRange = [width / 2, MAX_POSITION_X];

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

  const poly1 = getPolygonInitialState(1, poly1Position.invertY(540));
  const poly2 = getPolygonInitialState(2, poly2Position.invertY(540));

  const polygons = Immutable.fromJS([poly1, poly2]);

  yield put(savePolygons(polygons));
}

export function* updatePolygons(action) {
  const { payload: { deltaTime } } = action;
  const deltaSeconds = deltaTime / 3600;

  let polygons = yield select(getPolygonList);
  const stageBounds = yield select(getStageBounds);

  for (let i = 0; i < polygons.size; i += 1) {
    const polygon = polygons.get(i);

    const positionDelta = polygon.get('velocity').multiplyScalar(deltaSeconds);
    const newPosition = polygon.get('position').addVector(positionDelta);
    polygons = polygons.setIn([i, 'position'], newPosition);

    const rotationDelta = polygon.get('angularVelocity') * deltaSeconds;
    const newRotation = polygon.get('rotation') + rotationDelta;
    polygons = polygons.setIn([i, 'rotation'], newRotation);

    const invertedPosition = newPosition.invertY(stageBounds.get('height'));

    if (invertedPosition.x < MIN_POSITION_X
      || (MAX_POSITION_X && invertedPosition.x > MAX_POSITION_X)
    ) {
      const multiplier = new Vector2({ x: -1, y: 1 }); // invert X component
      const newVelocity = polygon.get('velocity').multiplyVector(multiplier);
      polygons = polygons.setIn([i, 'velocity'], newVelocity);
    }

    if (invertedPosition.y < MIN_POSITION_Y
      || (MAX_POSITION_Y && invertedPosition.y > MAX_POSITION_Y)
    ) {
      const multiplier = new Vector2({ x: 1, y: -1 }); // invert Y component
      const newVelocity = polygon.get('velocity').multiplyVector(multiplier);
      polygons = polygons.setIn([i, 'velocity'], newVelocity);
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
