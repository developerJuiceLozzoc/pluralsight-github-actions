const { createGame, playMove, getWinner, getWinningLine, resetGame, PLAYERS } = require('./game');

describe('createGame', () => {
  it('returns an empty board with 9 cells', () => {
    const state = createGame();
    expect(state.board).toHaveLength(9);
    expect(state.board.every((c) => c === null)).toBe(true);
  });

  it('starts with player X', () => {
    expect(createGame().currentPlayer).toBe('X');
  });

  it('starts with no winner and game not over', () => {
    const state = createGame();
    expect(state.winner).toBeNull();
    expect(state.isDraw).toBe(false);
    expect(state.isOver).toBe(false);
  });
});

describe('playMove', () => {
  it('places the current player symbol on the board', () => {
    const state = playMove(createGame(), 0);
    expect(state.board[0]).toBe('X');
  });

  it('switches player after a move', () => {
    const state = playMove(createGame(), 0);
    expect(state.currentPlayer).toBe('O');
  });

  it('does not allow overwriting an occupied cell', () => {
    let state = playMove(createGame(), 4);
    const before = state.board.slice();
    state = playMove(state, 4);
    expect(state.board).toEqual(before);
  });

  it('does not mutate the original state', () => {
    const original = createGame();
    playMove(original, 0);
    expect(original.board[0]).toBeNull();
  });

  it('does nothing when the game is already over', () => {
    // X wins top row
    let state = createGame();
    [0, 3, 1, 4, 2].forEach((i) => { state = playMove(state, i); });
    const overState = state;
    const afterAttempt = playMove(overState, 6);
    expect(afterAttempt).toBe(overState);
  });
});

describe('getWinner', () => {
  it('returns null on an empty board', () => {
    expect(getWinner(createGame().board)).toBeNull();
  });

  it('detects a row win for X', () => {
    let state = createGame();
    [0, 3, 1, 4, 2].forEach((i) => { state = playMove(state, i); });
    expect(state.winner).toBe('X');
  });

  it('detects a column win for O', () => {
    // O wins column 0: cells 0, 3, 6
    let state = createGame();
    [1, 0, 2, 3, 4, 6].forEach((i) => { state = playMove(state, i); });
    expect(state.winner).toBe('O');
  });

  it('detects a diagonal win', () => {
    let state = createGame();
    [0, 1, 4, 2, 8].forEach((i) => { state = playMove(state, i); });
    expect(state.winner).toBe('X');
  });
});

describe('draw detection', () => {
  it('marks the game as a draw when the board is full with no winner', () => {
    // X O X
    // X X O
    // O X O  — no winner
    let state = createGame();
    [0, 1, 2, 5, 3, 6, 4, 8, 7].forEach((i) => { state = playMove(state, i); });
    expect(state.isDraw).toBe(true);
    expect(state.winner).toBeNull();
    expect(state.isOver).toBe(true);
  });
});

describe('getWinningLine', () => {
  it('returns null when there is no winner', () => {
    expect(getWinningLine(createGame().board)).toBeNull();
  });

  it('returns the correct winning indices', () => {
    let state = createGame();
    [0, 3, 1, 4, 2].forEach((i) => { state = playMove(state, i); });
    expect(getWinningLine(state.board)).toEqual([0, 1, 2]);
  });
});

describe('resetGame', () => {
  it('returns a fresh initial state', () => {
    let state = playMove(playMove(createGame(), 0), 1);
    state = resetGame();
    expect(state).toEqual(createGame());
  });
});

describe('PLAYERS', () => {
  it('contains exactly X and O', () => {
    expect(PLAYERS).toEqual(['X', 'O']);
  });
});
