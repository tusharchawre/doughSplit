import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react"

export const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 80%"],

  });

  const left = useTransform(scrollYProgress, [0, 0.8], ["-0.5rem", "-20rem"]);
  const right = useTransform(scrollYProgress, [0, 0.8], ["-0.5rem", "-20rem"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], ["0.5", "1"])
  return (
    <motion.div ref={ref} className="h-screen w-full my-12 overflow-x-clip">
      <motion.div className="relative flex h-full w-full flex-col items-center justify-center gap-2">
        <motion.div className="absolute inset-0 blur-[100px]">
          <motion.div
            style={{ left }}
            className="absolute -top-[30%] -left-80 z-10 aspect-square w-4xl rounded-full bg-white"
          />
          <motion.div style={{opacity}} className="absolute -top-[10%] -left-80 aspect-square w-4xl rounded-full bg-[#8C00FF]" />
          <motion.div style={{ right }} className="absolute -right-80 -bottom-[30%] z-10 aspect-square w-4xl rounded-full bg-white" />
          <motion.div style={{opacity}} className="absolute -right-80 -bottom-[10%] aspect-square w-4xl rounded-full bg-[#00FFF2]" />
        </motion.div>

        <p className="relative z-50 text-sm font-semibold text-[#0077B7]">
          What people are saying
        </p>
        <p className="relative z-50 text-3xl font-semibold text-black">
          Trusted By Me
        </p>
        <p className="relative z-50 text-sm text-neutral-400">(Singularly)</p>
      </motion.div>
    </motion.div>
  );
};
