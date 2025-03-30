"use client";
import { ArrowDown } from "lucide-react";
import { Button } from "./Button";
import { useScroll, motion, useTransform } from "motion/react";

export const Navbar = () => {
  const { scrollYProgress } = useScroll();

  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 12]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.85)"],
  );
  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(10px)"],
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0 4px 6px rgba(0, 0, 0, 0)", "0 8px 24px rgba(0, 0, 0, 0.2)"],
  );

  const width = useTransform(scrollYProgress, [0, 0.5], ["70vw", "60vw"]);

  // Button animation
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const visibility = useTransform(scrollYProgress, (value) =>
    value > 0.5 ? "hidden" : "visible",
  );

  const navPosition = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 200]);

  const navItem = ["Home", "Features", "Download", "FAQs"];

  return (
    <div className="flex h-fit w-full justify-center">
      <motion.div
        layout
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        style={{
          borderRadius,
          backgroundColor,
          boxShadow,
          backdropFilter: backdropBlur,
          width: width,
        }}
        className="fixed z-50 mx-auto mt-2 flex h-14 w-full max-w-6xl items-center justify-between px-8 backdrop-blur-md transition-all duration-300 ease-in-out"
      >
        <p className="text-xl font-bold">doughSplit</p>

        <motion.div
          className="absolute left-1/2 flex -translate-x-1/2 transform gap-12 text-sm font-medium"
          style={{
            x: navPosition,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {navItem.map((item, index) => (
            <motion.p
              key={index}
              layout
              transition={{
                delay: 0.05 * index,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
            >
              {item}
            </motion.p>
          ))}
        </motion.div>
        <motion.div style={{ opacity, visibility }}>
          <Button icon={<ArrowDown color="white" size={20} />}>Download</Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
