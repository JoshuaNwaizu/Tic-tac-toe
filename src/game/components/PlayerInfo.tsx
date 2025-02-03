import Buttons from "../../home/components/Buttons";
import { useTicTacToe } from "../contexts/TicTacToeContext";
import { motion } from "framer-motion";

const className: string =
  "flex h-[4rem] w-[6rem] xl:h-[4.75rem] xl:w-[6.75rem] md:w-[8.75rem] md:h-[4.5rem] flex-col items-center justify-center rounded-[0.625rem]";

const PlayerInfo = () => {
  const { score, gameMode, playerMark } = useTicTacToe();
  console.log(score);

  const leftButtonVariants = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  const rightButtonVariants = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };

  return (
    <div className="mt-[2.5rem] grid grid-cols-3 items-center justify-between gap-x-7 gap-y-7 min-[344px]:w-[21rem] md:w-[30rem] xl:w-[24rem]">
      {/* X Button */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={leftButtonVariants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Buttons className={`${className} bg-[#31C3BD] text-[#1A2A33]`}>
          <p className="text-[0.875rem] tracking-[0.05rem]">
            X{" "}
            {gameMode === "player"
              ? playerMark === "O"
                ? "(P2)"
                : "(P1)"
              : playerMark === "X"
                ? "YOU"
                : "CPU"}
          </p>
          <h1 className="text-[1.25rem] font-bold tracking-[0.08rem] md:text-[1.5rem]">
            {score.X}
          </h1>
        </Buttons>
      </motion.div>

      {/* Ties Button */}
      <Buttons className={`${className} bg-[#A8BFC9] text-[#1A2A33]`}>
        <p className="text-[0.875rem] tracking-[0.05rem]">TIES</p>
        <h1 className="text-[1.25rem] font-bold tracking-[0.08rem]">
          {score.tied}
        </h1>
      </Buttons>

      {/* O Button */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={rightButtonVariants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Buttons className={`${className} bg-[#F2B137] text-[#1A2A33]`}>
          <p className="text-[0.875rem] tracking-[0.05rem]">
            O{" "}
            {gameMode === "player"
              ? playerMark === "X"
                ? "(P2)"
                : "(P1)"
              : playerMark === "O"
                ? "YOU"
                : "CPU"}
          </p>
          <h1 className="text-[1.25rem] font-bold tracking-[0.08rem]">
            {score.O}
          </h1>
        </Buttons>
      </motion.div>
    </div>
  );
};

export default PlayerInfo;
