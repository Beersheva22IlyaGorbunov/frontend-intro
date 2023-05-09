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

function myParseInt(string, radix) {
  if (radix < 2 || radix > 36) {
    return NaN
  }

  let isNegative = false
  if (string.charAt(0) == '-') {
    isNegative = true
    string = string.substring(1)
  }
  
  string = string.toLowerCase()

  const result = isNegative ? -calculateResult(string, radix) : calculateResult(string, radix)
  return result
}

function calculateResult(string, radix) {
  let result = 0
  let inRadix = true
  let i = 0
  while (inRadix && i < string.length) {
    const current = getNumber(string.charAt(i), radix)
    if (!isNaN(current)) {
      result = result * radix + current
      i++
    } else {
      inRadix = false
    }
  }
  return i > 0 ? result : NaN
}

function getNumber(string, radix) {
  const ASCII_A = 'a'.charCodeAt(0)
  const LETTERS_PART_LENGTH = radix - 10
  const ASCII_LAST_CHAR = String.fromCharCode(ASCII_A + LETTERS_PART_LENGTH).charCodeAt(0)
  let digit = NaN

  if (string >= 0 && string < radix) {
    digit = +string
  } else {
    if (ASCII_A <= string.charCodeAt(0) && string.charCodeAt(0) <= ASCII_LAST_CHAR) {
      digit = string.charCodeAt(0) - ASCII_A + 10
    }
  }
  return digit
}

console.log(myParseInt('--123213A', 25))
console.log(myParseInt('-123213AV123', 25))

console.log(parseInt('-123213AV123', 25))
