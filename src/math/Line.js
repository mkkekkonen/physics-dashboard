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
    // calculate the Y intercept by assigning the coordinates of the
    // first point to the variables of the slope-intercept equation
    // (y = ax + b)
    return this.point1.y - (this.slope * this.point1.x);
  }

  calculateIntersection = (otherLine) => {
    const sameSlopes = mathUtils.approximately(this.slope, otherLine.slope);
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
    // like this (X is now the same in both equations):
    //
    //  (a1 * x) + b1 = (a2 * x) + b2
    //  (a1 * x) - (a2 * x) = b2 - b1
    //  x = (b2 - b1) / (a1 - a2)

    const x = (otherLine.yIntercept - this.yIntercept) / (this.slope - otherLine.slope);

    // next, assign X to the first equation to solve for Y:

    const y = (this.slope * x) + this.yIntercept;

    return new Vector2({ x, y });
  };

  calculateSegmentIntersection = (otherLine) => {
    const intersection = this.calculateIntersection(otherLine);

    // parallel
    if (!intersection) {
      return false;
    }

    // equal - check if segments overlap
    if (intersection === true
        && (this.point1.isBetween(otherLine.point1, otherLine.point2)
          || this.point2.isBetween(otherLine.point1, otherLine.point2))
    ) {
      return true;
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
