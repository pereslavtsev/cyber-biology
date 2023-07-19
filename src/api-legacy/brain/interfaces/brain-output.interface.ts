export interface IBrainOutput {
  get desired_rotation_x(): int;
  get desired_rotation_y(): int;

  get move(): int;
  get photosynthesis(): int;
  get attack(): int;
  get digestOrganics(): int;

  get divide_num(): int;
  get divide_energy(): int;

  readonly fields: [int, int, int, int, int, int, int, int];
}
