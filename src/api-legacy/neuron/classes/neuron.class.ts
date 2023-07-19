import {
  ChangeBiasMax,
  ChangeBiasMin,
  FullyConnected,
  NeuronBiasMax,
  NeuronBiasMin,
  NeuronOutputLayerIndex,
  NumHiddenNeurons,
  NumNeuronLayers,
  NumNeuronsInLayerMax,
  NumOutputNeurons,
  UseMemoryNeuron,
  UseRandomNeuron,
  WeightValueCorrespondingTo_1,
} from '../../settings';
import { INeuron } from '../interfaces';
import { NeuronType } from '../enums';
import { NeuronConnection } from './neuron-connection.class';
import { MaxConnectionsPerNeuronType } from '../consts';
import { randomPercent, randomVal, randomValRange, repeat } from '../../utils';

/**
 * @deprecated
 */
export class Neuron implements INeuron {
  constructor() {
    this.setRandomType();
  }

  type: NeuronType = NeuronType.BASIC;
  layer: byte = 0;

  bias: int8_t = 0.0;

  get numConnections() {
    return this.allConnections.length;
  }

  allConnections: NeuronConnection[] = [];

  // TODO: test
  clone(source: INeuron) {
    return structuredClone(source);
  }

  // Self-explanatory
  addConnection(
    DEST_LAYER: uint | NeuronConnection,
    DEST?: uint,
    WEIGHT: int8_t = 120,
  ): void {
    if (DEST_LAYER instanceof NeuronConnection || !DEST) {
      const prototype = DEST_LAYER as NeuronConnection;
      this.addConnection(
        prototype.dest_layer,
        prototype.dest_neuron,
        prototype.weight,
      );
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
    if (this.numConnections >= MaxConnectionsPerNeuronType[this.type]) {
      return false;
    }

    let c_Index: number, c_Layer: number;

    for (;;) {
      if (this.layer === NumNeuronLayers - 2) {
        c_Layer = NeuronOutputLayerIndex;
      } else {
        c_Layer =
          randomVal(NumNeuronLayers - (this.layer + 1)) + this.layer + 1;
      }

      if (c_Layer === NeuronOutputLayerIndex) {
        c_Index = randomVal(NumOutputNeurons);
        c_Layer = NeuronOutputLayerIndex;
      } else {
        c_Index = randomVal(NumHiddenNeurons);
      }

      // If not connected
      if (this.isConnected(c_Layer, c_Index) === -1) {
        this.addConnection(c_Layer, c_Index);

        return true;
      }
    }
  }

  // done
  removeConnection(index: number): void {
    this.allConnections.splice(index, 1);
  }

  // done
  getRandomConnectionIndex(): uint {
    return randomVal(this.numConnections);
  }

  // Does neuron have a connection
  isConnected(LAYER: number, index: number): number {
    for (let i = 0; i < this.numConnections; ++i) {
      if (
        this.allConnections[i].dest_layer === LAYER &&
        this.allConnections[i].dest_neuron === index
      ) {
        return i;
      }
    }

    return -1;
  }

  // Set to random
  // done
  setRandomBias(): void {
    this.bias = randomValRange(NeuronBiasMin, NeuronBiasMax);
  }

  // done
  setRandomType(): void {
    if (this.type !== NeuronType.INPUT && this.type !== NeuronType.OUTPUT) {
      if (UseRandomNeuron) {
        if (randomPercent(2)) {
          this.type = NeuronType.RANDOM;
          return;
        }
      }

      let roll: int;
      if (UseMemoryNeuron) {
        roll = randomVal(12);
      } else {
        roll = randomVal(11);
      }

      if (roll <= 5) {
        this.type = NeuronType.BASIC;
      } else if (roll <= 10) {
        this.type = NeuronType.RADIAL_BASIS;
      } else {
        this.type = NeuronType.MEMORY;
      }
    }
  }

  // done
  setRandomConnections(): void {
    this.clearConnections();

    if (this.type === NeuronType.OUTPUT) {
      return;
    }

    if (FullyConnected) {
      this.makeFullyConnected();
      return;
    }

    let connections = randomVal(MaxConnectionsPerNeuronType[this.type] + 1);
    for (; connections > 0; --connections) {
      if (connections > 0) {
        if (!this.addRandomConnection()) {
          return;
        }
      }
    }
  }

  // Randomize entire neuron
  // done
  setRandom(): void {
    this.setRandomBias();
    this.setRandomType();
    this.setRandomConnections();
  }

  // done
  makeFullyConnected(): void {
    repeat((i) => {
      this.allConnections[i].dest_layer = this.layer + 1;
      this.allConnections[i].dest_neuron = i;

      this.allConnections[i].setRandomWeight();
    }, NumNeuronsInLayerMax);
  }

  // Zero connections
  // done
  clearConnections(): void {
    this.allConnections = [];
  }

  // done
  isInactive(): boolean {
    return !this.numConnections;
  }

  // Zero bias and connections
  // done
  setZero(): void {
    this.clearConnections();
    this.bias = 0.0;
  }

  // Tunnel neuron - one with no bias and only 1 connection to same neuron in next layer with weight = 1.0f
  // done
  setTunnel(num: number): void {
    this.setZero();
    this.allConnections[0].weight = WeightValueCorrespondingTo_1;
    this.allConnections[0].dest_neuron = num;
    this.allConnections[0].dest_layer = this.layer + 1;
  }

  // done
  mutate_ChangeType(): void {
    this.setRandomType();
  }

  // done
  mutate_ChangeBias(): void {
    let change: char = randomValRange(ChangeBiasMin, ChangeBiasMax);

    if (randomPercent(50)) {
      change *= -1;
    }

    this.bias += change;

    if (this.bias > NeuronBiasMax) {
      this.bias = NeuronBiasMax;
    } else if (this.bias < NeuronBiasMin) {
      this.bias = NeuronBiasMin;
    }
  }

  // done
  mutate_ChangeConnection(index: uint): void {
    const roll: int = randomVal(101);
    const connection: int = index;

    if (roll <= 15) {
      // 15% - remove connection
      this.removeConnection(connection);
    } else if (roll <= 30) {
      // 15% - add random connection
      this.addRandomConnection();
    } else {
      // Change connection weight
      this.allConnections[connection].changeWeight();
    }
  }

  // done
  mutate_DeleteNeuron(): void {
    this.setZero();

    if (this.type !== NeuronType.INPUT && this.type !== NeuronType.OUTPUT) {
      this.type = NeuronType.BASIC;
    }
  }
}
