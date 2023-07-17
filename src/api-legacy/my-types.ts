/**
 * Get random number (0 to max - 1)
 * @deprecated
 */
export function randomVal(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 * Roll for probability (chance in percents)
 * @deprecated
 */
export function randomPercent(val: number): boolean {
  return randomVal(1000) >= 1000 - val * 10;
}

/**
 * Roll for probability (chance in 1/10 percent)
 * @deprecated
 */
export function randomPercentX10(val: number): boolean {
  return Math.floor(Math.random() * 1000) >= 1000 - val;
}

export function randomValRange(min: number, max: number) {
  return min + (rand() % (max - min));
}

/**
 * Simple cycle
 * @deprecated
 */
export function repeat(callback: (i: number) => void, times: number) {
  for (let i = 0; i < times; ++i) {
    callback(i);
  }
}

/**
 * C++ rand()
 * @deprecated
 */
export function rand() {
  return randomVal(32767);
}
