import { Vector2 } from './Vector2';
import * as utils from './utils';

describe('addVector', () => {
  it('adds', () => {
    const v = new Vector2({ x: 1, y: 2 });
    const u = new Vector2({ x: 3, y: 4 });

    expect(v.addVector(u).testableObj())
      .toEqual(new Vector2({ x: 4, y: 6 }).testableObj());
  });

  it('subtracts', () => {
    const v = new Vector2({ x: 1, y: 2 });
    const u = new Vector2({ x: -3, y: -4 });

    expect(v.addVector(u).testableObj())
      .toEqual(new Vector2({ x: -2, y: -2 }).testableObj());
  });
});

describe('multiplyScalar', () => {
  it('multiplies', () => {
    const v = new Vector2({ x: 2, y: 1 });

    expect(v.multiplyScalar(3).testableObj())
      .toEqual(new Vector2({ x: 6, y: 3 }).testableObj());
  });

  it('divides', () => {
    const v = new Vector2({ x: 3, y: 2 });

    expect(v.multiplyScalar(0.5).testableObj())
      .toEqual(new Vector2({ x: 1.5, y: 1 }).testableObj());
  });
});

describe('multiplyVector', () => {
  it('multiplies', () => {
    const v = new Vector2({ x: 2, y: 2 });
    const u = new Vector2({ x: 1.5, y: 2 });

    expect(v.multiplyVector(u).testableObj())
      .toEqual(new Vector2({ x: 3, y: 4 }).testableObj());
  });

  it('divides', () => {
    const v = new Vector2({ x: 6, y: 4 });
    const u = new Vector2({ x: 2 / 3, y: 0.5 });

    expect(v.multiplyVector(u).testableObj())
      .toEqual(new Vector2({ x: 4, y: 2 }).testableObj());
  });
});

describe('distanceTo', () => {
  test('square', () => {
    const v = new Vector2({ x: 1, y: 1 });
    const u = new Vector2({ x: 2, y: 2 });

    expect(v.distanceTo(u))
      .toEqual(Math.sqrt(2));
  });

  test('up', () => {
    const v = new Vector2({ x: 2, y: 1 });
    const u = new Vector2({ x: 2, y: 6 });

    expect(v.distanceTo(u))
      .toEqual(5);
  });

  test('left', () => {
    const v = new Vector2({ x: 1, y: 2 });
    const u = new Vector2({ x: -3, y: 2 });

    expect(v.distanceTo(u))
      .toEqual(4);
  });
});

describe('isBetween', () => {
  test('is between - diagonal', () => {
    const v = new Vector2({ x: 2, y: 2 });
    const u = new Vector2({ x: 1, y: 1 });
    const w = new Vector2({ x: 3, y: 3 });

    expect(v.isBetween(u, w))
      .toBe(true);
  });

  test('is not between - diagonal', () => {
    const v = new Vector2({ x: 2.5, y: 2 });
    const u = new Vector2({ x: 1, y: 1 });
    const w = new Vector2({ x: 3, y: 3 });

    expect(v.isBetween(u, w))
      .toBe(false);
  });

  test('is between - horizontal', () => {
    const v = new Vector2({ x: 2, y: 2 });
    const u = new Vector2({ x: 1, y: 2 });
    const w = new Vector2({ x: 3, y: 2 });

    expect(v.isBetween(u, w))
      .toBe(true);
  });

  test('is not between - horizontal', () => {
    const v = new Vector2({ x: 2, y: 3 });
    const u = new Vector2({ x: 1, y: 2 });
    const w = new Vector2({ x: 3, y: 2 });

    expect(v.isBetween(u, w))
      .toBe(false);
  });

  test('is between - vertical', () => {
    const v = new Vector2({ x: 2, y: 2 });
    const u = new Vector2({ x: 2, y: 1 });
    const w = new Vector2({ x: 2, y: 3 });

    expect(v.isBetween(u, w))
      .toBe(true);
  });

  test('is not between - vertical', () => {
    const v = new Vector2({ x: 2, y: 4 });
    const u = new Vector2({ x: 2, y: 1 });
    const w = new Vector2({ x: 2, y: 3 });

    expect(v.isBetween(u, w))
      .toBe(false);
  });
});

describe('rotate', () => {
  test('clockwise 180 deg', () => {
    const v = new Vector2({ x: -1, y: 0 });
    const rotated = v.rotate(-Math.PI);

    expect(rotated.x).toEqual(1);
    expect(utils.approximately(rotated.y, 0))
      .toBe(true);
  });

  test('counter-clockwise 90 deg', () => {
    const v = new Vector2({ x: 1, y: 0 });
    const rotated = v.rotate(Math.PI / 2);

    expect(utils.approximately(rotated.x, 0))
      .toBe(true);
    expect(rotated.y).toEqual(1);
  });
});

describe('polarCoordinates', () => {
  test('270 deg clockwise', () => {
    const v = Vector2.polarCoordinates(-Math.PI * 1.5, 2);

    expect(utils.approximately(v.x, 0))
      .toBe(true);
    expect(v.y).toEqual(2);
  });

  test('45 deg counter-clockwise', () => {
    const v = Vector2.polarCoordinates(Math.PI / 4, 2);

    expect(v.x).toEqual(Math.sqrt(2));
    expect(utils.approximately(v.y, Math.sqrt(2)))
      .toBe(true);
  });
});
