//-----------------------------------------------------------------
//OpenGL

// #define GLSL_version "#version 130"

// #define SDL_glCont_Major 3
// #define SDL_glCont_Minor 2

//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Window
// #define WindowCaption "CyberBio v1.0.5"

export const WindowWidth = 1920;
export const WindowHeight = 1080;

// #define BackgroundColorFloat 0.0f,0.0f,0.0f,255.0f
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// System

// #define RandomSeed
//// #define Seed 0

// choose only 1 option------
export const UseOneThread = true;
export const UseFourThreads = false;
export const UseEightThreads = false;
//--------------------------

//-----------------------------------------------------------------

//-----------------------------------------------------------------
// GUI
//// #define ShowGUIDemoWindow
export const InterfaceBorder = 10;

// #define GUIWindowWidth 300

// #define ConsoleCharLength 4000 //Temporary (Forever)

// #define DefaultBrushRadius 7
// #define GUI_Max_interval 1000
// #define GUI_Max_skip 40
// #define GUI_Max_food 10
// #define GUI_Max_brush 50

// #define CursorBlinkRate 4
// #define SkipRenderingFramesWhileOnPause 10
// #define SkipGUIFramesWhenNoRender 40
//-----------------------------------------------------------------

//-----------------------------------------------------------------
//Keyboard
// #define Keyboard_Pause SDL_SCANCODE_SPACE
// #define Keyboard_SpawnRandoms SDL_SCANCODE_BACKSPACE
// #define Keyboard_NextFrame SDL_SCANCODE_KP_PLUS
// #define Keyboard_RenderNatural SDL_SCANCODE_KP_1
// #define Keyboard_RenderPredators SDL_SCANCODE_KP_2
// #define Keyboard_RenderEnergy SDL_SCANCODE_KP_3
// #define Keyboard_NoRender SDL_SCANCODE_KP_4
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Field
export const FieldBackgroundColor = [255, 255, 255, 255];

export const FieldX = InterfaceBorder;
export const FieldY = InterfaceBorder;

export const FieldCellsWidth = 192; //������ �������� �� 8 ��� ������� ���� ����� 4 ������! � �� 16 ��� ������� ���� 8 �������!
export const FieldCellsHeight = 133;

export const FieldCellSize = 8;
export const FieldCellSizeHalf = FieldCellSize / 2;
export const FieldWidth = FieldCellSize * FieldCellsWidth;
export const FieldHeight = FieldCellSize * FieldCellsHeight;

export const TileWorldHorizontally = true;
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Drawing
export const DrawBotOutline = true;
export const DrawBotHead = true;

export const BotOutlineColor = [111, 111, 111, 255]; // Blue water

// #define RockDrawColor 62, 62, 62, 255
// #define OrganicWateDrawColor 200, 200, 200, 255
export const AppleDrawColor = [0, 100, 0, 255];

export const DrawOcean = true;
export const OceanColor = [150, 150, 255, 255]; // Blue water
// export const OceanColor = [100, 255, 100, 255]; // Green water

export const DrawMudLayer = true;
export const MudColor = [140, 80, 62, 255];

// #define RenderTypeAtStart predators
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Simulation
export const SimTickIntervalAtStart = 0;
export const SkipFramesAtStart = 10;
export const StartOnPause = true;

export const SpawnOneAtStart = true; // TODO: false
export const SpawnControlGroupAtStart = false; // TODO: false
export const ControlGroupSize = 6000;
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// World rules
export const FoodBaseInitial = 4;
export const PhotosynthesisReward_Summer = 4;
export const PhotosynthesisReward_Autumn = 2;
export const PhotosynthesisReward_Winter = 1;

export const MaxPossibleEnergyForABot = 500;
export const MaxBotLifetime = 1000;
export const EnergyPassedToAChild = 50;

export const EveryTickEnergyPenalty = 0;
export const AttackCost = 4;
export const MoveCost = 1;
export const RotateCost = 0;
export const GiveBirthCost = 10; // TODO: 10

// How many turns creature cannot act after his birth
export const StunAfterBirth = 1;
// Delay before next birth
export const FertilityDelay = 0;

export const RockCanBeEaten = false;

export const SpawnOrganicWasteWhenBotDies = false;
export const OrganicWasteAlwaysFalls = true;

export const UseApples = false; // TODO: false
export const DefaultAppleEnergy = 125;
export const AppleSpawnInterval = 1;
export const SpawnAppleInCellChance = 4;

export const NoPhotosynthesis = false;
export const ForbidMutations = false;
export const MutationChancePercent = 20;
export const UseTotalMutation = false;
export const TotalMutationChancePercentX10 = 0;
//// #define RandomColorChancePercentX10 4
export const ChangeColorSlightly = true;

export const PresetRandomColors = true;
export const RandomColorEveryNewMarkersSet = false;

export const MutateNeuronsMaximum = 6;
export const MutateNeuronsSlightlyMaximum = 2;

export const UseSeasons = false;
export const ChangeSeasonInterval = 4000;

export const NumberOfMutationMarkers = 3;
export const HowMuchDifferenceCantBeTold = 1;

export const BotDiesIfEnergyOverflow = false;

export const OceanHeight = 50;
export const NoPhotosyntesisInOcean = false;

export const MudLayerHeight = 20;
//-----------------------------------------------------------------

//-----------------------------------------------------------------
//Save and load
// #define DirectoryName "SavedObjects/"

// #define FilenameMaxLen 50
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Neural nets
export const NeuronsInLayer = 5;
export const NumNeuronLayers = 6;
export const NeuronOutputLayerIndex = NumNeuronLayers - 1;
export const NeuronInputLayerIndex = 0;
export const MaxConnectionsPerNeuron = 3;

export const UseMemoryNeuron = true;
//-----------------------------------------------------------------

//-----------------------------------------------------------------
//Neural net renderer (bot brain window)
// #define Render_PositiveWeightColor 185, 0, 0
// #define Render_NegativeWeightColor 0, 0, 185
// #define Render_NeutralWeightColor 100, 100, 100

// #define Render_GreyThreshold 0.15f

// #define Render_NeuronSize 30
// #define Render_LayerDistance 100
// #define Render_VerticalDistance 60

// #define Render_LineThickness 10

// #define Render_Font "../ImGUI/misc/fonts/ProggyClean.tff"
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Population chart window
// #define ChartNumValues 250
// #define AddToChartEvery 500
//-----------------------------------------------------------------
