import * as mathUtils from './utils';

export class Vector2 {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  addVector = (vector) => {
    return new Vector2({
      x: this.x + vector.x,
      y: this.y + vector.y,
    });
  };

  multiplyScalar = (scalar) => {
    return new Vector2({
      x: this.x * scalar,
      y: this.y * scalar,
    });
  };

  multiplyVector = (vector) => {
    return new Vector2({
      x: this.x * vector.x,
      y: this.y * vector.y,
    });
  };

  distanceTo = (vector) => {
    return Math.sqrt(((this.x - vector.x) ** 2) + ((this.y - vector.y) ** 2));
  };

  invertY = (worldHeight) => {
    return new Vector2({ x: this.x, y: worldHeight - this.y });
  };

  isBetween = (vector1, vector2) => {
    const distanceWithMidpoint = this.distanceTo(vector1) + this.distanceTo(vector2);
    const distanceWithoutMidpoint = vector1.distanceTo(vector2);

    const difference = distanceWithMidpoint - distanceWithoutMidpoint;

    if (mathUtils.approximately(difference, 0)) {
      return true;
    }

    return false;
  };

  rotate = (angleRadians) => {
    return new Vector2({
      x: (this.x * Math.cos(angleRadians)) - (this.y * Math.sin(angleRadians)),
      y: (this.x * Math.sin(angleRadians)) + (this.y * Math.cos(angleRadians)),
    });
  };

  testableObj = () => {
    return { x: this.x, y: this.y };
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

  static generateRandomFromCoords = (
    rangeXStart = 0,
    rangeXEnd = 1000,
    rangeYStart = 0,
    rangeYEnd = 1000,
  ) => {
    const x = mathUtils.randRangeFloat(rangeXStart, rangeXEnd);
    const y = mathUtils.randRangeFloat(rangeYStart, rangeYEnd);

    return new Vector2({ x, y });
  };
}
