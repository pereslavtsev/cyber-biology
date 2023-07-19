import std, { Vector } from 'tstl';
import type { IAutomaticAdaptation } from '../interfaces';
import { ParameterSweep } from './parameter-sweep.class';

export class AutomaticAdaptation implements IAutomaticAdaptation {
  // private readonly makeAutosave: bool = false;

  private currentTick: uint;

  private inProgress: bool;

  private adaptationBeginTick: uint;
  private phaseBeginTick: uint;
  private phase: uint;
  private numPhases: uint;

  private iteration: uint;
  private numIterations: uint;

  // const char* phaseDesc = NULL;

  private history: Vector<Vector<uint>> = new Vector<Vector<uint>>([]);
  private avg_history: Vector<uint> = new Vector<uint>([]);

  private calculateHistoryAverage(): void {
    this.avg_history.clear();

    std.sort(
      this.history.begin(),
      this.history.end(),
      (v1: Vector<uint>, v2: Vector<uint>) => {
        return v1.back() < v2.back();
      },
    );

    for (let b: uint = 0; b < this.history.at(0).size(); ++b) {
      let val: uint = 0;

      for (let i: uint = 0; i < this.history.size() / 2; ++i) {
        val += this.history.at(i).at(b);
      }

      val /= <uint>(Math.round(this.history.size()) / 2);
      this.avg_history.push_back(val);
    }
  }

  private newEpoch(): void {
    ++this.iteration;

    const v = new Vector<uint>();

    this.history.push_back(v);
    sweep.history = &history.back();

    // this.printInLog("Epoch: " + to_string(iteration) + "/" + to_string(numIterations));
  }
  private finish(): void;

  private sweep: ParameterSweep = new ParameterSweep();

  private autoAdaptDivers(): void;
  private autoAdaptWinds(): void;

  // private AALog: ImGuiTextBuffer;

  private printInLog(s: string): void {
    s += "\r\n";

    // AALog.append(s.c_str());
    // sim->Print(s);
  }
  private plot(): void;

  private beginDivers(): void;
  private beginWinds(): void;

  private stop(): void {
    this.inProgress = false;
  }

  private reset(): void {
    this.sweep.clear();
    this.sim.clearWorld();
    this.params.reset();
    this.field.removeAllObjects();
    this.field.spawnControlGroup();

    this.phase = 0;
    this.phaseBeginTick = 0;
    this.currentTick = 0;
    this.adaptationBeginTick = 0;
  }

  // Field* field;
  // FieldDynamicParams* params;
  // Main* sim;

  public drawWindow(): void {
    // TODO:
  }

  public adaptationStep(frame: uint): void {

  }
}
