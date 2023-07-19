import type { IObject } from '../../object';

export interface IApple extends IObject {
  // constexpr ObjectTypes type() override;
  // constexpr float image_sensor_val() override;
  draw(): void;

  SetImage: (img: SDL_Texture) => void;
}
