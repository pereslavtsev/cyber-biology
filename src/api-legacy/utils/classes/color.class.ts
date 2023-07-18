import { presetColors } from '../../bot';
import { IColor } from '../interfaces';
import { randomPercent, randomVal, repeat } from '../helpers';

export class Color implements IColor {
  c: [short, short, short] = [0, 0, 0];
  change_vector: [char, char, char] = [0, 0, 0];

  set(r: number, g: number, b: number): void {
    this.c[0] = r;
    this.c[1] = g;
    this.c[2] = b;
  }

  setRandom(): void {
    if (PresetRandomColors) {
      const i = randomVal(21);

      this.c[0] = presetColors[i][0];
      this.c[1] = presetColors[i][1];
      this.c[2] = presetColors[i][2];
    } else {
      this.c[0] = randomVal(256);
      this.c[1] = randomVal(256);
      this.c[2] = randomVal(256);
    }

    this.change_vector[0] = randomVal(256);
    this.change_vector[1] = randomVal(256);
    this.change_vector[2] = randomVal(256);

    this.normalizeChangeVector();
  }

  randomChange(strMin: number, strMax: number) {
    if (randomPercent(5)) {
      this.change_vector[0] += randomVal(20);
      this.change_vector[1] += randomVal(20);
      this.change_vector[2] += randomVal(20);

      this.normalizeChangeVector();
    }

    repeat((i) => {
      let s = this.c[i];

      s += this.change_vector[i];

      if (s < 0) {
        s *= -1;
        this.change_vector[i] *= -1;
      } else if (s > 255) {
        s -= (s - 255) * 2;
        this.change_vector[i] *= -1;
      }
    }, 3);
  }

  normalizeChangeVector(): void {
    const magnitude =
      Math.sqrt(
        this.change_vector[0] * this.change_vector[0] +
          this.change_vector[1] * this.change_vector[1] +
          this.change_vector[2] * this.change_vector[2],
      ) / 18.0; // A little correction

    repeat((i) => {
      this.change_vector[i] /= magnitude;
    }, 3);
  }

  static GetRandomColor(): Color {
    const toRet = new Color();
    toRet.setRandom();
    return toRet;
  }
}
