import * as mathUtils from './utils';
import { Vector2 } from './Vector2';

export class Polygon {
  constructor({ points, json }) {
    if (json) {
      Object.assign(this, json);
    } else if (points) {
      this.points = points;
    }
  }

  static generateRandom = (nCorners) => {
    const step = (2 * Math.PI) / nCorners;
    const radius = mathUtils.randRangeInt(50, 100);

    let prev = 0;
    let next = prev + step;

    const points = [];

    for (let i = 0; i < nCorners; i += 1) {
      const angle = mathUtils.randRangeFloat(prev, next);
      const coords = Vector2.polarCoordinates(angle, radius);
      points.push(coords);

      prev = next;
      next += step;
    }

    return new Polygon({ points });
  };

  static parseFromJson = (json) => {
    return new Polygon({ json });
  };

  getKonvaPoints = () => {
    return this.points
      .map((point) => {
        return [point.x, point.y];
      })
      .flat();
  };
}
