import {NeuronsInLayer} from "../../settings";

/**
 * @deprecated
 */
export class BrainOutput {
  static NumFields: number = NeuronsInLayer;

  get rotate(): number {
    return Math.round(this.fields[0]);
  }
  get move(): number {
    return Math.round(this.fields[1]);
  }
  get photosynthesis(): number {
    return Math.round(this.fields[2]);
  }
  get divide(): number {
    return Math.round(this.fields[3]);
  }
  set divide(value: number) {
    this.fields[3] = Math.round(value);
  }
  get attack(): number {
    return Math.round(this.fields[4]);
  }

  readonly fields: number[] = [0, 0, 0, 0, 0];

  static GetEmptyBrain(): BrainOutput {
    return new BrainOutput();
  }
}
