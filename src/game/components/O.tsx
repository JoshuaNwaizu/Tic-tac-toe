import React, { useEffect, useState } from "react";
interface O {
  fill?: string;
}
const O: React.FC<O> = ({ fill = "#F2B137" }) => {
  const [viewBox, setViewBox] = useState<string>("0 -20 60 100");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 720px)").matches) {
        setViewBox("-5 30 70 10");
      } else {
        setViewBox("0 -20 60 100");
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <svg
        viewBox={viewBox}
        width="64"
        height="64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default O;
