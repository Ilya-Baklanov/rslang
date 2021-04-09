export default function getRandomNumber(min = 0, max = 19): number {
  const minL = Math.ceil(min);
  const maxL = Math.floor(max);
  return Math.floor(Math.random() * (maxL - minL + 1)) + minL;
}
