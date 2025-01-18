import Buttons from "../../home/components/Buttons";
import { useTicTacToe } from "../contexts/TicTacToeContext";

const className: string =
  "flex h-[4rem] w-[6rem] md:w-[8.75rem] md:h-[4.5rem] flex-col items-center justify-center  rounded-[0.625rem]";
const PlayerInfo = () => {
  const { score, gameMode, playerMark } = useTicTacToe();
  console.log(score);
  return (
    <div className="mt-[2.5rem] grid grid-cols-3 items-center justify-between gap-x-7 gap-y-7 min-[344px]:w-[21rem] md:w-[30rem]">
      <Buttons className={`${className} bg-[#31C3BD] text-[#1A2A33]`}>
        <p className="text-[0.875rem] tracking-[0.05rem]">
          X{" "}
          {gameMode === "player"
            ? playerMark === "O"
              ? "(P2)"
              : "(P1)"
            : "YOU"}{" "}
        </p>
        <h1 className="text-[1.25rem] font-bold tracking-[0.08rem] md:text-[1.5rem]">
          {score.X}
        </h1>
      </Buttons>
      <Buttons className={`${className} bg-[#A8BFC9] text-[#1A2A33]`}>
        <p className="text-[0.875rem] tracking-[0.05rem]">TIES</p>
        <h1 className="text-[1.25rem] font-bold tracking-[0.08rem]">
          {score.tied}
        </h1>
      </Buttons>
      <Buttons className={`${className} bg-[#F2B137] text-[#1A2A33]`}>
        <p className="text-[0.875rem] tracking-[0.05rem]">
          O{" "}
          {gameMode === "player"
            ? playerMark === "X"
              ? "(P2)"
              : "(P1)"
            : "CPU"}{" "}
        </p>
        <h1 className="text-[1.25rem] font-bold tracking-[0.08rem]">
          {score.O}
        </h1>
      </Buttons>
    </div>
  );
};

export default PlayerInfo;
