import type {NeuronType} from "../enums";
import type {NeuronConnection} from "../classes";

export interface INeuron {
  type: NeuronType;
  layer: byte;

  bias: int8_t;

  get numConnections(): byte;

  allConnections: NeuronConnection[];

  clone(source: INeuron): void;

  addConnection(DEST_LAYER: uint, DEST: uint, WEIGHT?: int8_t): void;
  addConnection(prototype: NeuronConnection): void;
  addRandomConnection(): bool;
  removeConnection(index: uint): void;

  getRandomConnectionIndex(): uint;

  // Does neuron have a connection,
  // returns connection index or -1
  isConnected(LAYER: uint, index: uint): int;

  setRandomBias(): void;
  setRandomType(): void;
  setRandomConnections(): void;
  setRandom(): void;

  makeFullyConnected(): void;

  // Clear bias and connections
  setZero(): void;

  clearConnections(): void;

  // Tunnel neuron - one with no bias and only 1 connection to same neuron in next layer with weight = 1.0f
  setTunnel(num: int): void

  isInactive(): bool;

  // Mutation functions
  mutate_ChangeType(): void;
  mutate_ChangeBias(): void;
  mutate_ChangeConnection(index: uint): void;
  mutate_DeleteNeuron(): void;
}
