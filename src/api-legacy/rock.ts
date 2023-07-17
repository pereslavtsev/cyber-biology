import { Object } from "./object/classes/object.class";
import {ObjectTypes} from "./object/enums/object-types.enum";

/**
 * Rock class
 * @deprecated
 */
export class Rock extends Object {
  //Draw rock
  draw(): void {}

  static readonly Type = ObjectTypes.ROCK;
}
