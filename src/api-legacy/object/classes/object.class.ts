import {ObjectTypes} from '../enums';
import {IObject} from '../interface';
import {Field} from "../../field";
import {FieldCellSize, FieldCellsWidth} from "../../settings";

export abstract class Object implements IObject {
  // Prev. tick frame number
  private lastTickFrame: uint = 0;

  // X coordinate, corrected with Field::RenderX
  protected screenX: int;

  protected calcScreenX(): void {
    this.screenX = this.x - Field.renderX;

    if (this.screenX < 0)
    {
      this.screenX += FieldCellsWidth;
    }
  }

  protected calcObjectRect(): void {
    this.object_rect =
      {
        this.FieldX + this.screenX * FieldCellSize,
        this.FieldY + this.y * FieldCellSize,
        FieldCellSize,
        FieldCellSize
      };
  }

  protected calcObjectRectShrinked(shrink: int): void {

  }

  // Time in ticks since object was created
  protected lifetime: number = 0;

  // Object type
  static readonly Type: ObjectTypes = ObjectTypes.ABSTRACT;

  protected constructor(
    // Coordinates
    x: int,
    y: int,
  ) {
    this.x = x;
    this.y = y;
    this.energy = 0;
  }

  public x: int, y: int;

  // If an object stores energy it's here
  public energy: int;

  type(): ObjectTypes {
    return ObjectTypes.ABSTRACT;
  }

  image_sensor_val(): float {
    return NaN;
  }

  // Basic 'dummy' draw function if needed
  draw(): void {
    this.CalcScreenX();
    this.calcObjectRect();
  }

  abstract drawEnergy(): void;
  abstract drawPredators(): void;

  /**
   * This function returns true when the creature dies
   * You should call it on every simulation tick before you
   * call same function in descendant class
   * Returns:
   *  0 - all fine
   *  1 - object destroyed
   *  2 - nothing to do (last tick frame matches current frame)
   */
  tick(): int {
    if (Object.CurrentFrame === this.lastTickFrame) {
      return 2;
    }

    ++this.lifetime;
    this.lastTickFrame = Object.CurrentFrame;

    return 0;
  }

  static CurrentFrame: uint;

  // Returns lifetime
  getLifetime(): number {
    return this.lifetime;
  }

// Texture rectangle
  protected readonly static image_rect: any;
}
