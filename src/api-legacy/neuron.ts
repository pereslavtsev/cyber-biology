import { randomPercent, randomVal } from "./my-types";
import {
  MaxConnectionsPerNeuron,
  NeuronsInLayer,
  UseMemoryNeuron,
} from "./settings";

/**
 * @deprecated
 */
export interface NeuronConnection {
  num: number;
  weight: number;
}

/**
 * @deprecated
 */
export enum NeuronType {
  BASIC,
  INPUT,
  OUTPUT,
  RANDOM,
  RADIAL_BASIS,
  MEMORY,
}

/**
 * @deprecated
 */
export class Neuron {
  type: NeuronType = NeuronType.BASIC;

  bias: number = 0.0;

  allConnections: NeuronConnection[] = [];

  get numConnections() {
    return this.allConnections.length;
  }

  // Self-explanatory
  addConnection(NUM: number, WEIGHT: number): void {
    this.allConnections.push({ num: NUM, weight: WEIGHT });
  }

  // Sort connections by index
  sortConnections(): void {
    // TODO
  }

  // Does neuron have a connection
  isConnected(index: number): boolean {
    for (let i = 0; i < this.numConnections; ++i) {
      if (this.allConnections[i].num === index) {
        return true;
      }
    }

    return false;
  }

  // Set to random
  setRandomBias(): void {
    this.bias = randomVal(40001) * 0.0001 - 2.0;
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

    let connections = randomVal(MaxConnectionsPerNeuron + 1);

    if (connections > 0) {
      let connectionIndex;

      for (;;) {
        connectionIndex = randomVal(NeuronsInLayer);

        if (!this.isConnected(connectionIndex)) {
          this.addConnection(connectionIndex, randomVal(40001) * 0.0001 - 2.0);

          if (--connections === 0) {
            return;
          }
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
  // Zero bias and connections
  setZero(): void {
    this.clearConnections();
    this.bias = 0.0;
  }

  // Tunnel neuron - one with no bias and only 1 connection to same neuron in next layer with weight = 1.0f
  setTunnel(num: number): void {
    this.bias = 0.0;
    this.allConnections = [{ num, weight: 1.0 }];
  }

  // Change neuron a little
  slightlyChange(): void {
    this.bias += randomVal(1001) * 0.0001 - 0.05;

    for (let i = 0; i < this.numConnections; ++i) {
      this.allConnections[i].weight += randomVal(2001) * 0.0001 - 0.1;
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
