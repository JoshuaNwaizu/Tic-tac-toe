import React from "react";
import Buttons from "../../home/components/Buttons";
import { useTicTacToe } from "../contexts/TicTacToeContext";

interface ModalContentProps {
  title?: string;
  winnerType?: "X" | "O" | string;
  message?: string;
  buttonActions?: {
    quit?: () => void;
    nextRound?: () => void;
  };
  buttonLeft?: string;
  buttonRight?: string;
}

const ModalContent: React.FC<ModalContentProps> = ({
  title,
  winnerType,
  message,
  buttonActions,
  buttonLeft,
  buttonRight,
}) => {
  const { board, winner } = useTicTacToe();
  const tied = board.every((cell) => cell);
  const isTie = tied && winner === null;
  const winnerColor = winnerType === "X" ? "text-[#31C3BD]" : "text-[#F2B137]";
  const winnerIcon = winnerType === "X" ? "/icon-x.svg" : "/icon-o.svg";
  return (
    <div className="flex h-full flex-shrink-0 flex-col items-center justify-center gap-6">
      <h2 className="font-bold tracking-[0.05469rem]">{title}</h2>
      <span className={`flex items-center gap-2 md:gap-7 ${winnerColor}`}>
        {!isTie && (
          <img
            src={winnerIcon}
            alt="X"
            className="h-[1.75rem] w-[1.75rem] md:h-[4rem] md:w-[4rem]"
          />
        )}

        <h1 className="text-2xl font-bold tracking-[0.09375rem] md:text-[2.5rem]">
          {message}
        </h1>
      </span>
      <div className="flex gap-5 font-bold tracking-[0.0625rem] text-[#1A2A33]">
        <Buttons
          className="h-[3.25rem] flex-shrink-0 rounded-[0.625rem] bg-[#A8BFC9] px-4 shadow-[inset_0_-4px_0_0_#6B8997]"
          onClick={buttonActions?.quit}
        >
          <p>{buttonLeft}</p>
        </Buttons>
        <Buttons
          className="h-[3.25rem] w-[9.125rem] rounded-[0.625rem] bg-[#F2B137] shadow-[inset_0_-4px_0_0_#CC8B13]"
          onClick={buttonActions?.nextRound}
        >
          <p>{buttonRight}</p>
        </Buttons>
      </div>
    </div>
  );
};

export default ModalContent;
