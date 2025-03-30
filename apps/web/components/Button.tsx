"use client";
import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  icon,
  variant = "primary",
}: ButtonProps) => {
  const bgColor = variant === "primary" ? "bg-black" : "bg-gray-500";
  
  return (
    <motion.button 
      className={`flex w-40 items-center justify-center gap-2 rounded-md ${bgColor} px-4 py-1 font-medium text-white relative`}
      whileHover="hover"
      initial="initial"
    >
      <span>{children}</span>
      <div className="relative h-5 w-5 overflow-hidden">
        <motion.div 
          className="absolute"
          variants={{
            initial: { y: 0 },
            hover: { y: 24 }
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        <motion.div 
          className="absolute"
          variants={{
            initial: { y: -24 },
            hover: { y: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.button>
  );
};