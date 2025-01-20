import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Buttons: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Buttons;
