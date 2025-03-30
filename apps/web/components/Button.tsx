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
  return (
    <motion.button
      className={`relative flex w-36 items-center justify-center gap-2 rounded-md bg-black px-2 py-2 font-medium text-white`}
      whileHover="hover"
      initial="initial"
    >
      <span className="text-sm font-semibold">{children}</span>
      <div className="relative h-5 w-5 overflow-hidden">
        <motion.div
          className="absolute"
          variants={{
            initial: variant == "primary" ? { y: 0 } : { x: 0 },
            hover: variant === "primary" ? { y: 20 } : { x: 20 },
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>

        <motion.div
          className="absolute"
          variants={{
            initial: variant === "primary" ? { y: -20 } : { x: -20 },
            hover: { x: 0, y: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.button>
  );
};
