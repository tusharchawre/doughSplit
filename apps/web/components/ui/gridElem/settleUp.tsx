import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

import { DollarSign, ArrowRight, User } from "lucide-react";
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
          
        </div>


        <div className="absolute inset-0 bg-white [mask-image:radial-gradient(400px_at_center,white,transparent)]" />
      </div>
    </>
  );
};
