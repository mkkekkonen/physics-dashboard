import * as mathUtils from './utils';

export class Vector2 {
  constructor({ x, y, json }) {
    if (json) {
      Object.assign(this.json);
    } else {
      this.x = x;
      this.y = y;
    }
  }

  multiplyScalar = (scalar) => {
    return new Vector2({
      x: this.x * scalar,
      y: this.y * scalar,
    });
  };

  static polarCoordinates = (angleRadians, radius = 1) => {
    return new Vector2({
      x: radius * Math.cos(angleRadians),
      y: radius * Math.sin(angleRadians),
    });
  };

  static generateRandom = (
    rangeLengthStart = 1,
    rangeLengthEnd = 5,
    rangeRadiansStart = 0,
    rangeRadiansEnd = (2 * Math.PI),
  ) => {
    const radians = mathUtils.randRangeFloat(rangeRadiansStart, rangeRadiansEnd);
    const length = mathUtils.randRangeFloat(rangeLengthStart, rangeLengthEnd);

    return Vector2.polarCoordinates(radians, length);
  };

  static parseFromJson = (json) => {
    return new Vector2({ json });
  };
}
