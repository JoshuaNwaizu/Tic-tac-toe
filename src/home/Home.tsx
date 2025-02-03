import { Link } from "react-router";
import Buttons from "./components/Buttons";
import PlayerMark from "./components/PlayerMark";
import { useTicTacToe } from "../game/contexts/TicTacToeContext";
import { motion } from "framer-motion";

const btnClassName: string =
  "h-[3.5rem] w-[20.4375rem] md:w-[28.75rem] flex items-center justify-center rounded-[0.9375rem] font-bold tracking-[0.0625rem]";
const Home = () => {
  const { dispatch, playerMark } = useTicTacToe();

  const setMode = (mode: "player" | "cpu") => {
    dispatch({ type: "SET_MODE", payload: { mode } });
    dispatch({ type: "RESET" });

    if (mode === "cpu") {
      const cpuMark = playerMark === "X" ? "O" : "X";

      // Set the current player to CPU if CPU is X
      if (cpuMark === "X") {
        dispatch({ type: "SET_CURRENT_PLAYER", payload: "X" });
        setTimeout(() => {
          dispatch({ type: "CPU_MOVE" });
        }, 500);
      }
    }
  };

  return (
    <div className="flex h-svh w-svw flex-col items-center justify-center gap-8 overflow-y-hidden md:gap-12">
      <motion.span
        initial={{
          rotate: "0deg",
          scale: 0,
        }}
        animate={{
          rotate: "360deg",
          scale: 1,
        }}
        transition={{
          duration: 1,
          type: "spring",
          ease: "backInOut",
        }}
        exit={{
          rotate: "0deg",
          scale: 0,
        }}
      >
        <img src="/logo.svg" alt="logo" className="h-[2rem] md:w-[4.5rem]" />
      </motion.span>
      <PlayerMark />
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          type: "spring",
          ease: "backInOut",
        }}
        className="flex flex-col gap-5 text-[#1A2A33]"
      >
        <Link to={"/game/cpu"}>
          <Buttons
            onClick={() => {
              dispatch({ type: "RESET" });
              setMode("cpu");
            }}
            className={`${btnClassName} bg-[#F2B137] shadow-[inset_0_-7px_0_0_#CC8B13]`}
          >
            NEW GAME (VS CPU)
          </Buttons>
        </Link>
        <Link to={"/game/player"}>
          {" "}
          <Buttons
            onClick={() => setMode("player")}
            className={`${btnClassName} bg-[#31C3BD] shadow-[inset_0_-7px_0_0_#118C87]`}
          >
            NEW GAME (VS PLAYER)
          </Buttons>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
