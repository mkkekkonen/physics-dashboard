import { Vector2 } from './Vector2';
import * as mathUtils from './utils';

export class Line {
  constructor({
    point1,
    point2,
  }) {
    this.point1 = point1;
    this.point2 = point2;
  }

  get slope() {
    if (this.point1 && this.point2) {
      const denominator = (this.point1.x - this.point2.x);
      if (denominator !== 0) {
        return (this.point1.y - this.point2.y) / denominator;
      }
    }

    // vertical line
    return Number.NaN;
  }

  get yIntercept() {
    if (Number.isNaN(this.slope)) {
      return Number.NaN;
    }

    // calculate the Y intercept by assigning the coordinates of the
    // first point to the variables of the slope-intercept equation
    // (y = ax + b)
    return this.point1.y - (this.slope * this.point1.x);
  }

  solveY = (x) => {
    return (this.slope * x) + this.yIntercept;
  };

  calculateIntersection = (otherLine) => {
    const bothVertical = Number.isNaN(this.slope) && Number.isNaN(otherLine.slope);

    const sameSlopes = bothVertical || mathUtils.approximately(this.slope, otherLine.slope);

    if (bothVertical) {
      // doesn't matter which point we check
      if (this.point1.x === otherLine.point1.x) {
        return true; // lines are equal
      }

      // lines are vertical and parallel
      return false;
    }

    // this line is vertical
    if (Number.isNaN(this.slope)) {
      const { x } = this.point1;
      const y = otherLine.solveY(x);

      return new Vector2({ x, y });
    }

    // the other line is vertical
    if (Number.isNaN(otherLine.slope)) {
      const { x } = otherLine.point1;
      const y = this.solveY(x);

      return new Vector2({ x, y });
    }

    const sameYIntercepts = mathUtils.approximately(this.yIntercept, otherLine.yIntercept);

    // check if the lines are equal:
    if (sameSlopes && sameYIntercepts) {
      return true;
    }

    // check if the lines are parallel:
    if (sameSlopes && !sameYIntercepts) {
      return false;
    }

    // first, we have two equations:
    //
    //  y1 = (a1 * x1) + b1
    //  y2 = (a2 * x2) + b2
    //
    // assign these into a system of equations to solve for X
    // like this (X is now same in both equations):
    //
    //  (a1 * x) + b1 = (a2 * x) + b2
    //  (a1 * x) - (a2 * x) = b2 - b1
    //  x = (b2 - b1) / (a1 - a2)

    const x = (otherLine.yIntercept - this.yIntercept) / (this.slope - otherLine.slope);

    const y = this.solveY(x);

    return new Vector2({ x, y });
  };

  calculateSegmentIntersection = (otherLine) => {
    const intersection = this.calculateIntersection(otherLine);

    // parallel
    if (!intersection) {
      return false;
    }

    const equalLines = intersection === true;
    const overlappingSegments = this.point1.isBetween(otherLine.point1, otherLine.point2)
      || this.point2.isBetween(otherLine.point1, otherLine.point2);

    if (equalLines && overlappingSegments) {
      return true;
    }

    if (equalLines && !overlappingSegments) {
      return false;
    }

    // check if line segments intersect
    if (intersection.isBetween(this.point1, this.point2)
        && intersection.isBetween(otherLine.point1, otherLine.point2)) {
      return intersection;
    }

    // the lines intersect but line segments do not
    return false;
  };
}
