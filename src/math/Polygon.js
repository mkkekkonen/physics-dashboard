import Immutable from 'immutable';

import * as mathUtils from './utils';
import { Vector2 } from './Vector2';
import { Line } from './Line';

export class Polygon {
  constructor({ points, radius, json }) {
    if (json) {
      Object.assign(this, json);
    } else if (points) {
      this.points = points;
      this.radius = radius;
    }
  }

  getKonvaPoints = () => {
    return this.points
      .map((point) => {
        return [point.x, point.y];
      })
      .flat();
  };

  getLines = () => {
    return Immutable.fromJS(
      this.points.map((point, i) => {
        const nextIndex = i < (this.points.length - 1)
          ? (i + 1)
          : 0;

        return new Line(point, this.points[nextIndex]);
      }),
    );
  };

  rotate = (angleRadians) => {
    this.points = this.points.map((point) => {
      return point.rotate(angleRadians);
    });
  };

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

    return new Polygon({ points, radius });
  };

  static parseFromJson = (json) => {
    return new Polygon({ json });
  };
}
