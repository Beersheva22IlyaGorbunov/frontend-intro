// Configuration
const N_MOVES = 3

// Elements
const colorInput = document.getElementById('color-input-id')
const chooseBtn = document.getElementById('choose-color-btn-id')
const restartBtn = document.getElementById('restart-btn-id')
const colorBox = document.getElementById('color-box-id')
const finishText = document.getElementById('finish-text-id')
const css = document.querySelector(':root')

// Global variables
let moveCount = 0

// Initial state
startGame()

// Functions
function game() {
  const nextColor = colorInput.value
  setColor(nextColor)
  moveCount++
  colorInput.value = ''
  restartBtn.innerHTML = `${N_MOVES - moveCount} attempts left`
  if (moveCount === N_MOVES) {
    finish()
  }
}

function startGame() {
  moveCount = 0
  css.style.setProperty('--main-color', 'gray')
  finishText.innerHTML = ''
  finishText.hidden = true
  restartBtn.innerHTML = `${N_MOVES - moveCount} attempts left`
  chooseBtn.disabled = false
  colorInput.disabled = false
}

function finish() {
  restartBtn.innerHTML = 'Press to restart'
  finishText.innerHTML = 'Congratulation, game is over'
  chooseBtn.disabled = true
  colorInput.disabled = true
}

function setColor(color) {
  if (!isColor(color)) {
    css.style.setProperty('--main-color', 'gray')
  } else {
    css.style.setProperty('--main-color', color)
  }
}

function isColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  console.log(strColor, s.color)
  return s.color !== '';
}

// Listeners
chooseBtn.addEventListener('click', game)
restartBtn.addEventListener('click', startGame)
colorInput.addEventListener('keypress', handleKeyPress)

// Handlers
function handleKeyPress(event) {
  if (event.key.toLowerCase() == 'enter') {
    game()
  }
}