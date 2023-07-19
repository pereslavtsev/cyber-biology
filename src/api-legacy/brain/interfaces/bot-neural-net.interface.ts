import type { INeuron } from '../../neuron';
import type { IBrainInput } from './brain-input.interface';

export interface IBotNeuralNet {
  allNeurons: INeuron[][];

  // Neuron values and memory
  allValues: float[][];
  allMemory: int8_t[][];

  clone(prototype: IBotNeuralNet): void;

  process(input: IBrainInput): void;

  mutate(): void;
  randomize(): void;
  optimize(): void;
}
