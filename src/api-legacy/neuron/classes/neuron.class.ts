import {randomPercent, randomVal, randomValRange} from "../../my-types";
import {
  MaxConnectionsPerNeuron,
  NeuronOutputLayerIndex,
  NeuronsInLayer,
  NumNeuronLayers,
  UseMemoryNeuron,
} from "../../settings";
import {INeuron} from "../interfaces/neuron.interface";
import {NeuronType} from "../enums/neuron-type.enum";
import {NeuronConnection} from "./neuron-connection.class";

/**
 * @deprecated
 */
export class Neuron implements INeuron {
  constructor() {
    this.setRandomType();
  }

  type: NeuronType = NeuronType.BASIC;
  layer: number = 0;

  bias: number = 0.0;

  get numConnections() {
    return this.allConnections.length;
  }

  allConnections: NeuronConnection[] = [];

  clone(source: INeuron) {
    return structuredClone(source)
  }

  // Self-explanatory
  addConnection(DEST_LAYER: number, DEST: number, WEIGHT?: number): void;
  addConnection(prototype: NeuronConnection): void;
  addConnection(DEST_LAYER: number | NeuronConnection, DEST: number, WEIGHT = 120): void {
    if (DEST_LAYER instanceof NeuronConnection) {
      const prototype = DEST_LAYER;
      this.addConnection(prototype.dest_layer, prototype.dest_neuron, prototype.weight);
      return;
    }

    const nConnection = new NeuronConnection();

    nConnection.dest_neuron = DEST;
    nConnection.dest_layer = DEST_LAYER;

    if (WEIGHT < 120) {
      nConnection.weight = WEIGHT;
    } else {
      nConnection.setRandomWeight();
    }
    this.allConnections.push(nConnection);
  }

  addRandomConnection(): boolean {
    if (this.numConnections >= MaxConnectionsPerNeuron[this.type]) {
      return false;
    }

    let c_Index: number, c_Layer: number;

    for (;;)
    {
      if (this.layer === NumNeuronLayers - 2) {
        c_Layer = NeuronOutputLayerIndex;
      } else {
        c_Layer = randomVal(NumNeuronLayers - (this.layer + 1)) + this.layer + 1;
      }


      if (c_Layer === NeuronOutputLayerIndex)
      {
        c_Index = randomVal(NumOutputNeurons);
        c_Layer = NeuronOutputLayerIndex;
      }
      else {
        c_Index = randomVal(NumHiddenNeurons);
      }


      // If not connected
      if (this.isConnected(c_Layer, c_Index) === -1)
      {
        this.addConnection(c_Layer, c_Index);

        return true;
      }
    }

  }

  removeConnection(index: number): void {

  }

  // Sort connections by index
  sortConnections(): void {
    // TODO
  }

  // Does neuron have a connection
  isConnected(LAYER: number, index: number): number {
    for (let i = 0; i < this.numConnections; ++i) {
      if (this.allConnections[i].dest_layer === LAYER && this.allConnections[i].dest_neuron === index) {
        return i;
      }
    }

    return -1;
  }

  // Set to random
  setRandomBias(): void {
    this.bias = randomValRange();
  }

  setRandomType(): void {
    if (this.type !== NeuronType.INPUT && this.type !== NeuronType.OUTPUT) {
      if (randomPercent(2)) {
        this.type = NeuronType.RANDOM;
        return;
      }

      const refVal = randomVal(UseMemoryNeuron ? 15 : 14);
      if (refVal <= 8) {
        this.type = NeuronType.BASIC;
      } else if (refVal <= 13) {
        this.type = NeuronType.RADIAL_BASIS;
      } else {
        this.type = NeuronType.MEMORY;
      }
    }
  }

  setRandomConnections(): void {
    this.clearConnections();

    if (this.type === NeuronType.OUTPUT) {
      return;
    }

    if (FullyConnected) {
      this.makeFullyConnected();
      return;
    }

    let connections = randomVal(MaxConnectionsPerNeuron[this.type] + 1);
    for (; connections > 0; --connections) {
      if (connections > 0) {
        if (!this.addRandomConnection()) {
          return;
        }
      }
    }
  }

  // Randomize entire neuron
  setRandom(): void {
    this.setRandomBias();
    this.setRandomType();
    this.setRandomConnections();
  }

  // Zero connections
  clearConnections(): void {
    this.allConnections = [];
  }

  isInactive(): boolean {
    return !this.numConnections;
  }

  // Zero bias and connections
  setZero(): void {
    this.clearConnections();
    this.bias = 0.0;
  }

  // Tunnel neuron - one with no bias and only 1 connection to same neuron in next layer with weight = 1.0f
  setTunnel(num: number): void {
    this.setZero();
    this.allConnections[0].weight = WeightValueCorrespondingTo_1;
    this.allConnections[0].dest_neuron = num;
    this. allConnections[0].dest_layer = this.layer + 1;
  }

  // Change neuron a little
  slightlyChange(): void {
    this.bias += randomVal(1001) * 0.0001 - 0.05;

    for (let i = 0; i < this.numConnections; ++i) {
      this.allConnections[i].weight += randomVal(2001) * 0.0001 - 0.1;
    }
  }

  mutate_ChangeType(): void {
    this.setRandomType();
  }

  mutate_DeleteNeuron(): void {
    this.setZero();

    if((this.type !== NeuronType.INPUT) && (this.type !== NeuronType.OUTPUT)) {
      this.type = NeuronType.BASIC;
    }
  }

  // Get neuron description by type (for GUI)
  static GetTextFromType(t: NeuronType): string {
    switch (t) {
      case NeuronType.BASIC:
        return "basic";
      case NeuronType.INPUT:
        return "input";
      case NeuronType.OUTPUT:
        return "output";
      case NeuronType.RADIAL_BASIS:
        return "radial basis";
      case NeuronType.MEMORY:
        return "memory";
      case NeuronType.RANDOM:
        return "random";
      default:
        return "other";
    }
  }
}
