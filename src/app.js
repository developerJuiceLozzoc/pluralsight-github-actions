/**
 * Tic Tac Toe – browser UI layer.
 * Depends on game.js being available as a global (loaded via <script> tag).
 */

/* global createGame, playMove, getWinningLine */

(function () {
  'use strict';

  let state = createGame();

  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusEl = document.getElementById('status');
  const resetBtn = document.getElementById('reset-btn');

  function render() {
    cells.forEach((cell, i) => {
      cell.textContent = state.board[i] || '';
      cell.classList.remove('x', 'o', 'win');
      if (state.board[i] === 'X') cell.classList.add('x');
      if (state.board[i] === 'O') cell.classList.add('o');
    });

    if (state.winner) {
      const line = getWinningLine(state.board);
      if (line) line.forEach((i) => cells[i].classList.add('win'));
      statusEl.textContent = `Player ${state.winner} wins! 🎉`;
      statusEl.className = 'status winner';
    } else if (state.isDraw) {
      statusEl.textContent = 'It\'s a draw! 🤝';
      statusEl.className = 'status draw';
    } else {
      statusEl.textContent = `Player ${state.currentPlayer}'s turn`;
      statusEl.className = 'status';
    }
  }

  cells.forEach((cell, i) => {
    cell.addEventListener('click', () => {
      if (state.isOver || state.board[i]) return;
      state = playMove(state, i);
      render();
    });
  });

  resetBtn.addEventListener('click', () => {
    state = createGame();
    render();
  });

  render();
})();
