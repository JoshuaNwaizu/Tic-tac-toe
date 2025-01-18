import React from "react";

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
        <div className="z-[30] h-[14.25rem] w-full bg-[#1F3641] md:h-[16.625rem]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
