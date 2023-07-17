import { Object } from "./object/classes/object.class";
import { DefaultAppleEnergy } from "./settings";
import {ObjectTypes} from "./object/enums/object-types.enum";

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
