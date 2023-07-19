import { Object, ObjectTypes } from '../../object';
import { IOrganics } from '../interfaces';
import {OrganicWasteAlwaysFalls} from "../../settings";

/**
 * Organics class
 * @deprecated
 */
export class Organics extends Object implements IOrganics {
  private doneFalling: bool = false;

  static image: any;

  type(): ObjectTypes {
    return ObjectTypes.ORGANIC_WASTE;
  }

  image_sensor_val(): float {
    return 0.5;
  }

  // Draw
  draw(): void {
    this.calcScreenX();
    this.calcObjectRect();

    // Draw from texture
    // TODO
  }

  // Draw energy
  drawEnergy(): void {
    // TODO
  }

  // New organic waste
  constructor(X: number, Y: number, public energy: number) {
    super(X, Y);
  }

  static SetImage(img: any) {
    this.image = img;
  }

  tick(): int {
    const ret = super.tick();

    if (ret !== 0) {
      return ret;
    }

    // Organic waste should fall until it hits an obstacle

    // If not done falling
    if (!this.doneFalling)
    {
      let next_y: int = this.y + 1;

      // What is underneath?
      if (this.pField.IsInBounds(this.x, next_y))
      {
        if ((*pCells)[x][next_y] === null)
        {
          // Fall
          pField->MoveObject(this, x, next_y);
        }
      else if (!OrganicWasteAlwaysFalls)
        {
          this.doneFalling = true;
        }
      }
      else
      {
        this.doneFalling = true; // Once done it shouldn't fall anymore
      }
    }

    return 0;
  }
}
