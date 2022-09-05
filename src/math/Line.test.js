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
});
