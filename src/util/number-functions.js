export function range(min, max) {
  return Array.from({length: max - min}).map((__, index) => index + min);
}