import std, { Vector } from 'tstl';
import type { IAutomaticAdaptation } from '../interfaces';
import { ParameterSweep } from './parameter-sweep.class';
import {BotMaxEnergyInitial, FieldCellsWidth} from "../../settings";
import {Field} from "../../field";

export class AutomaticAdaptation implements IAutomaticAdaptation {
  constructor(f: Field, m: Main) {
    this.field = f;
    this.params = f.params;
    this.sim = m;
  }

  // private readonly makeAutosave: bool = false;

  private currentTick: uint = 0;

  private inProgress: bool;

  private adaptationBeginTick: uint = 0;
  private phaseBeginTick: uint = 0;
  private phase: uint = 0;
  private numPhases: uint = 0;

  private iteration: uint = 0;
  private numIterations: uint = 0;

  private phaseDesc: string | null = null;

  private history: Vector<Vector<uint>> = new Vector<Vector<uint>>([]);
  private avg_history: Vector<uint> = new Vector<uint>([]);

  // done
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


  private finish(): void {
    this.phaseDesc = null;
    this.printInLog("Done!");

    if (this.iteration === this.numIterations)
    {
      this.printInLog("All epochs are done");

      if(this.numIterations > 1) {
        this.calculateHistoryAverage();
      }

      this.inProgress = false;
      this.sim.pause();
    }
    // else
    // {
    //   (*this.*Reset_func)();
    // }
  }

  private sweep: ParameterSweep = new ParameterSweep();

  private autoAdaptDivers(): void;
  private autoAdaptWinds(): void;

  // private AALog: ImGuiTextBuffer;

  private printInLog(s: string): void {
    s += "\r\n";

    // AALog.append(s.c_str());
    // sim->Print(s);
  }
  private plot(): void {
    // TODO:
  }

  private beginDivers(): void {
    this.reset();

    if (BotMaxEnergyInitial < 300)
    {
      this.printInLog("BotMaxEnergyInitial should be at least 300!");

      return;
    }

    if (FieldCellsWidth < 4000)
    {
      this.printInLog("FieldCellsWidth should be > 4000!");

      return;
    }

    this.printInLog("[Divers] Started...");

    this.inProgress = true;
    this.numPhases = 11;
    // AA_func = &AutomaticAdaptation::AutoAdaptDivers;
    // Reset_func = &AutomaticAdaptation::BeginDivers;
    // params->PSreward = 25;

    this.field.placeWall();

    this.sweep.waitPopulation(10000, 100);

    this.nextPhase();
  }
  private beginWinds(): void {

  }

  private nextPhase(desc: string): void {
    if (this.phase == 0)
    {
      this.newEpoch();
    }

    ++this.phase;
    this.phaseDesc = desc;

    let s: string = "Phase " + to_string(phase);
    s += "/" + to_string(numPhases);
    s += " ticks: " + to_string(currentTick - phaseBeginTick);

    this.printInLog(s);
  }

  // done
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
