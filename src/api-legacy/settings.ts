//-----------------------------------------------------------------
//OpenGL

// #define GLSL_version "#version 130"

// #define SDL_glCont_Major 3
// #define SDL_glCont_Minor 2

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
//Save and load
// #define DirectoryName "SavedObjects/"

// #define FilenameMaxLen 50
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

const inputLayerCaptions =
  {
    "energy",
    "age",
    "rotation",
    "height",
    "area",
    "eye1",
    "is relative",
    "is looking at me"
    //"eye2"
  };

const outputLayerCaptions =
  {
    "desired_rotation_x",
    "desired_rotation_y",

    "move",
    "photosynthesis",
    "attack",
    "digestOrganics",

    "divide_num",
    "divide_energy"
  };
