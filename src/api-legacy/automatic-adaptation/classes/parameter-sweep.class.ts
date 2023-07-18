import {Vector} from "tstl";

export class ParameterSweep
{
  private currentTick: uint;
  private beginTick: uint;

  private toSweep: int;

  private sweepIncrement: int;
  private sweepGoal: int;

  private addToChartRate: uint;
  private chartValPrev: uint;

  private AddToChart(): void {

  }

  public sweep_counter: uint;
  public sweep_rate: uint;
  public waitForPopulation: uint;

  public SetTick(tick): void;
  public WaitPopulation(pop: int, count: int ): void;
  public CheckSweep(numBots): bool;
  public Clear(): void;


  public history: Vector<uint>;
}
