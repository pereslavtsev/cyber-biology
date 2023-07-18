import type {IObject, ObjectTypes} from "../../object";

export interface IOrganics extends IObject
{
// private:
  doneFalling: bool;
  // image: SDL_Texture;

// public:
  type(): ObjectTypes;
  image_sensor_val(): float;
  tick(): int;
  draw(): void;
  drawEnergy(): void;

  SetImage(img: SDL_Texture): void;
}
