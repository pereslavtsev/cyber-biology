// Don't touch
import { Object as ObjectClass } from "../../object/classes/object.class";
import { randomPercent, randomPercentX10, randomVal } from "../../my-types";
import {
  AppleSpawnInterval,
  AttackCost,
  ControlGroupSize,
  EnergyPassedToAChild,
  FieldCellsHeight,
  FieldCellSize,
  FieldCellsWidth,
  FieldX,
  FieldY,
  FoodBaseInitial,
  GiveBirthCost,
  MaxPossibleEnergyForABot,
  MoveCost,
  MutationChancePercent,
  NoPhotosyntesisInOcean,
  NoPhotosynthesis,
  NumberOfMutationMarkers,
  OrganicWasteAlwaysFalls,
  PhotosynthesisReward_Autumn,
  PhotosynthesisReward_Summer,
  PhotosynthesisReward_Winter,
  RockCanBeEaten,
  RotateCost,
  SpawnAppleInCellChance,
  SpawnControlGroupAtStart,
  SpawnOneAtStart,
  SpawnOrganicWasteWhenBotDies,
  TileWorldHorizontally,
  UseApples,
  UseOneThread,
  UseSeasons,
} from "../../settings";
import { Bot } from "../../bot/classes/bot.class";
import { Apple } from "../../apple/classes/apple.class";
import { Organics } from "../../organics/classes/organics.class";
import { Rock } from "../../rock/classes/rock.class";
import {Season} from "../enums/season";
import {BrainInput} from "../../brain/classes/brain-input.class";
import {Point} from "../../utils/classes/point.class";
import {EnergySource} from "../../bot/enums/energy-source.enum";

/**
 * @deprecated
 */
const NumThreads = 1;

let season: Season;

/**
 * Simulation field class
 * @deprecated
 */
export class Field {
  // All cells as 2d array
  allCells: Array<Array<ObjectClass | null>> = [];

  // Needed to calculate number of active objects and bots (calculated on every frame)
  objectsTotal: number = 0;
  botsTotal: number = 0;

  // Apple spawn timer
  spawnApplesInterval: number = 0;

  // Find empty cell nearby, otherwise return {-1, -1}
  findFreeNeighbourCell(X: number, Y: number): Point {
    // If this cell is empty
    if (!this.allCells[X][Y]) {
      return new Point(X, Y);
    }

    let tmpArray: Point[] = Array.from(Array(9).keys()).map(() => new Point());
    let i = 0;

    for (let cx = -1; cx < 2; ++cx) {
      for (let cy = -1; cy < 2; ++cy) {
        const tx = this.validateX(X + cx);

        if (this.isInBounds(tx, Y + cy)) {
          if (!this.allCells[tx][Y + cy]) {
            tmpArray[i++].set(tx, Y + cy);
          }
        }
      }
    }

    // Get random free cell from array
    if (i > 0) {
      return tmpArray[randomVal(i)];
    }

    // No free cells nearby
    return new Point(-1, -1);
  }

  // How may free cells are available around given one
  findHowManyFreeCellsAround(X: number, Y: number): number {
    let toRet = 0;

    //If cell itself is empty
    if (!this.allCells[X][Y]) {
      ++toRet;
    }

    // Parse all cells
    let tx: number;

    for (let cx = -1; cx < 2; ++cx) {
      for (let cy = -1; cy < 2; ++cy) {
        tx = this.validateX(X + cx);

        if (this.isInBounds(tx, Y + cy)) {
          if (!this.allCells[tx][Y + cy]) {
            ++toRet;
          }
        }
      }
    }

    return toRet;
  }

  // tick function for single threaded build
  tick_single_thread(): void {
    this.objectsTotal = 0;
    this.botsTotal = 0;

    for (let ix = 0; ix < FieldCellsWidth; ++ix) {
      for (let iy = 0; iy < FieldCellsHeight; ++iy) {
        const tmpObj = this.allCells[ix][iy];

        if (tmpObj) {
          ++this.objectsTotal;

          if (tmpObj instanceof Bot) {
            ++this.botsTotal;
          }

          this.objectTick(tmpObj);
        }
      }
    }
  }

  // Start all threads
  // startThreads(): void {}

  // Wait for all threads to finish their calculations
  // waitForThreads(): void {}

  // Terminator function
  // [[noreturn]] static void TerminateThread() {};

  // Wait for a signal
  // threadWait(index: number): void {}

  // Number of food for photosynthesis and other means
  foodBase: number = FoodBaseInitial;

  // Move objects from one cell to another
  moveObject(fromX: number, fromY: number, toX: number, toY: number): number {
    if (!this.isInBounds(toX, toY)) {
      return -2;
    }

    if (this.allCells[toX][toY]) {
      return -1;
    }

    const tmpObj = this.allCells[fromX][fromY];

    if (tmpObj) {
      this.allCells[toX][toY] = tmpObj;
      delete this.allCells[fromX][fromY];

      tmpObj.x = toX;
      tmpObj.y = toY;

      return 0;
    }

    return -3;
  }

  moveObject2(obj: ObjectClass, toX: number, toY: number): number {
    return this.moveObject(obj.x, obj.y, toX, toY);
  }

  // Add new object
  addObject(obj: ObjectClass): boolean {
    if (this.allCells[obj.x][obj.y]) {
      return false;
    }

    this.allCells[obj.x][obj.y] = obj;
    console.log('obj', obj)

    return true;
  }

  // Remove object and delete object class
  removeObject(X: number, Y: number): void {
    this.allCells[X][Y] = null;
  }

  // Remove a bot (same as remove object but for a bot)
  removeBot(X: number, Y: number, energyVal: number = 0): void {
    this.removeObject(X, Y);

    if (SpawnOrganicWasteWhenBotDies) {
      if (energyVal > 0) {
        this.addObject(new Organics(X, Y, energyVal));
      }
    }
  }

  // Repaint bot
  repaintBot(
    b: Bot,
    newColor: [number, number, number],
    differs: number = 1
  ): void {
    for (let ix = 0; ix < FieldCellsWidth; ++ix) {
      for (let iy = 0; iy < FieldCellsHeight; ++iy) {
        const tmpObj = this.allCells[ix][iy];

        if (tmpObj && tmpObj instanceof Bot) {
          if (tmpObj.findKinship(b) >= NumberOfMutationMarkers - differs) {
            tmpObj.repaint(newColor);
          }
        }
      }
    }
  }

  // Tick function for every object,
  // Returns true if object was destroyed
  objectTick(tmpObj: ObjectClass): void {
    const t = tmpObj.tick();

    switch (t) {
      case 2: {
        return; // skip tick
      }
      case 1: {
        // Object destroyed
        if (tmpObj instanceof Bot) {
          this.removeBot(tmpObj.x, tmpObj.y, tmpObj.getEnergy());
        } else {
          this.removeBot(tmpObj.x, tmpObj.y);
        }
        return;
      }
      default: {
        switch (tmpObj.constructor) {
          case Bot: {
            // Object is a bot
            const TEMP_x1 = tmpObj.x;
            //const tmpBot = new Bot(tmpObj.x, tmpObj.y, (tmpObj as Bot).getEnergy(), tmpObj as Bot);
            const tmpBot = tmpObj as Bot;
            const lookAt = tmpBot.getDirection();

            // Fill brain input structure
            const input = new BrainInput();

            // Desired destination,
            // that is what bot is looking at
            let cx = tmpBot.x + lookAt.x;
            let cy = tmpBot.y + lookAt.y;

            cx = this.validateX(cx);

            // If destination is out of bounds
            if (!this.isInBounds(cx, cy)) {
              // 1 if unpassable
              input.vision = 1.0;
            } else {
              // Destination cell is empty
              if (!this.allCells[cx][cy]) {
                //console.log('input', input)
                // 0 if empty
                input.vision = 0.0;
              } else {
                // Destination not empty
                switch (this.allCells[cx][cy]?.constructor) {
                  case Bot: {
                    // 0.5 if someone in that cell
                    input.vision = 0.5;

                    // Calculate how close they are as relatives, based on mutation markers
                    input.isRelative =
                      1.0 -
                      (this.allCells[cx][cy] as Bot).findKinship(tmpBot) /
                        (NumberOfMutationMarkers * 1.0);
                    break;
                  }
                  case Rock: {
                    // 1.0 if cell is unpassable
                    input.vision = 1.0;
                    break;
                  }
                  case Organics: {
                    // -.5 if cell contains organics
                    input.vision = -0.5;
                    break;
                  }
                  case Apple: {
                    // -1.0 if cell contains an apple
                    input.vision = -1.0;
                    break;
                  }
                }
              }
            }

            // Bot brain does its stuff
            const tmpOut = tmpBot.think(input);
            // console.log({
            //   attack: tmpOut.attack,
            //   divide: tmpOut.divide,
            //   rotate: tmpOut.rotate,
            //   move: tmpOut.move,
            //   photosynthesis: tmpOut.photosynthesis,
            // });

            // Multiply first
            for (let b = 0; b < tmpOut.divide; ++b) {
              // Dies if energy is too low
              if (tmpBot.getEnergy() <= EnergyPassedToAChild + GiveBirthCost) {
                this.removeBot(tmpObj.x, tmpObj.y);
                return;
              } else {
                // Gives birth otherwise
                // Ignore all commented lines
                //Point freeSpace = FindFreeNeighbourCell(tmpObj->x, tmpObj->y);
                //Point freeSpace = { tmpObj->x - 1, tmpObj->y };
                //freeSpace.x = ValidateX(freeSpace.x);

                //if(allCells[freeSpace.x][freeSpace.y] != NULL)
                // freeSpace = FindFreeNeighbourCell(tmpObj->x, tmpObj->y);

                //if ((tmpOut.divideDirX == 0) && (tmpOut.divideDirY == 0))
                //{
                const freeSpace = this.findFreeNeighbourCell(
                  tmpObj.x,
                  tmpObj.y
                );

                console.log('freeSpace', tmpBot.id, freeSpace)

                if (freeSpace.x !== -1) {
                  tmpBot.takeEnergy(EnergyPassedToAChild + GiveBirthCost);
                  const newBot = new Bot(
                    freeSpace.x,
                    freeSpace.y,
                    EnergyPassedToAChild,
                    tmpBot,
                    randomPercent(MutationChancePercent)
                  );
                  this.addObject(newBot);
                  return;
                }
                /* }
                else
                {
                    //freeSpace = { tmpObj->x -1, tmpObj->y };

                    cx = tmpObj->x + tmpOut.divideDirX;
                    cy = tmpObj->y + tmpOut.divideDirY;

                    if (IsInBounds(cx, cy))
                    {
                        if (allCells[cx][cy] == NULL)
                        {
                            tmpBot->TakeEnergy(EnergyPassedToAChild + GiveBirthCost);
                            AddObject(new Bot(freeSpace.x, freeSpace.y, EnergyPassedToAChild, tmpBot, RandomPercent(MutationChancePercent)));
                            return;
                        }
                    }
                }*/
              }
            }

            // Then attack
            if (tmpOut.attack) {
              // If dies of low energy
              if (tmpBot.takeEnergy(AttackCost)) {
                this.removeBot(tmpObj.x, tmpObj.y);
                return;
              } else {
                // Get direction of attack
                const dir = tmpBot.getDirection();

                cx = this.validateX(tmpBot.x + dir.x);
                cy = tmpBot.y + dir.y;

                if (this.isInBounds(cx, cy)) {
                  // If there is an object
                  if (this.allCells[cx][cy]) {
                    if (this.allCells[cx][cy] instanceof Bot) {
                      // New rule: attack only from behind
                      /*int diff = tmpBot->GetRotationVal() - ((Bot*)allCells[cx][cy])->GetRotationVal();

                      diff = abs(diff);

                      if ((diff <= 1) || (diff >= 6))
                      {*/
                      // Kill an object
                      tmpBot.giveEnergy(
                        (this.allCells[cx][cy] as Bot).getEnergy(),
                        EnergySource.kills
                      );
                      this.removeBot(cx, cy);

                      tmpBot.numAttacks++;
                      //}
                    } else if (this.allCells[cx][cy] instanceof Organics) {
                      // Eat organics
                      tmpBot.giveEnergy(
                        (this.allCells[cx][cy] as Organics).energy,
                        EnergySource.ORGANICS
                      );
                      this.removeObject(cx, cy);
                    } else if (this.allCells[cx][cy] instanceof Apple) {
                      // Eat apple
                      tmpBot.giveEnergy(
                        (this.allCells[cx][cy] as Apple).energy,
                        EnergySource.ORGANICS
                      );
                      this.removeObject(cx, cy);
                    } else if (
                      RockCanBeEaten &&
                      this.allCells[cx][cy] instanceof Rock
                    ) {
                      // Eat rock
                      this.removeObject(cx, cy);
                    }
                  }
                }
              }
            } else {
              /*else if(tmpOut.eatOrganicWaste)
            {
                //Now eat organics
                //Get direction
                Point dir = tmpBot->GetDirection();

                cx = ValidateX(tmpBot->x + dir.x);
                cy = tmpBot->y + dir.y;

                if (IsInBounds(cx, cy))
                {
                    //If there is an object
                    if (allCells[cx][cy])
                    {
                        if (allCells[cx][cy]->type == organic_waste)
                        {
                            //Eat organics
                            tmpBot->GiveEnergy(((Organics*)allCells[cx][cy])->energy, organics);
                            RemoveObject(cx, cy);
                        }
                    }
                }
            }*/
              // Rotate after
              if (tmpOut.rotate !== 0.0) {
                // If dies of low energy
                if (tmpBot.takeEnergy(RotateCost)) {
                  this.removeBot(tmpObj.x, tmpObj.y);
                  return;
                }

                tmpBot.rotate(tmpOut.rotate);
              }

              // Move
              if (tmpOut.move) {
                if (tmpBot.takeEnergy(MoveCost)) {
                  this.removeBot(tmpObj.x, tmpObj.y);
                  return;
                }

                const dir = tmpBot.getDirection();

                cx = tmpBot.x + dir.x;
                cy = tmpBot.y + dir.y;

                cx = this.validateX(cx);

                // Place object in a new place
                if (this.moveObject2(tmpBot, cx, cy) === 0) {
                  ++tmpBot.numMoves;
                }
              }
              // Photosynthesis
              else if (tmpOut.photosynthesis) {
                if (NoPhotosynthesis) {
                  return;
                }

                // If not in ocean
                // if (tmpBot->y < FieldCellsHeight - OceanHeight)
                if (tmpBot.y < FieldCellsHeight - Bot.adaptationStep5) {
                  let toGive: number;

                  // Give energy depending on a season
                  switch (season) {
                    case Season.AUTUMN:
                    case Season.SPRING: {
                      toGive = PhotosynthesisReward_Autumn;
                      break;
                    }
                    case Season.WINTER: {
                      //toGive = (ticknum%4 == 0)?PhotosynthesisReward/8:0;
                      toGive = PhotosynthesisReward_Winter;
                      //toGive = (ticknum % 5 == 0) ? 2 : 1;
                      break;
                    }
                    case Season.SUMMER:
                    default: {
                      if (UseSeasons) {
                        toGive = PhotosynthesisReward_Summer;
                      } else {
                        toGive = this.foodBase;

                        // toGive = this.findHowManyFreeCellsAround(tmpBot.x, tmpBot.y) - 3;
                        // if (toGive < 0) toGive = 0;
                      }
                      break;
                    }
                  }

                  tmpBot.giveEnergy(toGive, EnergySource.PS);
                } else {
                  // tmpBot->GiveEnergy(foodBase/2, PS);
                  if (
                    !NoPhotosyntesisInOcean &&
                    randomPercentX10(Bot.adaptationStep4)
                  ) {
                    tmpBot.giveEnergy(this.foodBase, EnergySource.PS);
                  }
                }
              }
            }
            break;
          }
          case Organics: {
            // Organic waste should fall until it hits an obstacle
            const tmpOrg = { ...tmpObj } as Organics;

            const x = tmpOrg.x;
            const y = tmpOrg.y + 1;

            // If not done falling
            if (!tmpOrg.doneFalling) {
              // What is underneath?
              if (this.isInBounds(x, y)) {
                if (!this.allCells[x][y]) {
                  // Fall
                  this.moveObject2(tmpOrg as Organics, x, y);
                } else {
                  if (!OrganicWasteAlwaysFalls) {
                    tmpOrg.doneFalling = true;
                  }
                }
              } else {
                tmpOrg.doneFalling = true; // once done it shouldn't fall anymore
              }
            }
            break;
          }
        }
      }
    }
  }

  // Tick function
  tick(thisFrame: number): void {
    ObjectClass.CurrentFrame = thisFrame;

    if (UseApples) {
      if (this.spawnApplesInterval++ === AppleSpawnInterval) {
        this.spawnApples();

        this.spawnApplesInterval = 0;
      }
    }

    if (UseOneThread) {
      this.tick_single_thread();
    } else {
      // TODO:
      // tick_multiple_threads();
    }
  }

  // Is cell out if bounds?
  isInBounds(X: number, Y: number): boolean;
  isInBounds(X: number | Point, Y: number): boolean {
    if (X instanceof Point) {
      const p = X;
      return this.isInBounds(p.x, p.y);
    }
    return X >= 0 && Y >= 0 && X < FieldCellsWidth && Y < FieldCellsHeight;
  }

  // This function is needed to tile world horizontally (change X = -1 to X = FieldCellsWidth etc.)
  validateX(X: number): number {
    if (TileWorldHorizontally) {
      if (X < 0) {
        return Math.floor((X % FieldCellsWidth) + FieldCellsWidth);
      } else if (X >= FieldCellsWidth) {
        return Math.floor(X % FieldCellsWidth);
      }
    }

    return X;
  }

  // Is cell out of bounds, given absolute screen space coordinates
  isInBoundsScreenCoords(X: number, Y: number): boolean {
    // TODO:
    return true;
  }

  // Transform absolute screen coords to cell position on field
  screenCoordsToLocal(X: number, Y: number): Point {
    X -= FieldX;
    Y -= FieldY;

    X /= FieldCellSize;
    Y /= FieldCellSize;

    return new Point(Math.floor(X), Math.floor(Y));
  }

  // Get object at certain point on field
  getObjectLocalCoords(X: number, Y: number): ObjectClass | null {
    return this.allCells[X][Y];
  }

  // Validates if object exists
  validateObjectExistence(obj: ObjectClass): boolean {
    for (let ix = 0; ix < FieldCellsWidth; ++ix) {
      for (let iy = 0; iy < FieldCellsHeight; ++iy) {
        if (this.allCells[ix][iy] === obj) {
          return true;
        }
      }
    }

    return false;
  }

  // How many objects on field, last frame
  getNumObjects(): number {
    return this.objectsTotal;
  }

  // Same for bots
  getNumBots(): number {
    return this.botsTotal;
  }

  /*Save / load
  TODO!!!
  File format:
  4b - 0xfafa458e (magic number)
  4b - creature type
  4b - uint num layers
  4b - uint neurons in layer
  4b - sizeof (Neuron)
  following all neurons from first to last layer by layer
  */
  // bool SaveObject(Object* obj, char* filename);
  // bool LoadObject(Object* obj, char* filename);

  // Spawn group of random bots
  spawnControlGroup(): void {
    for (let i = 0; i < ControlGroupSize; ++i) {
      const tmpBot = new Bot(
        randomVal(FieldCellsWidth),
        randomVal(FieldCellsHeight),
        100
      );

      if (!this.addObject(tmpBot)) {
      }
    }
  }

  // Spawn apples
  spawnApples(): void {
    for (let ix = 0; ix < FieldCellsWidth; ++ix) {
      for (let iy = 0; iy < FieldCellsHeight; ++iy) {
        const tmpObj = this.allCells[ix][iy];

        if (!tmpObj) {
          //Take a chance to spawn an apple
          if (randomPercentX10(SpawnAppleInCellChance)) {
            this.addObject(new Apple(ix, iy));
          }
        }
      }
    }
  }

  // Create field
  constructor() {
    // Clear array
    for (let ix = 0; ix < FieldCellsWidth; ++ix) {
      if (!this.allCells[ix]) {
        this.allCells[ix] = [];
      }
      for (let iy = 0; iy < FieldCellsHeight; ++iy) {
        this.allCells[ix][iy] = null;
      }
    }

    // Spawn objects
    if (SpawnControlGroupAtStart) {
      this.spawnControlGroup();
    }

    if (SpawnOneAtStart) {
      const tmpBot = new Bot(80, 60, MaxPossibleEnergyForABot);
      this.addObject(tmpBot);
    }

    // Start threads
    // TODO:
  }

  static Seed: number;
}
