import {
  put,
  takeEvery,
  all,
  select,
} from 'redux-saga/effects';
import Immutable from 'immutable';

import { Vector2 } from '../math';

import { SET_STAGE_BOUNDS } from '../actions/simulation';
import { savePolygons, UPDATE_POLYGONS } from '../actions/polygons';

import { getPolygonList } from '../selectors/polygons';
import { getStageBounds, getStageBorderingLines } from '../selectors/simulation';

import { generateRandomPolygon, generateRandomVector } from '../utils/randomJson';
import * as mathUtils from '../math/utils';

const CIRCLE_RADIANS = 2 * Math.PI;
const OMEGA_RANGE_PERCENTAGE = 0.15;
const OMEGA_RANGE_ABS = CIRCLE_RADIANS * OMEGA_RANGE_PERCENTAGE;

const MIN_POSITION_X = 100;
let MAX_POSITION_X;

const MIN_POSITION_Y = 100;
let MAX_POSITION_Y;

let loop = 0;

const getPolygonInitialState = (id, position) => {
  const polygon = generateRandomPolygon();

  return Immutable.fromJS({
    id,
    polygon,
    radius: polygon.radius,
    mass: mathUtils.randRangeInt(5, 20), // kg
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
  const stageBorderingLines = yield select(getStageBorderingLines);

  const polyCollisionsChecked = [];

  for (let i = 0; i < polygons.size; i += 1) {
    loop += 1;

    const polygon = polygons.get(i);
    const velocity = polygon.get('velocity');

    const positionDelta = velocity.multiplyScalar(deltaSeconds);
    const newPosition = polygon.get('position').addVector(positionDelta);
    polygons = polygons.setIn([i, 'position'], newPosition);

    const rotationDelta = polygon.get('angularVelocity') * deltaSeconds;
    const newRotation = polygon.get('rotation') + rotationDelta;
    polygons = polygons.setIn([i, 'rotation'], newRotation);

    const mathPolygon = polygon.get('polygon');
    mathPolygon.rotate(rotationDelta);
    const polyLines = mathPolygon.getLines(newPosition);

    const hitTopLine = polyLines.some((line) => {
      return line.calculateSegmentIntersection(stageBorderingLines.get('topLine'));
    }) && velocity.y < 0;

    const hitRightLine = polyLines.some((line) => {
      return line.calculateSegmentIntersection(stageBorderingLines.get('rightLine'));
    }) && velocity.x > 0;

    const hitBottomLine = polyLines.some((line) => {
      return line.calculateSegmentIntersection(stageBorderingLines.get('bottomLine'));
    }) && velocity.y > 0;

    const hitLeftLine = polyLines.some((line) => {
      return line.calculateSegmentIntersection(stageBorderingLines.get('leftLine'));
    }) && velocity.x < 0;

    for (let j = 0; j < polygons.size; j += 1) {
      if (j === i) {
        continue;
      }

      if (
        polyCollisionsChecked.some((set) => {
          return set.has(i) && set.has(j);
        })
      ) {
        continue;
      }

      polyCollisionsChecked.push(new Set([i, j]));

      let intersection;

      for (let k = 0; k < polyLines.size; k += 1) {
        const line = polyLines.get(k);
        const otherPolygonLines = polygons.getIn([j, 'polygon'])
          .getLines(polygons.getIn([j, 'position']));

        for (let l = 0; l < otherPolygonLines.size; l += 1) {
          const otherLine = otherPolygonLines.get(l);
          const _intersection = line.calculateSegmentIntersection(otherLine);
          if (_intersection) {
            intersection = _intersection;
            break;
          }
        }

        if (intersection) {
          break;
        }
      }

      if (intersection) {
        const currentPolygonMass = polygons.getIn([i, 'mass']);
        const otherPolygonMass = polygons.getIn([j, 'mass']);
        const currentPolygonInitialVelocity = polygons.getIn([i, 'velocity']);
        const otherPolygonInitialVelocity = polygons.getIn([j, 'velocity']);

        const multiplier1 = (
          (currentPolygonMass - otherPolygonMass)
          / (currentPolygonMass + otherPolygonMass)
        );
        const multiplier2 = (
          (2 * otherPolygonMass)
          / (currentPolygonMass + otherPolygonMass)
        );
        const multiplier3 = (
          (2 * currentPolygonMass)
          / (currentPolygonMass + otherPolygonMass)
        );
        const multiplier4 = (
          (otherPolygonMass - currentPolygonMass)
          / (currentPolygonMass + otherPolygonMass)
        );

        const currentPolygonNewVelocity = currentPolygonInitialVelocity.multiplyScalar(multiplier1)
          .addVector(otherPolygonInitialVelocity.multiplyScalar(multiplier2));
        const otherPolygonNewVelocity = currentPolygonInitialVelocity.multiplyScalar(multiplier3)
          .addVector(otherPolygonInitialVelocity.multiplyScalar(multiplier4));

        polygons = polygons.setIn([i, 'velocity'], currentPolygonNewVelocity);
        polygons = polygons.setIn([j, 'velocity'], otherPolygonNewVelocity);
      }
    }

    if (hitTopLine || hitBottomLine) {
      const multiplier = new Vector2({ x: 1, y: -1 }); // invert Y component
      const newVelocity = polygons.getIn([i, 'velocity']).multiplyVector(multiplier);
      polygons = polygons.setIn([i, 'velocity'], newVelocity);
    }

    if (hitRightLine || hitLeftLine) {
      const multiplier = new Vector2({ x: -1, y: 1 }); // invert X component
      const newVelocity = polygons.getIn([i, 'velocity']).multiplyVector(multiplier);
      polygons = polygons.setIn([i, 'velocity'], newVelocity);
    }
  }

  const debugStr = polygons.map((poly, i) => {
    const res = [`POLY ${i}`];
    res.push(`position: ${JSON.stringify(poly.get('position').testableObj())}`);
    res.push(`velocity: ${JSON.stringify(poly.get('velocity').testableObj())}`);
    res.push(`angular velocity: ${mathUtils.radiansToDegrees(poly.get('angularVelocity'))}`);
    return res.join('\n');
  }).toJS().join('\n');

  document.getElementById('debugView')
    .innerText = debugStr;

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
