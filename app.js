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

// console.log(getMatrixRandomInt(3, 5, 0, 1, true, true))


const ars = [10, 23, 25, 10, 2, -3, 5, 3, -33]

ars.splice(1, 3, 1, 2, 3, 4)
// console.log(ars)

function arrayCopy(src, srcPos, dst, dstPos, length) {
  const partForPaste = src.slice(srcPos, srcPos + length)
  dst.splice(dstPos, length, ...partForPaste)
}

const array1 = [1, 2, 3, 4, 5]
const array2 = [10, 20, 30, 40, 50]

arrayCopy(array1, 0, array2, 3, 3)

// console.log(array2)

function moveElement(array, position, shift) {
  let insertPos
  if (shift > 0 && position + shift >= array.length) {
    insertPos = array.length - 1
  } else if (shift < 0 && position + shift <= 0) {
    insertPos = 0
  } else {
    insertPos = position + shift
  }
  const extractedElem = array.splice(position, 1)
  array.splice(insertPos, 0, ...extractedElem)
}

moveElement(array1, 2, 0)

// console.log(array1)

// console.log([3,6,1,3,-10,40,120,-132,123].reduce((res, cur) => cur < res ? cur : res))

console.log([3,6,1,3,-10,40,120,-132,123].reduce((res, cur) => {
  const curMin = cur < res[0] ? cur : res[0]
  const curMax = cur > res[1] ? cur : res[1]
  return [curMin, curMax]
}, [Number.MAX_VALUE, Number.MIN_VALUE]))

