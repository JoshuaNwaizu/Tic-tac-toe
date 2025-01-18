import { useParams } from "react-router";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import { useEffect } from "react";
import X from "./X";
import O from "./O";
import Modal from "../modal/Modal";

import ModalContent from "../modal/ModalContent";

const Board = () => {
  const {
    board,
    dispatch,
    currentPlayer,
    winner,
    winningCells,
    showRestartModal,
  } = useTicTacToe();

  const { mode } = useParams();

  const isCPUMode = mode === "cpu";

  useEffect(() => {
    // Fix: Check for CPU mode and current player
    if (isCPUMode && currentPlayer === "O" && !winner) {
      const cpuMoveTimeout = setTimeout(() => {
        dispatch({ type: "CPU_MOVE" });
      }, 2000);

      return () => clearTimeout(cpuMoveTimeout);
    }
  }, [currentPlayer, winner, isCPUMode, dispatch]);
  const handleClick = (i: number) => {
    if (board[i] || winner || (isCPUMode && currentPlayer === "O")) return;

    dispatch({ type: "PLAY", payload: { index: i } });
    console.log(currentPlayer);
    console.log(i);
    console.log(board);
    console.log(winner);
  };
  const getWinningCellClass = (i: number) => {
    if (winningCells && winningCells.includes(i)) {
      return winner === "X"
        ? "bg-[#31C3BD] shadow-[inset_0_-8px_0_0_#118C87]"
        : "bg-[#F2B137] shadow-[inset_0_-8px_0_0_#CC8B13]";
    }
    return "";
  };

  const handleRestart = () => {
    dispatch({ type: "RESET" });
    dispatch({ type: "RESTART_MODAL", payload: false });

    // setShowRestartModal(false);
  };

  const handleNextRound = () => {
    dispatch({ type: "RESTART" });
    dispatch({ type: "MODAL" });
  };

  const displayModal = () => {
    // if (winningCells && winningCells.includes(i)) {
    if (winner) {
      return (
        <Modal>
          {winner === "X" ? (
            <ModalContent
              title="YOU WON!"
              winnerType="X"
              message="TAKES THE ROUND"
              buttonLeft="QUIT"
              buttonRight="NEXT ROUND"
              buttonActions={{
                quit: () => console.log("quit game"),
                nextRound: handleNextRound,
              }}
            />
          ) : (
            <ModalContent
              title="  OH NO, YOU LOST…"
              message="TAKES THE ROUND"
              winnerType="O"
              buttonLeft="QUIT"
              buttonRight="NEXT ROUND"
              buttonActions={{
                quit: () => console.log("quit game"),
                nextRound: handleNextRound,
              }}
            />
          )}
        </Modal>
      );
    }
    // }
    if (!winner && board.every((cell) => cell)) {
      return (
        <Modal>
          <ModalContent
            // title="IT'S A TIE!"
            message="ROUND TIED"
            buttonLeft="QUIT"
            buttonRight="NEXT ROUND"
            buttonActions={{
              quit: () => console.log("quit game"),
              nextRound: handleNextRound,
            }}
          />
        </Modal>
      );
    }

    if (showRestartModal) {
      return (
        <Modal>
          <ModalContent
            message="RESTART GAME?"
            buttonLeft="NO, CANCEL"
            buttonRight="YES, RESTART"
            buttonActions={{
              quit: () => dispatch({ type: "RESTART_MODAL", payload: false }),
              nextRound: handleRestart,
            }}
          />
        </Modal>
      );
    }

    return null;
  };

  return (
    <div className="mt-[4rem] flex items-center justify-center min-[344px]:w-[21rem] md:w-[30rem]">
      <div className="grid grid-cols-3 gap-x-7 gap-y-7">
        {board.map((cell, i) => {
          return (
            <>
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={`flex h-[6rem] w-[6rem] items-center justify-center rounded-[0.625rem] bg-[#1F3641] pb-3 md:h-[8.75rem] md:w-[8.75rem] ${getWinningCellClass(i)} shadow-[inset_0_-8px_0_0_#10212A]`}
              >
                {cell &&
                  (cell === "X" ? (
                    <X
                      fill={
                        winningCells && winningCells.includes(i)
                          ? "#1A2A33"
                          : "#31C3BD"
                      }
                    />
                  ) : (
                    <O
                      fill={
                        winningCells && winningCells.includes(i)
                          ? "#1A2A33"
                          : " #F2B137"
                      }
                    />
                  ))}
              </div>
              {displayModal()}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
