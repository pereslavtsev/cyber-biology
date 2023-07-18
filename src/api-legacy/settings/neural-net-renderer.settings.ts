//-----------------------------------------------------------------
// Neural net renderer (bot brain window)

export const Render_PositiveWeightColor = [185, 0, 0];
export const Render_NegativeWeightColor = [0, 0, 185];
export const Render_NeutralWeightColor = [100, 100, 100];

export const Render_GreyThreshold = [0.15];

export const Render_NeuronSize = 30;
export const Render_LayerDistance = 100;
export const Render_VerticalDistance = 60;

export const Render_LineThickness = 7;

export const inputLayerCaptions: string[] = [
  'energy',
  'age',
  'rotation',
  'height',
  'area',
  'eye1',
  'is relative',
  'is looking at me',
  //"eye2"
];

export const outputLayerCaptions: string[] = [
  'desired_rotation_x',
  'desired_rotation_y',

  'move',
  'photosynthesis',
  'attack',
  'digestOrganics',

  'divide_num',
  'divide_energy',
];

//-----------------------------------------------------------------
