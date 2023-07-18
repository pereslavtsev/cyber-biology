import std from 'tstl';

//-----------------------------------------------------------------
// Neural net

// Only change this
export const neuronsInLayer: uint[] = [8, 6, 6, 6, 6, 8];

export const NumNeuronsInLayerMax: uint = neuronsInLayer[0];
export const NumInputNeurons: uint = neuronsInLayer[0];
export const NumNeuronLayers: uint = <uint>std.size(neuronsInLayer);

export const NeuronOutputLayerIndex: uint = NumNeuronLayers - 1;
export const NeuronInputLayerIndex: uint = 0;

export const NumHiddenNeurons: uint = neuronsInLayer[1];
export const NumOutputNeurons: uint = neuronsInLayer[NeuronOutputLayerIndex];

export const NumNeuronsTotal: uint =
  NumInputNeurons + NumOutputNeurons + NumHiddenNeurons * (NumNeuronLayers - 2);

export const FullyConnected = false;

export const MaxConnections_Basic = 3;
export const MaxConnections_Input = 3;
export const MaxConnections_Random = 1;
export const MaxConnections_RadialBasis = 3;
export const MaxConnections_Memory = 3;

export const UseMemoryNeuron = true;
export const UseRandomNeuron = true;

export const BiasMultiplier = 0.01;
export const BiasValueCorrespondingTo_1 = 100;

export const NeuronBiasMin = -100;
export const NeuronBiasMax = 100;

export const ChangeBiasMax = 10;
export const ChangeBiasMin = 2;

export const WeightMultiplier = 0.02;
export const WeightValueCorrespondingTo_1 = 50;

export const ChangeConnectionWeightMax = 5;
export const ChangeConnectionWeightMin = 1;

export const ConnectionWeightMin = -100;
export const ConnectionWeightMax = 100;

export const MutateNeuronsMaximum = NumNeuronsTotal / 6; // (NumNeuronsTotal/8) is acceptable too

//-----------------------------------------------------------------
