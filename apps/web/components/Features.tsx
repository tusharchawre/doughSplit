"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import { DollarSign, ArrowRight, User } from "lucide-react";

export const Features = () => {
  const [hover, setHover] = useState(false);

  return (
    <div className="grid h-screen w-full grid-cols-3 grid-rows-2 gap-4 px-16 py-2">
      <div className="col-span-2 flex flex-col items-start justify-around gap-4 overflow-hidden rounded-xl bg-neutral-100 px-10 py-6">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative mx-auto flex h-[40rem] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-8 lg:flex-row"
        >
          <div className="relative z-20 w-full flex items-center justify-center">
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
                    damping: 30
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
                      
                      className="border-emerald-300 flex h-12 w-12 items-center justify-center rounded-xl border-[0.5px] bg-emerald-100"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
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

        <div>
          <p className="font-mono text-sm text-neutral-500">Bill Split</p>
          <p className="text-medium text-lg">Share the Load</p>
          <p className="text-sm">
            Create groups with your squad and split expenses like a pro. Whether
            it's a dinner tab, road trip, or rent—DoughSplit keeps things square
            between friends.
          </p>
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-16"></div>

      <div className="col-span-1 flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-16"></div>

      <div className="col-span-2 flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-16"></div>
    </div>
  );
};