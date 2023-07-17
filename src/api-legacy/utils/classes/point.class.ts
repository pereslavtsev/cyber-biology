/**
 * @deprecated
 */
export class Point {
  constructor(public x = -1, public y = -1) {}

  shift(X: number, Y: number): void {
    this.x += X;
    this.y += Y;
  }

  set(X: number, Y: number): void {
    this.x = X;
    this.y = Y;
  }
}
