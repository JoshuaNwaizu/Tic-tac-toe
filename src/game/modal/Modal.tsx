import React from "react";
import { motion } from "framer-motion";

type Children = {
  children?: React.ReactNode;
};

const Modal: React.FC<Children> = ({ children }) => {
  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
        <div
          className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-[#000] opacity-15`}
        ></div>
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            ease: "backInOut",
          }}
          exit={{
            scale: 0,
          }}
          className="z-[30] h-[14.25rem] w-full bg-[#1F3641] md:h-[16.625rem]"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
