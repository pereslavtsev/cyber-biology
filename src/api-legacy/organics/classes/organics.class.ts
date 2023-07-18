/**
 * Organics class
 * @deprecated
 */
import { Object, ObjectTypes } from "../../object";
import {IOrganics} from "../interfaces/organics.interface";

/**
 * Organics class
 * @deprecated
 */
export class Organics extends Object implements IOrganics {
  doneFalling: boolean = false;
  static readonly Type = ObjectTypes.ORGANIC_WASTE;

  // Draw
  draw(): void {
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
}
