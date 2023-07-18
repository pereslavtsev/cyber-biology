import type { Season, RenderTypes } from '../enums';
import { IPoint } from 'pixi.js';
import type { IObject } from '../../object';
import type { IColor } from '../../utils';

export interface IField {
  // private:

  // All cells as 2d array
  allCells: IObject[][];

  // Rectangles
  // const SDL_Rect mainRect = { FieldX , FieldY, FieldWidth, FieldHeight };

  // SDL_Rect oceanRect = { FieldX , FieldY + (FieldHeight - (InitialOceanHeight * FieldCellSize)),
  // FieldWidth, InitialOceanHeight * FieldCellSize };

  // SDL_Rect mudLayerRect = { FieldX , FieldY + (FieldHeight - (InitialMudLayerHeight * FieldCellSize)),
  // FieldWidth, InitialMudLayerHeight * FieldCellSize };

  // Needed to calculate number of active objects (calculated on every frame)
  objectsTotal: uint;
  botsTotal: uint;
  applesTotal: uint;
  organicsTotal: uint;
  predatorsTotal: uint;
  averageLifetime: uint;

  spawnApplesCounter: uint;

  //Seasons
  season: Season;
  changeSeasonCounter: uint;

  seasonTick(): void;
  changeSeason(): void;

  // Multithreading
  objectCounters: uint[][];
  // atomic_flag threadsGo;
  // atomic_flag threadsReady[NumThreads];
  terminateThreads: bool;

  startThreads(): void;

  tick_single_thread(): void;
  tick_multiple_threads(): void;

  // Process function for multithreading simulation
  processPart_MultipleThreads(X1: uint, X2: uint, index: uint): void;

  // Tick function for every object
  objectTick(tmpObj: IObject): void;

  // public:

  params: FieldDynamicParams;

  shiftRenderPoint(cx: int): void;
  jumpToFirstBot(): void;
  mutateWorld(): void;
  placeWall(width: uint): void;

  // Move objects from one cell to another
  moveObject(fromX: int, fromY: int, toX: int, toY: int): int;
  moveObject(obj: IObject, toX: int, toY: int): int;

  addObject(obj: IObject): bool;
  objectAddOrReplace(obj: IObject): void;

  // Remove object and delete object class
  removeObject(X: int, Y: int): void;
  removeAllObjects(): void;

  // Remove a bot (same as remove object but for a bot)
  removeBot(X: int, Y: int, energyVal: int = 0): void;

  //Repaint bot
  RepaintBot(b: IBot, newColor: IColor, differs: int = 1): void;

  //Tick function
  tick(thisFrame: uint): void;

  // Draw simulation field with all its objects
  draw(render: RenderTypes): void;

  // Is cell out if bounds?
  isInBounds(X: int, Y: int): bool;
  isInBounds(p: IPoint): bool;

  isInWater(Y: int): bool;
  isInMud(Y: int): bool;

  // Find empty cell nearby, otherwise return {-1, -1}
  findFreeNeighbourCell(X: int, Y: int): IPoint;
  findRandomNeighbourBot(X: int, Y: int): IPoint;

  // How may free cells are available around a given one
  FindHowManyFreeCellsAround(X: int, Y: int): int;

  // This function is needed to tile world horizontally (change X = -1 to X = FieldCellsWidth etc.)
  validateX(X: int): int;
  findDistanceX(X1: int, X2: int): int;

  // Is cell out of bounds, given absolute screen space coordinates
  isInBoundsScreenCoords(X: int, Y: int): bool;

  // Transform absolute screen coords to cell position on field
  screenCoordsToLocal(X: int, Y: int): IPoint;

  getObjectLocalCoords(X: int, Y: int): IObject;

  validateObjectExistance(obj: IObject): bool;

  getNumObjects(): uint;
  getNumBots(): uint;
  getNumApples(): uint;
  getNumOrganics(): uint;
  getNumPredators(): uint;
  getAverageLifetime(): uint;

  // Spawn group of random bots
  spawnControlGroup(): void;
  spawnApples(): void;

  getSeason(): Season;
  getSeasonCounter(): uint;

  seed: int;
  renderX: int;
}
