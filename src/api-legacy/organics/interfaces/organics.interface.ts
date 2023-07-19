import type { IObject, ObjectTypes } from '../../object';

export interface IOrganics extends IObject {
  type(): ObjectTypes;
  image_sensor_val(): float;
  tick(): int;
  draw(): void;
  drawEnergy(): void;

  SetImage(img: any): void;
}
