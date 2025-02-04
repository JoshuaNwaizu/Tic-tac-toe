import { useNavigate } from "react-router";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Nav = () => {
  const { currentPlayer, dispatch, playerMark } = useTicTacToe();
  const navigate = useNavigate();
  const variants = {
    initial: { y: currentPlayer === "X" ? -25 : 25, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: currentPlayer === "X" ? 120 : -120, opacity: 0 },
  };
  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  const confirmRestart = () => {
    dispatch({ type: "RESTART_MODAL", payload: true });
    dispatch({ type: "SET_SELECTED_MODE", payload: false });
  };
  useEffect(() => {
    // Set initial player based on playerMark
    dispatch({ type: "SET_CURRENT_PLAYER", payload: playerMark });
  }, [playerMark, dispatch]);

  return (
    <>
      <nav className="mt-5 flex w-full items-center justify-between min-[344px]:w-[20rem] md:w-[30rem] xl:w-[24rem]">
        <div className="flex items-center">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-[2rem] w-[4.49813rem]"
            onClick={() => {
              navigate("/");
              dispatch({ type: "SET_SELECTED_MODE", payload: false });
            }}
          />

          <div className="ml-[3rem] flex h-[2.5rem] w-[6rem] items-center justify-center gap-2 rounded-[0.5375rem] bg-[#1F3641] font-bold tracking-[0.0625rem] text-[#1A2A33] shadow-[inset_0_-4px_0_0_#10212A] max-sm:pb-1 md:h-[3.25rem] md:w-[8.75rem]">
            <motion.span
              key={currentPlayer}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 1, ...springTransition }}
            >
              {currentPlayer === "X" ? (
                <img src={"/icon-x-white.svg"} alt="X" className="h-4 w-4" />
              ) : (
                <img src={"/icon-o-white.svg"} alt="O" className="h-4 w-4" />
              )}
            </motion.span>
            <span className="text-[0.875rem] tracking-[0.05469rem] text-[#A8BFC9] md:text-[1rem]">
              TURN
            </span>
          </div>
        </div>
        <button
          className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.3125rem] bg-[#A8BFC9] shadow-[inset_0_-4px_0_0_#8ca0a8] md:h-[3.25rem] md:w-[3.25rem]"
          onClick={confirmRestart}
        >
          <img src="/icon-restart.svg" alt="restart" />
        </button>
      </nav>
    </>
  );
};

export default Nav;
