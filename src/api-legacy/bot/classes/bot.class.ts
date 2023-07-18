// Rotations array, contains where a bot would look with every
// position of its head
import { BotNeuralNet } from "../../brain/classes/bot-neural-net.class";
import {
  rand,
  randomPercent,
  randomPercentX10,
  randomVal,
  repeat,
} from "../../my-types";
import {
  BotDiesIfEnergyOverflow,
  ChangeColorSlightly,
  EveryTickEnergyPenalty,
  FertilityDelay,
  FieldCellsHeight,
  ForbidMutations,
  HowMuchDifferenceCantBeTold,
  MaxBotLifetime,
  MaxPossibleEnergyForABot,
  MudLayerHeight,
  MutateNeuronsMaximum,
  MutateNeuronsSlightlyMaximum,
  NeuronInputLayerIndex,
  NeuronsInLayer,
  NumberOfMutationMarkers,
  NumNeuronLayers,
  OceanHeight,
  PresetRandomColors,
  RandomColorEveryNewMarkersSet,
  StunAfterBirth,
  TotalMutationChancePercentX10,
  UseTotalMutation,
} from "../../settings";
import { Neuron } from "../../neuron/classes/neuron.class";
import { Object } from "../../object/classes/object.class";
import {BrainInput} from "../../brain/classes/brain-input.class";
import {EnergySource} from "../enums/energy-source.enum";
import {s_Color} from "../interfaces/s-color.interface";
import {presetColors} from "../consts";
import {BrainOutput} from "../../brain/classes/brain-output.class";
import {NeuronType} from "../../neuron/enums/neuron-type.enum";
import {ObjectTypes} from "../../object/enums/object-types.enum";

type summary_return = [
  simple: number,
  radialBasis: number,
  random: number,
  memory: number,
  connections: number,
  deadend: number,
  neurons: number
];

/**
 * Bot class
 * @deprecated
 */
export class Bot extends Object {
  // Rotation, see Rotations[]
  direction: number = 0;

  brain: BotNeuralNet = new BotNeuralNet(); // ???

  // Bot energy, if this is 0 bot dies
  energy: number = 100;

  // if this is not 0, bot does nothing at his turn
  stunned: number;

  // How long a bot should wait before multiply
  fertilityDelay: number;

  // Default color
  color: [number, number, number] = [0, 0, 0];

  // Energy acquired from different sources
  energyFromPS: number = 0;
  energyFromKills: number = 0;
  energyFromOrganics: number = 0;

  // Mutation markers used to decide how close two bots are to each other as relatives
  mutationMarkers: number[] = [];
  nextMarker: number = 0;

  changeMutationMarker(): void {
    this.mutationMarkers[this.nextMarker++] = rand();

    if (this.nextMarker >= NumberOfMutationMarkers) {
      this.nextMarker = 0;

      if (RandomColorEveryNewMarkersSet) {
        this.randomizeColor();
      }
    }
  }

  // Set random mutation markers
  randomizeMarkers(): void {
    for (let i = 0; i < NumberOfMutationMarkers; ++i) {
      this.mutationMarkers[i] = rand();
    }
    this.nextMarker = 0;
  }

  // Set random color
  randomizeColor(): void {
    this.color = Bot.GetRandomColor().rgb;
  }

  // Set random direction
  randomDirection(): void {
    this.direction = randomVal(8);
  }

  // Severe mutation function - Experimental
  totalMutation(): void {
    this.randomizeMarkers();

    repeat(() => {
      this.changeMutationMarker();
    }, 3);

    this.brain.mutateHarsh();

    this.randomizeColor();
  }

  // Shift color a little (-10 to +10)
  changeColor(str: number = 10): void {
    const i = randomVal(3);

    const changeColor = randomVal(2 * str + 1) - str;
    this.color[i] += changeColor;

    if (this.color[i] < 0) {
      this.color[i] = 0;
    } else if (this.color[i] > 255) {
      this.color[i] = 255;
    }
  }

  // Experimental
  slightlyMutate(): void {
    this.brain.mutateSlightly();

    if (ChangeColorSlightly) {
      this.changeColor(10);
    }
  }

  // Main mutate function
  mutate(): void {
    // Change next mutation marker
    this.changeMutationMarker();

    // Mutate brain
    for (let i = 0; i < 1 + randomVal(MutateNeuronsMaximum + 1); ++i) {
      this.brain.mutate();
    }

    for (let s = 0; s < 1 + randomVal(MutateNeuronsSlightlyMaximum + 1); ++s) {
      this.brain.mutateSlightly();
    }

    // Change color
    if (ChangeColorSlightly) {
      this.changeColor(20);
    }

    /*if (RandomPercentX10(RandomColorChancePercentX100))
    {
      RandomizeColor();
    }*/
  }

  //----------------------------------------------------------------------------------------------
  // These functions are used for experiments such as adaptation,
  // you are supposed to call them at the end of tick() function, or do not use

  adaptation_numTicks: number = 0;
  adaptation_numRightSteps: number = 0;
  adaptation_lastX: number;

  adaptation_ticks: number = 1;

  // Divers project
  artificialSelectionWatcher(): boolean {
    // Is on land?
    if (this.y < FieldCellsHeight - Bot.adaptationStep5) {
      if (this.lifetime === 1) {
        if (randomPercentX10(Bot.adaptationStep)) {
          return true;
        }
      }
    }
    // Is in ocean?
    else if (
      this.y >= FieldCellsHeight - Bot.adaptationStep5 &&
      this.y < FieldCellsHeight - Bot.adaptationStep7
    ) {
      if (this.lifetime === 1) {
        if (randomPercentX10(Bot.adaptationStep2)) {
          return true;
        }
      }
    }

    // New bot wait
    if (this.lifetime < Bot.adaptationStep3) {
      if (randomPercentX10(250)) {
        return true;
      }
    }

    // Force move
    if (this.lifetime > 20) {
      if (this.numMoves === 0) {
        if (randomPercentX10(Bot.adaptationStep6)) {
          this.energy -= 50;
        }
      }
    }

    return false;
  }

  public static adaptationStep: number = 0;
  public static adaptationStep2: number = 0;
  public static adaptationStep3: number = 0;
  public static adaptationStep4: number = 1000;
  public static adaptationStep5: number = OceanHeight;
  public static adaptationStep6: number = 0;
  public static adaptationStep7: number = MudLayerHeight;
  //----------------------------------------------------------------------------------------------

  // How many times bot used attack and move commands
  numAttacks: number = 0;
  numMoves: number = 0;

  // Experimental
  mutagen(): void {
    if (randomPercent(10)) {
      this.mutate();
    }
  }

  // Use neural network (feed forward)
  think(input: BrainInput): BrainOutput {

    // Stunned means the creature can not act
    if (this.stunned) {
      --this.stunned;

      return BrainOutput.GetEmptyBrain();
    }

    // Clear all neuron values
    this.brain.clear();

    // Input data
    {
      // Energy
      this.brain.allValues[NeuronInputLayerIndex][0] =
        (this.energy * 1.0) / (MaxPossibleEnergyForABot * 1.0);

      // Sight
      this.brain.allValues[NeuronInputLayerIndex][1] = input.vision;

      // Is relative?
      this.brain.allValues[NeuronInputLayerIndex][2] = input.isRelative;

      // Rotation
      this.brain.allValues[NeuronInputLayerIndex][3] =
        (this.direction * 1.0) / 7.0;

      // Height
      this.brain.allValues[NeuronInputLayerIndex][4] =
        (this.y * 1.0) / (FieldCellsHeight * 1.0);
    }

    // Compute
    this.brain.process();
    const toRet = this.brain.getOutput();
    //console.log('toRet', toRet)

    // Cannot multiply if not ready
    if (this.fertilityDelay) {
      --this.fertilityDelay;
      toRet.divide = 0;
    } else if (toRet.divide) {
      this.fertilityDelay = FertilityDelay;
    }

    return toRet;
  }

  // Bot tick function, it should always call parents tick function first
  tick(): 0 | 1 | 2 {
    if (super.tick() === 2) {
      return 2;
    }

    this.energy -= EveryTickEnergyPenalty;

    if (this.artificialSelectionWatcher()) {
      return 1;
    }

    if (this.energy <= 0 || this.lifetime >= MaxBotLifetime) {
      return 1;
    }

    return 0;
  }

  // Bot main draw function
  draw(): void {}

  // Bot draw function in energy mode
  drawEnergy(): void {}

  // Bot draw function in predators mode
  drawPredators(): void {}

  // Change rotation function
  rotate(dir: number = 1): void {
    if (dir > 0) {
      ++this.direction;
    } else {
      --this.direction;
    }

    this.direction = Math.abs(Math.floor(this.direction % 8));
  }

  // Give a bot some energy
  giveEnergy(num: number, src: EnergySource = EnergySource.unknown): void {
    this.energy += num;

    if (this.energy > MaxPossibleEnergyForABot) {
      if (BotDiesIfEnergyOverflow) {
        this.energy = 0;
        return;
      } else {
        this.energy = MaxPossibleEnergyForABot;
      }
    }

    if (src === EnergySource.PS) {
      this.energyFromPS += num;
    } else if (src === EnergySource.kills) {
      this.energyFromKills += num;
    } else if (src === EnergySource.ORGANICS) {
      this.energyFromOrganics += num;
    }
  }

  // Return current energy amount from different sources
  getEnergy(): number {
    return this.energy;
  }
  getEnergyFromPS(): number {
    return this.energyFromPS;
  }
  getEnergyFromKills(): number {
    return this.energyFromKills;
  }

  // Returns a pointer to mutation markers array
  getMarkers(): number[] {
    return this.mutationMarkers;
  }

  // Get bot color
  getColor(): [number, number, number] {
    return this.color;
  }

  // Get neural net pointer
  getNeuralNet(): Neuron[][] {
    return this.brain.allNeurons;
  }

  // Get brain
  getBrain(): BotNeuralNet {
    return this.brain;
  }

  // Get rotation
  getDirection(): Point {
    return Rotations[this.direction];
  }
  getRotationVal(): number {
    return this.direction;
  }

  // Take away bot energy, return true if 0 or below (bot dies)
  takeEnergy(val: number): boolean {
    this.energy -= val;

    return this.energy <= 0;
  }

  /**
   *  Get neuron summary(info)
   *  Format: (all integers)
   *  - simple neurons
   *  - radial basis neurons
   *  - random neurons
   *  - memory neurons (if any)
   *  - total connections
   *  - dead end neurons
   *  - total neurons
   */
  getNeuronSummary(): summary_return {
    const toRet = [0, 0, 0, 0, 0, 0, 0];
    let n: Neuron;

    for (let xi = 1; xi < NumNeuronLayers; ++xi) {
      for (let yi = 0; yi < NeuronsInLayer; ++yi) {
        n = this.brain.allNeurons[xi][yi];

        switch (n.type) {
          case NeuronType.BASIC: {
            toRet[0]++;
            break;
          }
          case NeuronType.RADIAL_BASIS: {
            toRet[1]++;
            break;
          }
          case NeuronType.RANDOM: {
            toRet[2]++;
            break;
          }
          case NeuronType.MEMORY: {
            toRet[3]++;
            break;
          }
        }

        toRet[4] += n.numConnections;

        if (n.numConnections === 0) {
          toRet[5]++;
        }
      }
    }

    return [
      toRet[0],
      toRet[1],
      toRet[2],
      toRet[3],
      toRet[4],
      toRet[5],
      NumNeuronLayers * NeuronsInLayer,
    ];
  }

  /**
   * Find out how close these two are as relatives,
   * returns number of matching mutation markers
   */
  findKinship(stranger: Bot): number {
    let numMarkers = 0;

    for (let i = 0; i < NumberOfMutationMarkers; ++i) {
      if (this.mutationMarkers[i] === stranger.mutationMarkers[i]) {
        ++numMarkers;
      }
    }

    if (numMarkers >= NumberOfMutationMarkers - HowMuchDifferenceCantBeTold) {
      numMarkers = NumberOfMutationMarkers;
    }

    return numMarkers;
  }

  // Change bot color
  repaint(newColor: [number, number, number]): void {
    this.color = newColor;
  }

  static readonly Type = ObjectTypes.BOT;

  constructor(
    X: number,
    Y: number,
    Energy: number = 100,
    prototype?: Bot,
    mutate: boolean = false
  ) {
    super(X, Y);
    // New bot
    if (!prototype) {
      this.randomizeMarkers();
    } else {
      this.brain = new BotNeuralNet(prototype.brain);
    }

    this.energy = Energy;
    this.stunned = StunAfterBirth;
    this.fertilityDelay = FertilityDelay;
    this.energyFromPS = 0;
    this.energyFromKills = 0;

    // Randomize bot brain
    if (!prototype) {
      this.brain.randomize();
    }

    // Set brain to dummy brain
    // this.brain.setDummy();

    if (prototype) {
      // Copy parent's markers and color
      this.mutationMarkers = [...prototype.mutationMarkers];
      this.nextMarker = prototype.nextMarker;
      this.color = [...prototype.color];
    } else {
      this.randomizeColor(); // random color
    }

    // Random direction
    this.randomDirection();

    // Now mutate
    if (!ForbidMutations && mutate) {
      if (UseTotalMutation && randomPercentX10(TotalMutationChancePercentX10)) {
        this.totalMutation();
      } else {
        this.mutate();
      }
    }

    this.adaptation_lastX = X;
  }

  // This function is used only after a bot was loaded from file!!
  giveInitialEnergyAndMarkers(): void {
    this.randomizeMarkers();
    this.energy = MaxPossibleEnergyForABot;
    this.stunned = StunAfterBirth;
    this.fertilityDelay = FertilityDelay;
    this.energyFromPS = 0;
    this.energyFromKills = 0;
    this.direction = 0;
    this.randomizeColor();
  }

  // Random color
  static GetRandomColor(): s_Color {
    if (PresetRandomColors) {
      const i = randomVal(presetColors.length / (3 * 4));
      return { rgb: presetColors[i] };
    }
    return { rgb: [randomVal(256), randomVal(256), randomVal(256)] };
  }
}
