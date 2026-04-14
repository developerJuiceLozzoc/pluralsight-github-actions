/**
 * Tic Tac Toe – core game logic (framework-agnostic, CommonJS module).
 */

const EMPTY = null;
const PLAYERS = ['X', 'O'];

// Winning combinations: indices into the 9-cell board array
const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Create a fresh game state object.
 * @returns {Object} initial game state
 */
function createGame() {
  return {
    board: Array(9).fill(EMPTY),
    currentPlayer: PLAYERS[0],
    winner: null,
    isDraw: false,
    isOver: false,
  };
}

/**
 * Attempt to play a move at the given cell index.
 * Returns a new state object; the original is not mutated.
 *
 * @param {Object} state  - current game state
 * @param {number} index  - cell index (0-8)
 * @returns {Object} next game state
 */
function playMove(state, index) {
  if (state.isOver) return state;
  if (state.board[index] !== EMPTY) return state;

  const board = state.board.slice();
  board[index] = state.currentPlayer;

  const winner = getWinner(board);
  const isOver = winner !== null || board.every((cell) => cell !== EMPTY);
  const isDraw = isOver && winner === null;
  const currentPlayer =
    isOver ? state.currentPlayer : PLAYERS[(PLAYERS.indexOf(state.currentPlayer) + 1) % 2];

  return { board, currentPlayer, winner, isDraw, isOver };
}

/**
 * Return the winning player symbol or null.
 * @param {Array} board
 * @returns {string|null}
 */
function getWinner(board) {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * Return the winning line indices, or null if there is no winner.
 * @param {Array} board
 * @returns {number[]|null}
 */
function getWinningLine(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return line;
    }
  }
  return null;
}

/**
 * Reset the game back to its initial state.
 * @returns {Object}
 */
function resetGame() {
  return createGame();
}

module.exports = { createGame, playMove, getWinner, getWinningLine, resetGame, WIN_LINES, PLAYERS };
