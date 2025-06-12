import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

import { DollarSign, ArrowRight, User, Check } from "lucide-react";
import { CanvasRevealEffect } from "../canvas-reveal-effect";

export const SettleUp = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div className="mb-4 flex flex-col gap-1">
        <p className="font-mono text-xs text-neutral-500 md:text-sm">
          Settle Up{" "}
        </p>
        <p className="text-medium text-base md:text-lg">Debt Destroyer</p>
        <p className="text-xs md:text-sm">
          See at a glance who needs to pay up and settle debts with your
          preferred payment method. Clean slate, clean conscience.
        </p>
      </div>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-8 py-32 lg:flex-row"
      >
        <div className="relative z-20 flex w-full items-center justify-center">
          <AnimatePresence mode="popLayout">
            {!hover ? (
              <motion.div
                key="settleUp"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex h-12 w-56 items-center justify-center gap-4 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-50 px-4"
              >
                <DollarSign size={20} className="text-neutral-500" />
                <span className="text-lg font-medium text-neutral-500">
                  Settle Up
                </span>
                <ArrowRight size={16} className="ml-2 text-neutral-500" />
              </motion.div>
            ) : (
              <motion.div
                key="checkmark"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border-[0.5px] border-cyan-300 bg-cyan-50"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <Check size={24} className="text-cyan-500" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 h-full w-full"
            >
              <CanvasRevealEffect
                animationSpeed={5}
                containerClassName="bg-white"
                colors={[
                  [59, 130, 246],
                  [139, 92, 246],
                ]}
                opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                dotSize={2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-white [mask-image:radial-gradient(400px_at_center,white,transparent)]" />
      </div>
    </>
  );
};
