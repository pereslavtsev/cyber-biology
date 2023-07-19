import { INeuronConnection } from '../interfaces';
import { randomPercent, randomValRange } from '../../utils';
import {
  ChangeConnectionWeightMax,
  ChangeConnectionWeightMin,
  ConnectionWeightMax,
  ConnectionWeightMin,
  WeightValueCorrespondingTo_1,
} from '../../settings';

/**
 * @deprecated
 */
export class NeuronConnection implements INeuronConnection {
  dest_layer: byte = 0;
  dest_neuron: byte = 0;

  weight: int8_t = 0;

  // done
  changeWeight(): void {
    let change: char = randomValRange(
      ChangeConnectionWeightMin,
      ChangeConnectionWeightMax,
    );

    if (randomPercent(50)) {
      change *= -1;
    }

    this.weight += change * WeightValueCorrespondingTo_1;

    if (this.weight > ConnectionWeightMax) {
      this.weight = ConnectionWeightMax;
    } else if (this.weight < ConnectionWeightMin) {
      this.weight = ConnectionWeightMin;
    }
  }

  // done
  setRandomWeight(): void {
    this.weight =
      randomValRange(ConnectionWeightMin, ConnectionWeightMax) *
      WeightValueCorrespondingTo_1;
  }
}
