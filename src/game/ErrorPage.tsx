import { Link, useNavigate } from "react-router";

import { useTicTacToe } from "../game/contexts/TicTacToeContext";
import { motion } from "framer-motion";
import Buttons from "../home/components/Buttons";

const btnClassName: string =
  "h-[3.5rem] w-[20.4375rem] md:w-[28.75rem] flex items-center justify-center rounded-[0.9375rem] font-bold tracking-[0.0625rem]";
const ErrorPage = () => {
  const { dispatch } = useTicTacToe();
  const navigate = useNavigate();

  const variants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
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
        <h1 className="text-center text-[3rem] font-bold"> 404 NOT FOUND</h1>
      </motion.div>
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
        <Link to={"/"}>
          <Buttons
            onClick={() => {
              navigate("/");
              dispatch({ type: "SET_SELECTED_MODE", payload: false });
            }}
            className={`${btnClassName} bg-[#F2B137] capitalize shadow-[inset_0_-7px_0_0_#CC8B13]`}
          >
            Go back to home
          </Buttons>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
