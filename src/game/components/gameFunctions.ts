type CellValue = string | null;

const isBoardFull = (board: string[]): boolean => {
  return board.every((cell) => cell !== null);
};

const calculateWinner = (
  board: string[],
): { winner: string | null; winningCells: number[] | null } => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningCells: [a, b, c] };
    }
  }
  return { winner: null, winningCells: null };
};

const findWinningMove = (board: CellValue[], player: string): number | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    const cells = [board[a], board[b], board[c]];
    const nullIndex = cells.indexOf(null);

    if (
      nullIndex !== -1 &&
      cells.filter((cell) => cell === player).length === 2
    ) {
      const moveIndex = [a, b, c][nullIndex];

      return moveIndex;
    }
  }

  return null;
};

const getCpuMove = (board: string[]): number | null => {
  // Check for a winning move for the CPU (player "O")
  const winningMove = findWinningMove(board, "O");
  if (winningMove !== null) return winningMove;

  // Block the opponent's winning move (player "X")
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove !== null) return blockingMove;

  // Take any available space if no winning or blocking move is found
  const emptyCells = board
    .map((cell, idx) => (cell === null ? idx : null))
    .filter((idx): idx is number => idx !== null);

  if (emptyCells.length > 0) {
    const randomMove =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    return randomMove;
  }

  return null;
};

export { isBoardFull, calculateWinner, findWinningMove, getCpuMove };
