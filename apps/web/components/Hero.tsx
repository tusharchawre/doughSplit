import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";

export const Hero = () => {
  const { scrollYProgress } = useScroll();

  const width = useTransform(scrollYProgress, [0, 0.3], ["64rem", "72rem"]);
  const paddingInline = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0rem", "4vw"],
  );

  return (
    <motion.div
      style={{
        paddingInline,
      }}
      className="h-screen w-full py-8 "
    >
      <div className="relative overflow-hidden mt-16 flex h-full w-full flex-col justify-between items-center gap-8 rounded-2xl bg-linear-to-b from-white from-25% to-[#00DDFF] pt-16 md:pt-24">
        <motion.div
          style={{ width }}
          className="absolute top-0 left-[50%] aspect-square w-[64rem] -translate-x-[50%] rounded-full border-[3px] border-white"
        />

        <motion.h1 className="relative z-10 bg-linear-to-t from-black to-[#AEAEAE] to-95% bg-clip-text text-center text-2xl md:text-4xl font-bold text-transparent w-full">
          Split Bills, Not Friendships with DoughSplit
        </motion.h1>

        <p className="max-w-96 md:max-w-xl -translate-y-3 text-center text-sm md:text-base">
          The hassle-free way to handle group expenses without the awkward "who
          owes what" conversations
        </p>

        <Button
          variant="secondary"
          icon={<ArrowRight color="white" size={20} />}
        >
          Get Started
        </Button>

        <motion.div
        
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.8 }}
        >
          <Image
            className="scale-75 md:scale-100"
            src="/Mockup.png"
            width={400}
            height={400}
            alt="MockUp"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
