import { Polygon } from './Polygon';
import { Vector2 } from './Vector2';

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
