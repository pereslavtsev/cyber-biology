export interface IBrainInput {
  get energy(): float,
  get age(): float,
  get rotation(): float,
  get height(): float, // Y coordinate
  get area(): float, // is in ocean/mud?
  get eye1(): float, // Sight
  get eye1_isrelative(): float,
  get eye_islookingatme(): float;
  //get eye2(): float;	// Second sight cell

  readonly fields: [float, float, float, float, float, float, float, float];
}
