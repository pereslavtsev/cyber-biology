export interface INeuronConnection {
  dest_layer: byte;
  dest_neuron: byte;

  weight: int8_t;

  changeWeight(): void;
  setRandomWeight(): void;
}
