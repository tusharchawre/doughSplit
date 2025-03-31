import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

import { DollarSign, ArrowRight, User } from "lucide-react";
import { CanvasRevealEffect } from "../canvas-reveal-effect";

export const BillSplit = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-8 py-24 lg:flex-row"
      >
        <div className="relative z-20 flex w-full items-center justify-center">
          <AnimatePresence mode="popLayout">
            {!hover ? (
              <motion.div
                key="totalBill"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="flex h-12 w-56 items-center justify-center gap-4 rounded-xl border-[0.5px] border-emerald-300 bg-emerald-100 px-4"
              >
                <DollarSign size={20} className="text-emerald-600" />
                <span className="text-lg font-medium text-emerald-600">
                  Total Bill
                </span>
                <ArrowRight size={16} className="ml-2 text-emerald-600" />
              </motion.div>
            ) : (
              <motion.div
                key="userIcons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex gap-8"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-[0.5px] border-emerald-300 bg-emerald-100"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <User size={24} className="text-green-600" />
                    <span className="absolute -bottom-6 text-xs font-medium text-green-600">
                      25%
                    </span>
                  </motion.div>
                ))}
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

      <div className="flex flex-col gap-1">
        <p className="font-mono text-xs text-neutral-500 md:text-sm">
          Bill Split
        </p>
        <p className="text-medium text-base md:text-lg">Share the Load</p>
        <p className="text-xs md:text-sm">
          Create groups with your squad and split expenses like a pro. Whether
          it's a dinner tab, road trip, or rent—DoughSplit keeps things square
          between friends.
        </p>
      </div>
    </>
  );
};
