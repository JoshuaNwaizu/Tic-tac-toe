import { useEffect, useState } from "react";
import { useTicTacToe } from "../../game/contexts/TicTacToeContext";
import { motion } from "framer-motion";

const PlayerMark = () => {
  const { dispatch, playerMark, currentPlayer, gameMode } = useTicTacToe();
  const [selectedMark, setSelectedMark] = useState<"X" | "O">("X");

  const variants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };
  useEffect(() => {
    setSelectedMark(playerMark);
  }, [playerMark]);

  // useEffect(() => {
  //   if (gameMode === "cpu" && cpuMark === "X") {
  //     const timer = setTimeout(() => {
  //       dispatch({ type: "CPU_MOVE" });
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }
  // }, [gameMode, cpuMark, dispatch]);

  // const handleMarkSelection = (mark: "X" | "O") => {
  //   setSelectedMark(mark);

  //   dispatch({ type: "SET_MARK", payload: { mark } });

  //   console.log(
  //     ` playerMark is ${playerMark} ,
  //      currentPlayer is ${currentPlayer},
  //      `,
  //   );
  // };
  const handleMarkSelection = (mark: "X" | "O") => {
    setSelectedMark(mark);
    dispatch({ type: "SET_MARK", payload: { mark } });

    // If the player chooses O, the CPU (X) should go first
    if (gameMode === "cpu" && mark === "O") {
      setTimeout(() => {
        dispatch({ type: "CPU_MOVE" });
      }, 500);
    }

    console.log(
      `Player mark is ${mark}, 
       Current player is ${currentPlayer}, 
       Game mode is ${gameMode}`,
    );
  };
  // const handleMarkSelection = (mark: "X" | "O") => {
  //   setSelectedMark(mark);
  //   dispatch({ type: "SET_MARK", payload: { mark } });
  //   dispatch({ type: "SET_PLAYER_ONE", payload:{ mark} });

  //   console.log(playerMark, currentPlayer);
  // };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{
        duration: 0.5,
        type: "spring",
        ease: "backInOut",
      }}
      className="flex h-[12.8125rem] w-[20.4375rem] flex-col items-center justify-center rounded-[0.9375rem] bg-[#1F3641] shadow-[inset_0_-8px_0_0_#10212A] md:w-[28.75rem]"
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-center text-base font-bold">
          PICK PLAYER 1’S MARK
        </h1>
        <div className="flex h-[4.5rem] w-[17.4375rem] flex-shrink-0 items-center justify-between rounded-[0.625rem] bg-[#1A2A33] px-2 md:w-[25.75rem]">
          <motion.p
            initial={{ scale: 1 }}
            animate={{ scale: playerMark === "X" ? 1 : 0.8 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`flex h-[3.5rem] w-[8.25rem] items-center rounded-[0.625rem] md:w-[12.375rem] ${selectedMark === "X" ? "bg-[#A8BFC9]" : null} justify-center`}
            onClick={() => handleMarkSelection("X")}
          >
            <svg
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -25 60 120"
            >
              <path
                d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                fill={selectedMark === "X" ? "#1A2A33" : "#31C3BD"}
                fillRule="evenodd"
              />
            </svg>
          </motion.p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: playerMark === "O" ? 1 : 0.8 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`flex h-[3.5rem] w-[8.25rem] md:w-[12.375rem] ${selectedMark === "O" ? "bg-[#A8BFC9]" : null} items-center justify-center rounded-[0.625rem]`}
            onClick={() => handleMarkSelection("O")}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.7412 15.8706C31.7412 7.10551 24.6357 0 15.8706 0C7.10551 0 0 7.10551 0 15.8706C0 24.6357 7.10551 31.7412 15.8706 31.7412C24.6357 31.7412 31.7412 24.6357 31.7412 15.8706ZM9.4048 15.8706C9.4048 12.2996 12.2996 9.4048 15.8706 9.4048C19.4416 9.4048 22.3364 12.2996 22.3364 15.8706C22.3364 19.4416 19.4416 22.3364 15.8706 22.3364C12.2996 22.3364 9.4048 19.4416 9.4048 15.8706Z"
                fill={selectedMark === "X" ? "#31C3BD" : "#1A2A33"}
              />
            </svg>
          </motion.p>
        </div>

        <span className="text-center text-[0.875rem]">
          REMEMBER : X GOES FIRST
        </span>
      </div>
    </motion.div>
  );
};

export default PlayerMark;
