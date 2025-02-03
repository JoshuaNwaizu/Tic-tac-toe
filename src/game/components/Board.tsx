import { useNavigate /* useParams*/ } from "react-router";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import { useEffect, useState } from "react";
import X from "./X";
import O from "./O";
import Modal from "../modal/Modal";

import ModalContent from "../modal/ModalContent";
import { AnimatePresence } from "framer-motion";

const Board = () => {
  const {
    board,
    dispatch,
    currentPlayer,
    winner,
    winningCells,
    showRestartModal,
    gameMode,
    playerMark,
    isBoardDisabled,
  } = useTicTacToe();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  // const { mode } = useParams();

  // const isCPUMode = mode === "cpu";

  useEffect(() => {
    if (gameMode === "cpu") {
      // If CPU is X and it's their turn, disable the board and make the CPU move
      if (playerMark === "O" && currentPlayer === "X" && !winner) {
        dispatch({ type: "IS_BOARD_DISABLED", payload: true }); // Disable the board
        const cpuMoveTimeout = setTimeout(() => {
          dispatch({ type: "CPU_MOVE" });
        }, 500);

        return () => clearTimeout(cpuMoveTimeout);
      }

      // If CPU is O and it's their turn, disable the board and make the CPU move
      if (playerMark === "X" && currentPlayer === "O" && !winner) {
        dispatch({ type: "IS_BOARD_DISABLED", payload: true }); // Disable the board
        const cpuMoveTimeout = setTimeout(() => {
          dispatch({ type: "CPU_MOVE" });
        }, 500);

        return () => clearTimeout(cpuMoveTimeout);
      }
    }
  }, [currentPlayer, winner, gameMode, playerMark, dispatch]);

  useEffect(() => {
    console.log("Board updated:", board);
  }, [board]);

  useEffect(() => {
    if (winner || board.every((cell) => cell)) {
      const modalTimeout = setTimeout(() => {
        setShowModal(true);
      }, 1000); // Delay for 1 second

      return () => clearTimeout(modalTimeout);
    } else {
      setShowModal(false);
    }
  }, [winner, board, showRestartModal]);

  const handleClick = (i: number) => {
    if (
      board[i] ||
      winner ||
      isBoardDisabled ||
      (gameMode === "cpu" && currentPlayer !== playerMark)
    ) {
      console.log("Click blocked because:", {
        cellOccupied: board[i],
        hasWinner: winner,
        boardDisabled: isBoardDisabled,
        wrongTurn: gameMode === "cpu" && currentPlayer !== playerMark,
      });
      return;
    }

    dispatch({ type: "PLAY", payload: { index: i } });
  };
  useEffect(() => {
    console.log("Current Player:", currentPlayer);
    console.log("Is Board Disabled:", isBoardDisabled);
  }, [currentPlayer, isBoardDisabled]);

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
    if (winner) {
      return (
        showModal && (
          <Modal>
            {gameMode === "cpu" ? (
              // CPU mode messages
              winner === playerMark ? (
                <ModalContent
                  title="YOU WON!"
                  winnerType={winner}
                  message="TAKES THE ROUND"
                  buttonLeft="QUIT"
                  buttonRight="NEXT ROUND"
                  buttonActions={{
                    quit: () => navigate("/"),
                    nextRound: handleNextRound,
                  }}
                />
              ) : (
                <ModalContent
                  title="OH NO, YOU LOST…"
                  winnerType={winner}
                  message="TAKES THE ROUND"
                  buttonLeft="QUIT"
                  buttonRight="NEXT ROUND"
                  buttonActions={{
                    quit: () => navigate("/"),
                    nextRound: handleNextRound,
                  }}
                />
              )
            ) : // Player mode messages
            winner === "X" ? (
              <ModalContent
                title="PLAYER 1 WINS!"
                winnerType="X"
                message="TAKES THE ROUND"
                buttonLeft="QUIT"
                buttonRight="NEXT ROUND"
                buttonActions={{
                  quit: () => navigate("/"),
                  nextRound: handleNextRound,
                }}
              />
            ) : (
              <ModalContent
                title="PLAYER 2 WINS!"
                winnerType="O"
                message="TAKES THE ROUND"
                buttonLeft="QUIT"
                buttonRight="NEXT ROUND"
                buttonActions={{
                  quit: () => navigate("/"),
                  nextRound: handleNextRound,
                }}
              />
            )}
          </Modal>
        )
      );
    }

    if (!winner && board.every((cell) => cell)) {
      return (
        <Modal>
          <ModalContent
            message="ROUND TIED"
            buttonLeft="QUIT"
            buttonRight="NEXT ROUND"
            buttonActions={{
              quit: () => navigate("/"),
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
    <div className="mt-[4rem] flex items-center justify-center min-[344px]:w-[21rem] md:w-[30rem] xl:w-[25rem]">
      <div className="grid grid-cols-3 gap-x-7 gap-y-7">
        {board.map((cell, i) => {
          return (
            <>
              <div
                key={i}
                onClick={() => handleClick(i)}
                className={`flex h-[6rem] w-[6rem] items-center justify-center rounded-[0.625rem] bg-[#1F3641] pb-3 md:h-[8.75rem] md:w-[8.75rem] xl:h-[6.75rem] xl:w-[6.75rem] ${getWinningCellClass(i)} shadow-[inset_0_-8px_0_0_#10212A]`}
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
              <AnimatePresence>{displayModal()}</AnimatePresence>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
