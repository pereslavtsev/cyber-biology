import type { ObjectTypes } from '../enums';
import type { IField } from '../../field';

export interface IObject {
  x: int;
  y: int;

  // If an object stores energy it's here
  energy: int;

  type(): ObjectTypes;
  image_sensor_val(): float;

  // Basic 'dummy' draw functions if needed
  draw(): void;
  drawEnergy(): void;
  drawPredators(): void;

  /**
   * This function returns 1 when the object is destroyed.
   * You should call it on every simulation tick before you
   * call same function in derived class
   * Returns:
   * 0 - all fine
   * 1 - object destroyed
   * 2 - nothing to do(last tick frame matches current frame)
   */
  tick(): int;

  getLifetime(): uint;
  setLifetime(uint: uint): void;

  CurrentFrame: uint;
  SetPointers(field: IField, cells: IObject): void;
}
