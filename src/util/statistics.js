// Gets array with structure [{[field]: number, ...}, ...]
export function getOccurencies(arr, field, step) {
  return arr.reduce((stat, elem) => {
    const intervalStart = Math.trunc(elem[field] / step) * step;
    return {
      ...stat,
      [intervalStart]: stat[intervalStart] == undefined ? 1 : stat[intervalStart] + 1
    }
  },{})
}

export function getOccurenciesInArr(arr, field, step) {
  const inObjStat = getOccurencies(arr, field, step);
  return Object.entries(inObjStat).map((interval) => ({
    min: +interval[0],
    max: +interval[0] + step,
    amount: +interval[1]
  }))
}