import React, { useEffect } from "react";
import { useTicTacToe } from "../context/TicTacToeContext";

const Game: React.FC = () => {
  const {
    board,
    currentPlayer,
    winner,
    dispatch,
    isTied,
    gameMode,
    playerMark,
  } = useTicTacToe();

  const handleCellClick = (index: number) => {
    if (winner || board[index]) return;

    dispatch({ type: "PLAY", payload: { index } });

    if (gameMode === "cpu" && currentPlayer === playerMark) {
      dispatch({ type: "CPU_MOVE" });
    }
  };

  useEffect(() => {
    if (winner) {
      alert(`Player ${winner} wins!`);
    } else if (isTied) {
      alert("It's a tie!");
    }
  }, [winner, isTied]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div>
        <p>Current Player: {currentPlayer}</p>
        <p>Player Mark: {playerMark}</p>
      </div>
    </div>
  );
};

export default Game;