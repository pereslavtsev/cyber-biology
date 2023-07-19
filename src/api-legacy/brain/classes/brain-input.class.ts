import type { IBrainInput } from '../interfaces/brain-input.interface';

/**
 * @deprecated
 */
export class BrainInput implements IBrainInput {
  get energy(): float {
    return this.fields[0];
  }
  get age(): float {
    return this.fields[1];
  }
  get rotation(): float {
    return this.fields[2];
  }
  get height(): float {
    return this.fields[3];
  }
  get area(): float {
    return this.fields[4];
  }
  get eye1(): float {
    return this.fields[5];
  }
  get eye1_isrelative(): float {
    return this.fields[6];
  }
  get eye_islookingatme(): float {
    return this.fields[7];
  }

  readonly fields: [float, float, float, float, float, float, float, float] = [
    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  ];
}
