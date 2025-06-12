import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { DollarSign, ArrowRight, User } from "lucide-react";
import { CanvasRevealEffect } from "../canvas-reveal-effect";

export const TrackExpenses = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-8 py-24 lg:flex-row"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={hover ? "open" : "closed"}
            src={hover ? "/eye-open.gif" : "/eye-close.gif"}
            alt={hover ? "Eye Open" : "Eye Closed"}
            className={`absolute z-10`}
            loading="eager"
            decoding="async"
            initial={{ opacity: hover ? 1 : 0.5 }}
            animate={{ opacity: hover ? 1 : 0.5 }}
            exit={{ opacity: hover ? 1 : 0.5 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.1)_50%,rgba(59,130,246,0.6)_100%)]"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hover ? 1 : 0,
            scale: hover ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-white [mask-image:radial-gradient(400px_at_center,white,transparent)]" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-mono text-xs text-neutral-500 md:text-sm">Expense</p>
        <p className="text-medium text-base md:text-lg">Money Clarity</p>
        <p className="text-xs md:text-sm">
          Track who's paid, who's owed, and where all that dough went. Crystal
          clear balances without the mental math headaches.
        </p>
      </div>
    </>
  );
};
