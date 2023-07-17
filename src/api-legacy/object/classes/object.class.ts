import { nanoid } from "nanoid";
import {ObjectTypes} from "../enums/object-types.enum";

export abstract class Object {
  private lastTickFrame: number = 0;
  readonly id: string;

  // Time in ticks since object was created
  protected lifetime: number = 0;

  // abstract draw(): void;

  // Object type
  static readonly Type: ObjectTypes = ObjectTypes.ABSTRACT;

  protected constructor(
    // Coordinates
    public x: number,
    public y: number
  ) {
    this.id = nanoid();
  }

  // Basic 'dummy' draw function if needed
  abstract draw(): void;

  /**
   * This function returns true when the creature dies
   * You should call it on every simulation tick before you
   * call same function in descendant class
   * Returns:
   *  0 - all fine
   *  1 - object destroyed
   *  2 - nothing to do (last tick frame matches current frame)
   */
  tick(): 0 | 1 | 2 {
    if (Object.CurrentFrame === this.lastTickFrame) {
      return 2;
    }

    ++this.lifetime;
    this.lastTickFrame = Object.CurrentFrame;

    return 0;
  }

  static CurrentFrame: number;

  // Returns lifetime
  getLifetime(): number {
    return this.lifetime;
  }
}
