import type { IObject } from '../../object';
import type { ObjectTypes } from '../../object';
import type { BrainInput, BrainOutput, IBotNeuralNet } from '../../brain';
import type { IPointer } from 'tstl';
import type { IColor } from '../../utils';

export interface IBot extends IObject {
  type(): ObjectTypes;
  image_sensor_val(): float;

  isPredator(): bool;

  // Experimental
  mutagen(): void;

  // Use neural network (feed forward)
  think(input: BrainInput): BrainOutput;

  // Bot tick function, it should always call parents tick function first
  tick(): int;

  draw(): void;
  drawEnergy(): void;
  drawPredators(): void;

  // Return current energy amount from different sources
  getEnergyFromPS(): int;
  getEnergyFromKills(): int;
  getDirection(): int;
  setDirection(int: int): void;

  getMarkers(): IPointer<int>;
  getColor(): IPointer<IColor>;

  getActiveBrain(): IBotNeuralNet;
  getInitialBrain(): IBotNeuralNet;

  /**
   * Get neuron summary (info)
   *  Format (all integers):
   *  - simple neurons
   *  - radial basis neurons
   *  - random neurons
   *  - memory neurons (if any)
   *  - total connections
   *  - dead end neurons
   *  - total neurons
   */
  // struct summary_return
  // {
  //   int simple, radialBasis, random, memory, connections, deadend, neurons;
  // };

  getNeuronSummary(): summary_return;

  /**
   * Find out how close these two are as relatives,
   * returns number of matching mutation markers
   */
  // int FindKinship(Bot* stranger);
  //
  // void SetColor(Color);

  SetBodyImage(img: SDL_Texture): void;
  SetHeadImages(img: SDL_Texture): void;
}
