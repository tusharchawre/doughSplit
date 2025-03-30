"use client";
import { ArrowDown } from "lucide-react";
import { Button } from "./Button";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
} from "motion/react";
import { useState } from "react";

export const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Convert scrollYProgress to our style values
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 20]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.75)"],
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

  // Track when we pass 50% threshold for conditional rendering
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.5 && !scrolled) {
      setScrolled(true);
    } else if (latest <= 0.5 && scrolled) {
      setScrolled(false);
    }
  });

  return (
    <motion.div
      style={{
        borderRadius,
        backgroundColor,
        boxShadow,
        backdropFilter: backdropBlur,
      }}
      className="fixed mx-auto mt-2 flex h-16 w-full max-w-6xl items-center justify-between px-8 backdrop-blur-md transition-all duration-300 ease-in-out"
    >
      <p className="text-2xl font-bold">doughSplit</p>
      <div className="flex gap-8 font-medium">
        <p>Home</p>
        <p>Features</p>
        <p>Download</p>
        <p>FAQs</p>
      </div>

      <Button icon={<ArrowDown color="white" size={20} />}>Download</Button>
    </motion.div>
  );
};
