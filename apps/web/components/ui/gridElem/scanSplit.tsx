import { motion } from "motion/react";
import React, { useState } from "react";

export const ScanSplit = () => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <div className="mb-4 flex flex-col gap-1">
        <p className="font-mono text-xs text-neutral-500 md:text-sm">
          Receipt OCR
        </p>
        <p className="text-medium text-base md:text-lg">Snap & Split</p>
        <p className="text-xs md:text-sm">
          Just snap a pic of that receipt and our OCR tech does the heavy
          lifting. Turn paper bills into digital transactions faster than you
          can say "I got this one."
        </p>
      </div>

      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative mx-auto flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white px-2 py-12 lg:flex-row"
      >
        <div className="relative my-2 h-32 w-32">
          <svg
            width="100%"
            height="100%"
            className="border border-neutral-300"
            viewBox="0 0 142 142"
          >
            <motion.path
              d="M0.5 0.5H207"
              fill="transparent"
              strokeWidth="4"
              stroke="#bebebe"
              initial={{ y: 0, opacity: 1, pathLength: 1 }}
              animate={hover ? { y: 200 } : { y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: "easeInOut" }}
            />

            <motion.path
              d="M71 1H1V141H71"
              fill="transparent"
              strokeWidth="2"
              stroke="black"
              initial={{ pathLength: 0, stroke: "black" }}
              animate={
                hover
                  ? { pathLength: 1, stroke: ["#00DDFF"] }
                  : { pathLength: 0, stroke: "#bebebe" }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M-1.01328e-06 1H70V141H-1.01328e-06"
              fill="transparent"
              strokeWidth="2"
              stroke="black"
              style={{ x: 71 }}
              initial={{ pathLength: 0, stroke: "black" }}
              animate={
                hover
                  ? { pathLength: 1, stroke: ["#00DDFF"] }
                  : { pathLength: 0, stroke: "#bebebe" }
              }
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            <defs>
              <clipPath id="reveal-mask">
                <motion.rect
                  x="0"
                  y="0"
                  width="142"
                  height="0"
                  initial={{ height: 0 }}
                  animate={hover ? { height: 142 } : { height: 0 }}
                  transition={{ delay: 0.25, duration: 0.7, ease: "easeInOut" }}
                />
              </clipPath>
            </defs>

            <motion.image
              href="/bill.png"
              x="2"
              y="2"
              width="130"
              height="130"
              initial={{ opacity: 0 }}
              animate={hover ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              clipPath="url(#reveal-mask)"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
