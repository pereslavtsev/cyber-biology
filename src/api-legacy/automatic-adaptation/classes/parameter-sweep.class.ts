import { Vector, IPointer } from 'tstl';
import type { IParameterSweep } from '../interfaces';

export class ParameterSweep implements IParameterSweep {
  private currentTick: uint = 0;
  private beginTick: uint = 0;

  private toSweep: IPointer<int> | null = null;

  private sweepIncrement: int = 0;
  private sweepGoal: int = 0;

  private addToChartRate: uint = 0;
  private chartValPrev: uint = 0;

  private addToChart(): void {
    this.history.push_back(this.currentTick);
  }

  public sweep_counter: uint = 0;
  public sweep_rate: uint = 0;
  public waitForPopulation: uint = 0;

  public setTick(tick: uint): void {
    this.currentTick = tick;
  }

  public waitPopulation(pop: int, count: int): void {
    this.waitForPopulation = pop;
    this.sweep_counter = count;
    this.beginTick = this.currentTick;
  }

  beginSweep(p: IPointer<int>, begin: int, inc: int, goal: int, pop: int, count: int, addToChartEvery: int = 0): void {
    this.toSweep = p;
    this.sweepIncrement = inc;
    this.sweepGoal = goal;
    this.waitForPopulation = pop;
    this.chartValPrev = 0;
    this.addToChartRate = addToChartEvery;

    this.toSweep = begin;
    this.sweep_rate = count;
    this.sweep_counter = this.sweep_rate;

    this.beginTick = this.currentTick;
  }

  public checkSweep(numBots: uint): bool {
    if (this.toSweep) {
      if (
        this.sweep_counter <= 0 ||
        (numBots > this.waitForPopulation * 3 &&
          this.sweep_counter <= this.sweep_rate / 2)
      ) {
        if (numBots >= this.waitForPopulation) {
          if (this.toSweep === this.sweepGoal) {
            if (this.addToChartRate === 0) {
              this.addToChart();
            }

            this.toSweep = null;

            return true;
          }

          this.toSweep += this.sweepIncrement;

          if (this.addToChartRate > 0) {
            if (this.chartValPrev === this.addToChartRate) {
              this.chartValPrev = 0;
              this.addToChart();
            } else {
              ++this.chartValPrev;
            }
          }

          this.sweep_counter = this.sweep_rate;
        }
      } else {
        --this.sweep_counter;
      }

      return false;
    } else {
      if (numBots >= this.waitForPopulation) {
        this.addToChart();
        return true;
      }
    }

    return false;
  }

  public clear(): void {
    this.currentTick = 0;
    this.beginTick = 0;
    this.toSweep = null;
  }

  public history: Vector<uint> = new Vector();
}
