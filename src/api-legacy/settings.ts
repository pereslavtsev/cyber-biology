

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
