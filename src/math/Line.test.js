import { Line } from './Line';
import { Vector2 } from './Vector2';

describe('slope', () => {
  test('positive', () => {
    const point1 = new Vector2({ x: -1, y: -2 });
    const point2 = new Vector2({ x: 1, y: 2 });

    const line = new Line({ point1, point2 });

    expect(line.slope).toEqual(2);
  });

  test('negative', () => {
    const point1 = new Vector2({ x: -1, y: 2 });
    const point2 = new Vector2({ x: 1, y: 1 });

    const line = new Line({ point1, point2 });

    expect(line.slope).toEqual(-0.5);
  });

  test('vertical line', () => {
    const point1 = new Vector2({ x: 2, y: -1 });
    const point2 = new Vector2({ x: 2, y: 3 });

    const line = new Line({ point1, point2 });

    expect(line.slope).toBeNaN();
  });
});

describe('Y intercept', () => {
  test('positive', () => {
    const point1 = new Vector2({ x: -1, y: 2 });
    const point2 = new Vector2({ x: 1, y: 0 });

    const line = new Line({ point1, point2 });

    expect(line.yIntercept).toEqual(1);
  });

  test('negative', () => {
    const point1 = new Vector2({ x: -2, y: -2 });
    const point2 = new Vector2({ x: 2, y: 0 });

    const line = new Line({ point1, point2 });

    expect(line.yIntercept).toEqual(-1);
  });

  test('NaN - vertical line', () => {
    const point1 = new Vector2({ x: -1, y: -2 });
    const point2 = new Vector2({ x: -1, y: 1 });

    const line = new Line({ point1, point2 });

    expect(line.yIntercept).toBeNaN();
  });
});

describe('calculateIntersection', () => {
  test('lines do not overlap', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -1, y: 2 }),
      point2: new Vector2({ x: 1, y: 0 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: 0, y: -2 }),
      point2: new Vector2({ x: 4, y: 0 }),
    });

    const intersectionPoint = new Vector2({ x: 2, y: -1 }).testableObj();

    expect(line1.calculateIntersection(line2).testableObj())
      .toEqual(intersectionPoint);
    expect(line2.calculateIntersection(line1).testableObj())
      .toEqual(intersectionPoint);
  });

  test('lines overlap', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -1, y: 0 }),
      point2: new Vector2({ x: 1, y: -2 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: -2, y: -2 }),
      point2: new Vector2({ x: 2, y: 0 }),
    });

    expect(line1.calculateIntersection(line2).testableObj())
      .toEqual(new Vector2({ x: -0, y: -1 }).testableObj());
    expect(line2.calculateIntersection(line1).testableObj())
      .toEqual(new Vector2({ x: 0, y: -1 }).testableObj());
  });

  test('equal lines', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -2, y: -1 }),
      point2: new Vector2({ x: 1, y: 2 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: -1, y: 0 }),
      point2: new Vector2({ x: 2, y: 3 }),
    });

    expect(line1.calculateIntersection(line2)).toBe(true);
    expect(line2.calculateIntersection(line1)).toBe(true);
  });

  test('parallel lines', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -2, y: -1 }),
      point2: new Vector2({ x: 1, y: 2 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: -1, y: -1 }),
      point2: new Vector2({ x: 2, y: 2 }),
    });

    expect(line1.calculateIntersection(line2)).toBe(false);
    expect(line2.calculateIntersection(line1)).toBe(false);
  });

  test('equal vertical lines', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -1, y: -1 }),
      point2: new Vector2({ x: -1, y: 3 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: -1, y: -2 }),
      point2: new Vector2({ x: -1, y: 2 }),
    });

    expect(line1.calculateIntersection(line2)).toBe(true);
    expect(line2.calculateIntersection(line1)).toBe(true);
  });

  test('parallel vertical lines', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -1, y: -1 }),
      point2: new Vector2({ x: -1, y: 3 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: 0, y: -2 }),
      point2: new Vector2({ x: 0, y: 2 }),
    });

    expect(line1.calculateIntersection(line2)).toBe(false);
    expect(line2.calculateIntersection(line1)).toBe(false);
  });

  test('other line vertical', () => {
    const line1 = new Line({
      point1: new Vector2({ x: -1, y: -1 }),
      point2: new Vector2({ x: 0, y: 0 }),
    });

    const line2 = new Line({
      point1: new Vector2({ x: 1, y: -1 }),
      point2: new Vector2({ x: 1, y: 3 }),
    });

    const intersectionPoint = new Vector2({ x: 1, y: 1 });

    expect(line1.calculateIntersection(line2).testableObj())
      .toEqual(intersectionPoint.testableObj());
    expect(line2.calculateIntersection(line1).testableObj())
      .toEqual(intersectionPoint.testableObj());
  });
});
