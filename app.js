function getRandomInt(min, max, minInclusive = true, maxInclusive = false) {
  max = maxInclusive ? Math.floor(max) + 1 : Math.floor(max)
  min = minInclusive ? Math.ceil(min) : Math.ceil(min) + 1
  return min > max ? NaN : Math.floor(Math.random() * (max - min) + min)
}

function getArrayRandomInt(nNumbers, min, max, minInclusive = true, maxInclusive = false) {
  const arr = []
  arr.length = nNumbers
  return [...arr].map(() => getRandomInt(min, max, minInclusive, maxInclusive))
}

// console.log(getArrayRandomInt(100, 0, 1, true, true))

function getOrderedList(arr) {
  return `<ol>${getListItems(arr)}</ol>`
}

function getListItems(arr) {
  return arr.map((content) => `<li>${content}</li>`).join('')
}

const randBinaryArr = getArrayRandomInt(10, 0, 1, true, true)

function getColouredList(arr) {
  return `<ol class="list">${getColouredItems(arr)}</ol>`
}

function getColouredItems(arr) {
  return arr.map((num) => `<li class="square ${num === 0 ? 'black' : 'white'}"></li>`).join('')
}

// bodyId.innerHTML = getColouredList(randBinaryArr)

function getMatrixRandomInt(rows, columns, min, max, minInclusive = true, maxInclusive = false) {
  const result = []
  result.length = rows
  return [...result].map(() => getArrayRandomInt(columns, min, max, minInclusive, maxInclusive ))
}

console.log(getMatrixRandomInt(3, 5, 0, 1, true, true))
