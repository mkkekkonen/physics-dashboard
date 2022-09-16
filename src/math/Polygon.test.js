import Immutable from 'immutable';

import { Polygon } from './Polygon';
import { Vector2 } from './Vector2';
import { Line } from './Line';

test('generates correct number of corners', () => {
  for (let corners = 3; corners < 6; corners += 1) {
    const polygon = Polygon.generateRandom(corners);
    expect(polygon.points.length).toBe(corners);
  }
});

test('returns points correctly', () => {
  const points = [
    new Vector2({ x: 1, y: 2 }),
    new Vector2({ x: 4, y: 3 }),
    new Vector2({ x: 5, y: 1 }),
  ];
  const polygon = new Polygon({ points });

  const konvaPoints = [1, 2, 4, 3, 5, 1];

  expect(polygon.getKonvaPoints()).toEqual(konvaPoints);
});

describe('getLines', () => {
  test('returns correct lines', () => {
    const point1 = new Vector2({ x: 1, y: 2 });
    const point2 = new Vector2({ x: 4, y: 3 });
    const point3 = new Vector2({ x: 5, y: 1 });

    const points = [
      point1,
      point2,
      point3,
    ];
    const polygon = new Polygon({ points });

    const lines = polygon.getLines()
      .map((line) => {
        return line.testableObj();
      });

    const expectedLines = Immutable.List([
      new Line({ point1, point2 }).testableObj(),
      new Line({ point1: point2, point2: point3 }).testableObj(),
      new Line({ point1: point3, point2: point1 }).testableObj(),
    ]);

    expect(lines).toEqual(expectedLines);
  });

  test('returns correct lines, position added', () => {
    const point1 = new Vector2({ x: 1, y: 2 });
    const point2 = new Vector2({ x: 4, y: 3 });
    const point3 = new Vector2({ x: 5, y: 1 });

    const position = new Vector2({ x: 10, y: 5 });

    const point1PositionAdded = point1.addVector(position);
    const point2PositionAdded = point2.addVector(position);
    const point3PositionAdded = point3.addVector(position);

    const points = [
      point1,
      point2,
      point3,
    ];
    const polygon = new Polygon({ points });

    const lines = polygon.getLines(position)
      .map((line) => {
        return line.testableObj();
      });

    const expectedLines = Immutable.List([
      new Line({
        point1: point1PositionAdded,
        point2: point2PositionAdded,
      }).testableObj(),
      new Line({
        point1: point2PositionAdded,
        point2: point3PositionAdded,
      }).testableObj(),
      new Line({
        point1: point3PositionAdded,
        point2: point1PositionAdded,
      }).testableObj(),
    ]);

    expect(lines).toEqual(expectedLines);
  });
});
