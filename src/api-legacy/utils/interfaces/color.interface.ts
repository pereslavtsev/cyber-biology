export interface IColor {
  c: [short, short, short];
  change_vector: [char, char, char];

  // void operator/=(int);
  // void operator+=(Color);

  set(r: int, g: int, b: int): void;
  setRandom(): void;
  randomChange(strMin: int, strMax: int): void;
  normalizeChangeVector(): void;
}
