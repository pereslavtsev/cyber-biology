import type {INeuron} from "../../neuron";

export interface IBotNeuralNet {
// private:
  // Activation functions
  activationSimple(value: float): float;
  plusMinusActivation(value: float): float;
  radialBasisActivation(value: float): float;
  linearActivation(value: float): float;

  clearMemory(): void;
  clearValues(): void;

  setDummy(): void;

//public:

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
