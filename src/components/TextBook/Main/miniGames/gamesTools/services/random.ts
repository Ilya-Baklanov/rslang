/* eslint-disable */

function getRandomNumber(min = 0, max = 19): number {
  const minL = Math.ceil(min);
  const maxL = Math.floor(max);
  return Math.floor(Math.random() * (maxL - minL + 1)) + minL;
}

function getRandomSequence(
  mandatoryItem: number,
  poolSize: number = 20,
  resultSize: number = 4
): number[] {
  const result: number[] = Array<number>(resultSize);
  result[0] = mandatoryItem;
  for (let i = 1; i < result.length; i = i + 1) {
    let j: number;
    do {
      j = getRandomNumber(0, poolSize - 1);
    } while (result.some((e: number) => e === j));
    result[i] = j;
  }
  const i: number = getRandomNumber(0, resultSize - 1);
  if (i) {
    [result[0], result[i]] = [result[i], result[0]];
  }
  return result;
}

export { getRandomNumber, getRandomSequence };
