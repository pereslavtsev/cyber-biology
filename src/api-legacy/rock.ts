import { Object, ObjectTypes } from "./object";

/**
 * Rock class
 * @deprecated
 */
export class Rock extends Object {
  //Draw rock
  draw(): void {}

  static readonly Type = ObjectTypes.ROCK;
}
