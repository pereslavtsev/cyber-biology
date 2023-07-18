import type { Vector } from 'tstl';

export interface IAutomaticAdaptation
{
// private:

  //const bool makeAutosave = false;

  currentTick: uint;

  inProgress: bool;

  adaptationBeginTick: uint;
  phaseBeginTick: uint;
  phase: uint;
  numPhases: uint;

  iteration: uint;
  numIterations: uint;

  // const char* phaseDesc = NULL;

  history: Vector<Vector<uint>>;
  avg_history: Vector<uint>;

  CalculateHistoryAverage(): void;

  NewEpoch(): void;
  Finish(): void;

  sweep: ParameterSweep;

  AutoAdaptDivers(): void;
  AutoAdaptWinds(): void;

  AALog: ImGuiTextBuffer;

  PrintInLog(s: string): void;
  Plot(): void;

  BeginDivers(): void;
  BeginWinds(): void;
  Stop(): void;
  Reset(): void;

  // Field* field;
  // FieldDynamicParams* params;
  // Main* sim;


// public:

  DrawWindow(): void;
  AdaptationStep(frame: uint): void;
}
