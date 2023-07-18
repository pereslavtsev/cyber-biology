export interface ParameterSweep
{
// private:

  currentTick: uint;
  beginTick: uint;

  int* toSweep = NULL;

  sweepIncrement: int;
  sweepGoal: int;

  addToChartRate: uint;
  chartValPrev: uint;

  AddToChart(): void;

// public:

  sweep_counter: uint;
  sweep_rate: uint;
  waitForPopulation: uint;

  SetTick(tick): void;
  WaitPopulation(pop: int, count: int ): void;
  CheckSweep(numBots): bool;
   Clear(): void;


  vector<uint>* history;
}
