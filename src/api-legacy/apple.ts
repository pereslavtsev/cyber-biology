import { Object, ObjectTypes } from "./object";
import { DefaultAppleEnergy } from "./settings";

/**
 * Apple class
 * @deprecated
 */
export class Apple extends Object {
  // Draw
  draw(): void {}

  // Draw energy
  // void drawEnergy();

  static readonly Type = ObjectTypes.APPLE;

  // New apple
  constructor(X: number, Y: number, public energy: number = DefaultAppleEnergy) {
    super(X, Y);
  }
}
