import {
  MaxConnections_Basic,
  MaxConnections_Input,
  MaxConnections_Memory,
  MaxConnections_RadialBasis,
  MaxConnections_Random,
} from '../settings';

export const MaxConnectionsPerNeuronType: int[] = [
  MaxConnections_Basic,
  MaxConnections_Input,
  0,
  MaxConnections_Random,
  MaxConnections_RadialBasis,
  MaxConnections_Memory,
];
