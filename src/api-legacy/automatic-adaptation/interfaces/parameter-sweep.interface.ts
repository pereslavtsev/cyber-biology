import type { Vector, IPointer } from 'tstl';

export interface IParameterSweep {
  sweep_counter: uint;
  sweep_rate: uint;
  waitForPopulation: uint;

  setTick(tick: uint): void;
  waitPopulation(pop: int, count: int): void;
  beginSweep(p: IPointer<int>, begin: int, inc: int, goal: int, pop: int, count: int, addToChartEvery?: int): void;
  checkSweep(numBots: uint): bool;
  clear(): void;

  history: Vector<uint>;
}
