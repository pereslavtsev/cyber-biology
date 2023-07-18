import {IObject} from "../../object/interface/object.interface";

export interface IApple extends IObject
{
// private:

// static SDL_Texture* image;


// public:

  // constexpr ObjectTypes type() override;
  // constexpr float image_sensor_val() override;
  draw(): void;

  SetImage: (img: SDL_Texture) => void;
}
