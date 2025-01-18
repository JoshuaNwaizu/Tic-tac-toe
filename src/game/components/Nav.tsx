import { Link } from "react-router";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import { useEffect } from "react";

const Nav = () => {
  const { currentPlayer, dispatch, playerMark } = useTicTacToe();

  const confirmRestart = () => {
    dispatch({ type: "RESTART_MODAL", payload: true });
  };
  useEffect(() => {
    // Set initial player based on playerMark
    dispatch({ type: "SET_CURRENT_PLAYER", payload: playerMark });
  }, [playerMark, dispatch]);

  return (
    <>
      <nav className="mt-5 flex w-full items-center justify-between min-[344px]:w-[20rem] md:w-[30rem]">
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              src="/logo.svg"
              alt="logo"
              className="h-[2rem] w-[4.49813rem]"
            />
          </Link>

          <div className="ml-[3rem] flex h-[2.5rem] w-[6rem] items-center justify-center gap-2 rounded-[0.5375rem] bg-[#1F3641] font-bold tracking-[0.0625rem] text-[#1A2A33] shadow-[inset_0_-4px_0_0_#10212A] max-sm:pb-1 md:h-[3.25rem] md:w-[8.75rem]">
            <span>
              {currentPlayer === "X" ? (
                <img src={"/icon-x-white.svg"} alt="X" className="h-4 w-4" />
              ) : (
                <img src={"/icon-o-white.svg"} alt="X" className="h-4 w-4" />
              )}
            </span>
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
