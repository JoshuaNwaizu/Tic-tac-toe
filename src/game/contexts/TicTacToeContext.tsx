import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  calculateWinner,
  getCpuMove,
  isBoardFull,
} from "../components/gameFunctions";
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
  isMarkSelected: boolean;
  isBoardDisabled?: boolean;
  isShowModal?: boolean;
  lastPlayer: string | null;
}

interface reducerAction {
  type: string;
  payload?: any;
}
interface TicTacToeContextType extends TicTacToeState {
  dispatch: Dispatch<reducerAction>;
}

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
  isMarkSelected: false,
  isBoardDisabled: false,
  isShowModal: false,
  lastPlayer: null,
};

const reducer = (state: TicTacToeState, action: reducerAction) => {
  switch (action.type) {
    case "PLAY": {
      const { index } = action.payload; // Ensure the payload has the correct key
      const board = [...state.board];
      if (board[index] || state.winner) return state; // Prevent overwriting cells or playing after a win
      board[index] = state.currentPlayer; // Update the board with the current player's mark

      const { winner, winningCells } = calculateWinner(board);
      const isTied = !winner && isBoardFull(board);

      let score: Score = { ...state.score };
      if (winner) {
        score[winner as keyof Score]++;
      } else if (isTied && !state.isTied) {
        score.tied++;
      }

      return {
        ...state,
        board,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X", // Switch players
        winner,
        score,
        isTied,
        winningCells,
        lastPlayer: state.currentPlayer,
      };
    }

    case "CPU_MOVE": {
      if (state.gameMode !== "cpu" || state.winner) return state;

      const board: string[] = [...state.board];
      const cpuMark = state.playerMark === "X" ? "O" : "X"; // CPU's mark is opposite of the player's
      const cpuMove = getCpuMove(board);
      if (cpuMove !== null) {
        board[cpuMove] = cpuMark; // Update the board with the CPU's move
      }

      const { winner, winningCells } = calculateWinner(board);
      const isTied = !winner && isBoardFull(board);

      let score: Score = { ...state.score };
      if (winner) {
        score[winner as keyof Score]++;
      } else if (isTied && !state.isTied) {
        score.tied++;
      }

      return {
        ...state,
        board,
        currentPlayer: state.playerMark, // Switch back to the player's turn
        winner,
        score,
        isTied,
        winningCells,
        isBoardDisabled: false, // Re-enable the board after the CPU moves
        lastPlayer: cpuMark,
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
    case "IS_BOARD_DISABLED": {
      return {
        ...state,
        isBoardDisabled: action.payload,
      };
    }
    case "SET_MARK":
      const { mark } = action.payload;
      return {
        ...state,
        playerMark: mark,
        currentPlayer: "X",
        isMarkSelected: true,
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
        lastPlayer: null,
      };
    }
    case "IS_SHOW_MODAL": {
      return {
        ...state,
        isShowModal: action.payload,
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
        lastPlayer: null,
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
    isMarkSelected,
    isBoardDisabled,
    isShowModal,
    lastPlayer,
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
        isMarkSelected,
        isBoardDisabled,
        isShowModal,
        lastPlayer,
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
