import {
  NeuronInputLayerIndex,
  NeuronOutputLayerIndex,
  NeuronsInLayer,
  NumNeuronLayers,
} from "../../settings";
import {BrainOutput} from "./brain-output.class";
import {IBotNeuralNet} from "../interfaces";
import {Neuron, NeuronType} from "../../neuron";

/**
 * @deprecated
 */
export class BotNeuralNet implements IBotNeuralNet {
  // Activation functions
  private activationSimple(value: float): float {
    return value >= 0.5 ? 1.0 : 0.0;
  }

  private plusMinusActivation(value: float): float {
    if (value >= 0.5) {
      return 1.0;
    } else if (value <= -0.5) {
      return -1.0;
    }

    return 0.0;
  }

  private radialBasisActivation(value: float): float {
    return value >= 0.45 && value <= 0.55 ? 1.0 : 0.0;
  }

  private linearActivation(value: float): float {
    if (value > 1.0) {
      value = 1.0;
    } else if (value < 0) {
      value = 0.0;
    }
    return value;
  }

  // Clear memory
  private clearMemory(): void {
    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      this.allMemory[xi] = Array.from(Array(NeuronsInLayer).keys()).map(
        () => 0.0
      );
    }
  }

  // All neurons
  allNeurons: Neuron[][] = [];

  // Neuron values and memory
  allValues: float[][] = [];
  allMemory: int8_t[][] = [];

  // Constructors
  constructor(prototype?: BotNeuralNet) {
    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      this.allNeurons[xi] = Array.from(Array(NeuronsInLayer).keys()).map(
        () => new Neuron()
      );
      this.allValues[xi] = Array.from(Array(NeuronsInLayer).keys()).map(
        () => 0.0
      );
      this.allMemory[xi] = Array.from(Array(NeuronsInLayer).keys()).map(
        () => 0.0
      );
    }

    for (let yi = 0; yi < NeuronsInLayer; ++yi) {
      this.allNeurons[NeuronOutputLayerIndex][yi].type = NeuronType.OUTPUT;
      this.allNeurons[NeuronInputLayerIndex][yi].type = NeuronType.INPUT;
    }

    this.clearMemory();

    if (prototype) {
      this.allNeurons = prototype.allNeurons;
    }
  }

  // Clear all values
  clear(): void {
    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      this.allValues[xi] = Array.from(Array(NeuronsInLayer).keys()).map(
        () => 0.0
      );
    }
  }

  // Process data
  process(): void {
    // Clear all neuron values
    this.clearValues();

    let value: number;
    let m: number;
    let n: Neuron;
    let t: number, v: number;

    for (let xi = 0; xi < NumNeuronLayers - 1; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        value = this.allValues[xi][yi];
        m = this.allMemory[xi][yi];
        n = this.allNeurons[xi][yi];

        // Skip calculation if neuron has no further connections
        if (n.numConnections === 0) {
          continue;
        }

        switch (n.type) {
          case NeuronType.BASIC: {
            value = this.activation(value + n.bias);
            break;
          }
          case NeuronType.RANDOM: {
            t = randomVal(1000);
            v = (value + n.bias) * 1000.0;
            value = t <= v ? 1.0 : 0.0;
            break;
          }

          case NeuronType.INPUT: {
            value += n.bias;
            break;
          }

          case NeuronType.RADIAL_BASIS: {
            value = this.radialBasisActivation(value + n.bias);
            break;
          }

          case NeuronType.MEMORY: {
            if (value + n.bias <= -0.5) {
              // Wipe memory
              m = 0.0;
            } else if (value + n.bias >= 0.5) {
              // Write in memory
              m += this.activation(value + n.bias);

              // Maximal value
              if (m > 5.0) {
                m = 5.0;
              }
            }
            value = m;
            break;
          }
        }



        for (let i = 0; i < n.numConnections; ++i) {
          this.allValues[xi + 1][n.allConnections[i].num] +=
            value * n.allConnections[i].weight;
        }
      }
    }

    // Output layer

    // Rotation
    n = this.allNeurons[NeuronOutputLayerIndex][0];

    value = this.plusMinusActivation(this.allValues[NeuronOutputLayerIndex][0] + n.bias);

    // All the rest
    for (let oi = 1; oi < NeuronsInLayer; ++oi) {
      value = this.allValues[NeuronOutputLayerIndex][oi];
      n = this.allNeurons[NeuronOutputLayerIndex][oi];

      value = this.activation(this.allValues[NeuronOutputLayerIndex][oi] + n.bias);
    }

    //console.log('this.allNeurons[NeuronOutputLayerIndex]', this.allValues[NeuronOutputLayerIndex])
  }

  /**
   * Very little change, no new connections,
   * experimental
   */
  mutateSlightly(): void {
    const randomNeuronIndex = randomVal(NumNeuronLayers * NeuronsInLayer);
    let counter = 0;

    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        if (counter++ === randomNeuronIndex) {
          const n = this.allNeurons[xi][yi];
          n.slightlyChange();
        }
      }
    }
  }

  // Set one neuron to random
  mutate(): void {
    const randomNeuronIndex = randomVal(NumNeuronLayers * NeuronsInLayer);
    let counter = 0;

    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        if (counter++ === randomNeuronIndex) {
          const n = this.allNeurons[xi][yi];

          n.setRandom();
        }
      }
    }
  }

  // Change half neurons a lot
  mutateHarsh(): void {
    for (let xi = 0; xi < NumNeuronLayers; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        if (randomPercent(50)) {
          continue;
        }

        const n = this.allNeurons[xi][yi];

        n.setRandom();
      }
    }
  }

  // Make completely random
  randomize(): void {
    for (let y = 0; y < NeuronsInLayer; ++y) {
      this.allNeurons[NeuronInputLayerIndex][y].setRandomConnections();
      this.allNeurons[NeuronInputLayerIndex][y].setRandomBias();
    }

    for (let xi = 1; xi < NumNeuronLayers - 1; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        this.allNeurons[xi][yi].setRandom();
      }
    }

    for (let y = 0; y < NeuronsInLayer; ++y) {
      this.allNeurons[NeuronOutputLayerIndex][y].setRandomBias();
    }
  }

  getOutput(): BrainOutput {
    const toRet = new BrainOutput();

    repeat((i) => {
      toRet.fields[i] = this.allValues[NeuronOutputLayerIndex][i];
    }, BrainOutput.NumFields);

    return toRet;
  }

  setDummy(): void {
    this.allNeurons[NeuronOutputLayerIndex][2].bias = 0.5;
    this.allNeurons[NeuronInputLayerIndex][0].setTunnel(3);
    this.allNeurons[1][3].setTunnel(3);
    this.allNeurons[2][3].setTunnel(3);
    this.allNeurons[3][3].setTunnel(3);
    this.allNeurons[4][3].bias = 0.0;
    this.allNeurons[4][3].addConnection(3, 0.5);
  }
}
