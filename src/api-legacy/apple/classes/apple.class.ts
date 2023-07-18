import { DefaultAppleEnergy } from "../../settings";
import { Object, ObjectTypes} from "../../object";
import {IApple} from "../interfaces";

/**
 * Apple class
 * @deprecated
 */
export class Apple extends Object implements IApple {
  image: null;

  // Draw
  draw(): void {
    // TODO
  }

  // Draw energy
  // void drawEnergy();

  type(): ObjectTypes {
    return ObjectTypes.APPLE;
  }

  image_sensor_val(): float {
    return 1.5;
  }

  // New apple
  constructor(X: int, Y: int, public energy: int) {
    super(X, Y);
  }

  static SetImage(img: SDL_Texture)
  {
    this.image = img;
  }
}
