import Modal from "../modal/Modal";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import ModalContent from "../modal/ModalContent";
import { useNavigate } from "react-router";

const ShowModal = () => {
  const {
    board,
    dispatch,
    winner,
    showRestartModal,
    gameMode,
    playerMark,

    isShowModal,
  } = useTicTacToe();

  const navigate = useNavigate();

  const handleRestart = () => {
    dispatch({ type: "RESET" });
    dispatch({ type: "RESTART_MODAL", payload: false });
  };

  const handleNextRound = () => {
    dispatch({ type: "RESTART" });
    dispatch({ type: "MODAL" });
  };
  const handleQuit = () => {
    navigate("/");
    dispatch({ type: "SET_SELECTED_MODE", payload: false });
  };

  const displayModal = () => {
    if (winner) {
      return (
        isShowModal && (
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
                    quit: handleQuit,
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
                    quit: handleQuit,
                    nextRound: handleNextRound,
                  }}
                />
              )
            ) : winner === "X" ? (
              <ModalContent
                title={playerMark === "X" ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}
                winnerType="X"
                message="TAKES THE ROUND"
                buttonLeft="QUIT"
                buttonRight="NEXT ROUND"
                buttonActions={{
                  quit: handleQuit,
                  nextRound: handleNextRound,
                }}
              />
            ) : (
              <ModalContent
                title={playerMark === "X" ? "PLAYER 2 WINS!" : "PLAYER 1 WINS!"}
                winnerType="O"
                message="TAKES THE ROUND"
                buttonLeft="QUIT"
                buttonRight="NEXT ROUND"
                buttonActions={{
                  quit: handleQuit,
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
              quit: handleQuit,
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
  return displayModal();
};

export default ShowModal;
