import React, { useEffect, useState } from "react";

interface X {
  fill?: string;
}
const X: React.FC<X> = ({ fill = "#31C3BD" }) => {
  const [viewBox, setViewBox] = useState("0 -20 60 100");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 720px)").matches) {
        setViewBox("-12 30 90 2");
      } else {
        setViewBox("0 -20 60 100");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="">
      <svg
        // viewBox="0 -20 60 100"
        viewBox={viewBox}
        width="64"
        height="64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
          fill={fill}
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default X;
