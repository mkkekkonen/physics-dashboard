import { Vector2 } from './Vector2';

export class Line {
  constructor({
    slope,
    yIntercept,
    point1,
    point2,
  }) {
    this.slope = slope;
    this.yIntercept = yIntercept;
    this.point1 = point1;
    this.point2 = point2;
  }

  static fromPoints = (point1, point2) => {
    const slope = (point1.y - point2.y) / (point1.x - point2.x);

    // calculate the Y intercept by assigning the coordinates of the
    // first point to the variables of the slope-intercept equation
    // (y = ax + b)
    const yIntercept = point1.y - (slope * point1.x);

    return new Line({
      slope,
      yIntercept,
      point1,
      point2,
    });
  };

  calculateIntersection = (otherLine) => {
    // check if the lines are equal:
    if (this.slope === otherLine.slope && this.yIntercept === otherLine.yIntercept) {
      return true;
    }

    // check if the lines are parallel:
    if (this.slope === otherLine.slope && this.yIntercept !== otherLine.yIntercept) {
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
