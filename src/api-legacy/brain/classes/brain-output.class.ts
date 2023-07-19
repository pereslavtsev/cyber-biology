import { IBrainOutput } from '../interfaces/brain-output.interface';

/**
 * @deprecated
 */
export class BrainOutput implements IBrainOutput {
  get desired_rotation_x(): int {
    return Math.round(this.fields[0]);
  }
  get desired_rotation_y(): int {
    return Math.round(this.fields[1]);
  }

  get move(): int {
    return Math.round(this.fields[2]);
  }
  get photosynthesis(): int {
    return Math.round(this.fields[3]);
  }
  get attack(): int {
    return Math.round(this.fields[4]);
  }
  get digestOrganics(): int {
    return Math.round(this.fields[5]);
  }

  get divide_num(): int {
    return Math.round(this.fields[6]);
  }
  get divide_energy(): int {
    return Math.round(this.fields[7]);
  }

  readonly fields: [int, int, int, int, int, int, int, int] = [
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
}
