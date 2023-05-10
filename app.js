function myToStringInt(number, radix) {
  const sign = number < 0 ? '-' : ''
  number = Math.abs(number)
  number = Math.round(number)


  let result = ''

  do {
    result = getSymbol(number % radix) + result
    number = Math.trunc(number / radix)
  } while (number > 0)

  return sign + result
}

function getSymbol(number) {
  const ASCII_DELTA = 'a'.charCodeAt(0) - 10
  return number < 10 ? number : String.fromCharCode(number + ASCII_DELTA)
}

// console.log((-160.3).toString(16))
// console.log(myToStringInt(-160.3, 16))

function myParseInt(string, redix) {
  string = string.toLowerCase().trim()

  let isNegative = false
  if (string.charAt(0) == '-') {
    isNegative = true
    string = string.substring(1)
  }

  if (redix === undefined) {
    redix = getRedix(string)
  }

  if (redix < 2 || redix > 36) {
    return NaN
  }

  if (redix === 16 && string.substring(0,2) === '0x') {
    string = string.substring(2)
  }

  const result = isNegative ? -calculateResult(string, redix) : calculateResult(string, redix)
  return result
}

function calculateResult(string, redix) {
  let result = 0
  let i = 0
  let current
  while (i < string.length && !isNaN(current = getNumber(string.charAt(i), redix))) {
      result = result * redix + current
      i++
  }
  return i > 0 ? result : NaN
}

function getNumber(string, redix) {
  const ASCII_A = 'a'.charCodeAt(0) - 10
  const symbol = string.charAt(0)
  const digit = symbol >= '0' && symbol <= '9' ? +symbol : symbol.charCodeAt(0) - ASCII_A
  return digit >= 0 && digit < redix ? digit : NaN
}

function getRedix(string) {
  return string.startsWith('0x') ? 16 : 10
}

console.log(myParseInt('-10'))

console.log(null === 0)
