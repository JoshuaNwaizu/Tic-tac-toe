// src/types/index.ts

export interface Score {
  X: number;
  O: number;
  tied: number;
}

export interface TicTacToeState {
  board: string[];
  currentPlayer: string;
  winner: string | null;
  score: Score;
  isTied: boolean;
  gameMode: "player" | "cpu";
  winningCells: number[] | null;
  isModal: boolean;
  playerMark: "X" | "O";
  cpuMark: "X" | "O"; // Added CPU mark
  showRestartModal: boolean;
}

export interface reducerAction {
  type: string;
  payload?: any;
}

export interface TicTacToeContextType extends TicTacToeState {
  dispatch: Dispatch<reducerAction>;
}

export type CellValue = string | null;