const body = document.getElementById('body-id')
const BOARD_ROWS = 8
const BOARD_COLS = 8

function getBoard() {
  const board = []
  for (let i = 0; i < BOARD_ROWS; i++) {
    board.push(getLine(i % 2 == 0))
  }
  return `<div class="board">${board.join('')}</div>`
}

function getLine(isEven) {
  const line = []
  for (let i = 0; i < BOARD_COLS; i++) {
    line.push(i % 2 == isEven ? 'black' : 'white')
  }
  return `<div class="line">${getCells(line)}</div>`
}

function getCells(lineArr) {
  return lineArr.map((color) => `<div class="${color}"></div>`).join('')
}

body.innerHTML = getBoard()
