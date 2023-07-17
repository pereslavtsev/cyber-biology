import type {NeuronConnection, NeuronType} from "./neuron";

export interface INeuron {
  type: NeuronType;
  bias: number;

  allConnections: NeuronConnection[];

  clone(source: INeuron): void;

  addConnection(DEST_LAYER: number, DEST: number, WEIGHT: number): void;
  addConnection(prototype: NeuronConnection): void;
  addRandomConnection(): boolean;
  removeConnection(index: number): void;

  getRandomConnectionIndex(): number;

  // Does neuron have a connection,
  // returns connection index or -1
  isConnected(LAYER: number, index: number): number;

  setRandomBias(): void;
  setRandomType(): void;
  setRandomConnections(): void;
  setRandom(): void;

  makeFullyConnected(): void;

  // Clear bias and connections
  setZero(): void;

  clearConnections(): void;

  // Tunnel neuron - one with no bias and only 1 connection to same neuron in next layer with weight = 1.0f
  setTunnel(num: number): void

  isInactive(): boolean;

  // Mutation functions
  mutate_ChangeType(): void;
  mutate_ChangeBias(): void;
  mutate_ChangeConnection(index: number): void;
  mutate_DeleteNeuron(): void;
}
