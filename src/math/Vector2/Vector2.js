import * as mathUtils from '../utils';

export class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static polarCoordinates = (angleRadians, radius = 1) => {
    return new Vector2(
      radius * Math.cos(angleRadians),
      radius * Math.sin(angleRadians),
    );
  };
}
