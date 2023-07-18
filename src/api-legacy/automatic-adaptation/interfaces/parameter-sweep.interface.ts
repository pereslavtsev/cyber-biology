import {Vector} from "tstl";

export interface ParameterSweep
{
// private:

  currentTick: uint;
  beginTick: uint;

  toSweep: int;

  sweepIncrement: int;
  sweepGoal: int;

  addToChartRate: uint;
  chartValPrev: uint;

  addToChart(): void;

// public:

  sweep_counter: uint;
  sweep_rate: uint;
  waitForPopulation: uint;

  SetTick(tick): void;
  WaitPopulation(pop: int, count: int ): void;
  CheckSweep(numBots): bool;
   Clear(): void;


  history: Vector<uint>;
}
