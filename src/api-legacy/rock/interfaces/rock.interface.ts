import {IObject, ObjectTypes} from "../../object";

export interface IRock extends IObject
{
// private:
// static SDL_Texture* image;

// public:
  type(): ObjectTypes;
  image_sensor_val(): float;
  draw(): void;

  SetImage(img: SDL_Texture): void;
}
