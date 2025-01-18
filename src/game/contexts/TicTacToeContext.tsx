import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
interface Score {
  X: number;
  O: number;
  tied: number;
}

interface TicTacToeState {
  board: string[];
  currentPlayer: string;
  winner: string | null;
  score: Score;
  isTied: boolean;
  gameMode: "player" | "cpu";
  winningCells: number[] | null;
  isModal: boolean;
  playerMark: "X" | "O";
  showRestartModal: boolean;
}

interface reducerAction {
  type: string;
  payload?: any;
}
interface TicTacToeContextType extends TicTacToeState {
  dispatch: Dispatch<reducerAction>;
}
type CellValue = string | null;

const TicTacToeContext = createContext<TicTacToeContextType | undefined>(
  undefined,
);

const LOCAL_STORAGE_KEY = "ticTacToeState";

const loadState = (): TicTacToeState => {
  const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedState ? JSON.parse(savedState) : initialState;
};

const initialState: TicTacToeState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  score: {
    X: 0,
    O: 0,
    tied: 0,
  },
  isTied: false,
  gameMode: "player",
  winningCells: null,
  isModal: false,
  playerMark: "X",
  showRestartModal: false,
};

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

      if (typeof moveIndex === "number") {
        return moveIndex;
      }
    }
  }

  return null;
};

const getCpuMove = (board: string[]): number | null => {
  const winningMove = findWinningMove(board, "O");
  if (winningMove !== null) return winningMove;

  // Block opponent's winning move
  const blockingMove = findWinningMove(board, "X");
  if (blockingMove !== null) return blockingMove;

  // Take center if available
  if (board[4] === null) return 4;

  // Take corners if available
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter((corner) => board[corner] === null);
  if (availableCorners.length > 0) {
    return availableCorners[
      Math.floor(Math.random() * availableCorners.length)
    ];
  }

  // Take any available space
  const emptyCells = board
    .map((cell, idx) => (cell === null ? idx : null))
    .filter((idx): idx is number => idx !== null);

  return emptyCells.length > 0
    ? emptyCells[Math.floor(Math.random() * emptyCells.length)]
    : null;
};

const reducer = (state: TicTacToeState, action: reducerAction) => {
  switch (action.type) {
    case "PLAY": {
      const { index } = action.payload;
      const board = [...state.board];
      if (board[index] || state.winner) return state;
      board[index] = state.currentPlayer;
      const { winner, winningCells } = calculateWinner(board);
      const isTied = !winner && isBoardFull(board);

      let score: Score = { ...state.score };
      if (winner) {
        score[winner as keyof Score]++;
      } else if (isTied) {
        score.tied++;
      }

      return {
        ...state,
        board,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner,
        score,
        isTied,
        winningCells,
      };
    }
    case "CPU_MOVE": {
      if (state.gameMode !== "cpu" || state.winner) return state;

      const board: string[] = [...state.board];
      const cpuMove = getCpuMove(board);
      if (cpuMove !== null) {
        board[cpuMove] = "O";
      }

      const { winner, winningCells } = calculateWinner(board);
      const isTied = !winner && isBoardFull(board);

      let score: Score = { ...state.score };
      if (winner) {
        score[winner as keyof Score]++;
      } else if (isTied) {
        score.tied++;
      }
      return {
        ...state,
        board,
        currentPlayer: "X",
        winner,
        score,
        isTied,
        winningCells,
      };
    }
    case "MODAL": {
      return {
        ...state,
        isModal: !state.isModal,
      };
    }
    case "RESTART_MODAL":
      return {
        ...state,
        showRestartModal: action.payload,
      };
    case "SET_MARK":
      const { mark } = action.payload;
      return {
        ...state,
        playerMark: mark,
        currentPlayer: mark,
        gameMode: state.gameMode,
      };

    case "SET_CURRENT_PLAYER":
      return {
        ...state,
        currentPlayer: action.payload,
      };

    case "RESTART": {
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: state.winner === "X" ? "O" : "X",
        winner: null,
        winningCells: null,
      };
    }
    case "RESET": {
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: state.winner === "X" ? "O" : "X",
        winner: null,
        winningCells: null,
        score: {
          X: 0,
          O: 0,
          tied: 0,
        },
        isTied: false,
      };
    }
    case "SET_MODE": {
      return {
        ...state,
        gameMode: action.payload.mode,
      };
    }

    default:
      return state;
  }
};
const TicTacToeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadState());
  const {
    board,
    currentPlayer,
    winner,
    score,
    isTied,
    gameMode,
    winningCells,
    isModal,
    playerMark,
    showRestartModal,
  } = state;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  return (
    <TicTacToeContext.Provider
      value={{
        board,
        currentPlayer,
        winner,
        dispatch,
        score,
        isTied,
        gameMode,
        winningCells,
        isModal,
        playerMark,
        showRestartModal,
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};
const useTicTacToe = (): TicTacToeContextType => {
  const context = useContext(TicTacToeContext);
  if (!context) {
    throw new Error("TicTacToe must be used within a TicTacToeProvider");
  }
  return context;
};

export { TicTacToeProvider, useTicTacToe };
