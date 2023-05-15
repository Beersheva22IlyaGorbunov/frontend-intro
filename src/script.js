// Configuration
const DEFAULT_WORDS = ['apple', 'digit', 'class', 'order', 'mango']
const N_MOVES = 6
const N_LETTERS = 5
const a_CODE = 'a'.charCodeAt(0)
const z_CODE = 'z'.charCodeAt(0)

// API
async function getWord() {
  const API_URL = 'https://raw.githubusercontent.com/tabatkins/wordle-list/main/words'
  const textResponse = await fetch(API_URL)
  const textList = await textResponse.text()
  const wordList = textList.split('\n')
  const word = wordList[getRandomIndex(wordList)]
  return word
}

// Elements
const wordsContainer = document.getElementById('words-container-id')
const colorInput = document.getElementById('color-input-id')
const restartGameBtn = document.getElementById('restart-btn-id')
const finishText = document.getElementById('finish-text-id')
const inputLetters = document.querySelectorAll('.letter')
const cssRoot = document.querySelector(':root')

// Global variables
let moves = []
let gameWord = ''
let currentLetters = []

// Initial state
startGame()

// Functions
function game() {
  const word = currentLetters
  if (word.length != 5) {
    alert('Sorry, your word\'s length should equal to 5')
  } else if (moves.includes(word)) {
    alert('Sorry, this word is alredy used')
  } else {
    clearLetters()
    if (moves.length == 0) {
      wordsContainer.style.display = 'flex'
    }
    processWord(word)
  }
}

function clearLetters() {
  currentLetters = []
  inputLetters.forEach((input) => input.value = '')
}

function processWord(word) {
  buildNewWord(word)
  moves.push(word)
  console.log(word, gameWord)
  if (word.join('') == gameWord) {
    win()
  } else if (moves.length === N_MOVES) {
    lose()
  } else {
    inputLetters[0].focus()
  }
}

async function startGame() {
  currentLetters = []
  wordsContainer.innerHTML = ''
  wordsContainer.style.display = 'none'
  restartGameBtn.hidden = true
  finishText.hidden = true

  getWord()
    .then((word) => gameWord = word)
    .catch(() => gameWord = DEFAULT_WORDS[getRandomIndex(DEFAULT_WORDS)])

  moves = []
}

function finish() {
  restartGameBtn.innerHTML = 'Press to restart'
  restartGameBtn.hidden = false
  finishText.hidden = false
}

function win() {
  finishText.innerHTML = 'Congratulation, you are winner'
  finish()
}

function lose() {
  finishText.innerHTML = `Sorry, game is over. Answer: ${gameWord.toUpperCase()}`
  finish()
}

function buildNewWord(word) {
  const boxColors = getColors(word)
  const newWord = document.createElement('div')
  newWord.className = 'answered-word'
  boxColors.forEach((color, index) => {
    const letter = buildLetterBox(word[index], color)
    newWord.appendChild(letter)
  })
  wordsContainer.appendChild(newWord)
}

function getColors(word) {
  return word.map((letter, index) => {
    if (gameWord[index] == letter) {
      return 'green'
    } else if (gameWord.includes(letter)) {
      return 'rgb(150, 150, 33)'
    } else {
      return 'gray'
    }
  })
}

function buildLetterBox(letter, color) {
  const newLetterBox = document.createElement('div')
  newLetterBox.style.backgroundColor = color
  newLetterBox.innerHTML = letter
  return newLetterBox
}

// Listeners
restartGameBtn.addEventListener('click', startGame)
inputLetters.forEach((inputLetter) => inputLetter.addEventListener('keydown', handleKeyPress))
colorInput.addEventListener('change', handleThemeColorChange)

// Handlers
function handleKeyPress(event) {
  event.preventDefault()
  const inputIndex = +event.target.dataset.pos
  switch (event.key.toLowerCase()) {
    case 'enter': return handlePressEnter()
    case 'backspace': return handlePressBackspace(event, inputIndex)
    default: return handlePressCommonKey(event, inputIndex)
  }
}

function handlePressEnter() {
  game()
}

function handlePressBackspace(event, inputIndex) {
  if (event.target.value == '' && inputIndex > 0) {
    inputLetters[inputIndex - 1].value = ''
    inputLetters[inputIndex - 1].focus()
  } else {
    event.target.value = ''
    currentLetters[inputIndex] = ''
  }
}

function handlePressCommonKey(event, inputIndex) {
  if (isLetter(event.key.toLowerCase())) {
    event.target.value = event.key
    if (inputIndex < N_LETTERS - 1) {
      inputLetters[inputIndex + 1].focus()
    }
    currentLetters[inputIndex] = event.key
  }
}

function handleThemeColorChange(event) {
  cssRoot.style.setProperty('--main-color', event.target.value)
}

// Helpers
function isLetter(letter) {
  const code = letter.charCodeAt(0)
  return letter.length == 1 && code >= a_CODE && code <= z_CODE
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length)
}
