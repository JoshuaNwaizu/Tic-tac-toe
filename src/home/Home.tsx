import { Link } from "react-router";
import Buttons from "./components/Buttons";
import PlayerMark from "./components/PlayerMark";
import { useTicTacToe } from "../game/contexts/TicTacToeContext";

const btnClassName: string =
  "h-[3.5rem] w-[20.4375rem] md:w-[28.75rem] flex items-center justify-center rounded-[0.9375rem] font-bold tracking-[0.0625rem]";
const Home = () => {
  const { dispatch, gameMode } = useTicTacToe();

  const setMode = (mode: "player" | "cpu") => {
    dispatch({ type: "SET_MODE", payload: { mode } });
    dispatch({ type: "RESET" });
    console.log(gameMode);
  };
  return (
    <div className="flex h-svh w-svw flex-col items-center justify-center gap-8 md:gap-12">
      <span>
        <img src="/logo.svg" alt="logo" className="h-[2rem] md:w-[4.5rem]" />
      </span>
      <PlayerMark />
      <div className="flex flex-col gap-5 text-[#1A2A33]">
        <Link to={"/game/cpu"}>
          <Buttons
            onClick={() => setMode("cpu")}
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
      </div>
    </div>
  );
};

export default Home;
