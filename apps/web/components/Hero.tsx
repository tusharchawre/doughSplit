import Image from "next/image";
import React, { RefObject, useRef } from "react";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import Link from "next/link";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"],
  });
  const width = useTransform(scrollYProgress, [0, 0.3], ["64rem", "72rem"]);
  const paddingInline = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["0rem", "4vw"],
  );

  return (
    <motion.div
      ref={ref}
      style={{
        paddingInline,
      }}
      className="mb-16 h-screen w-full py-8"
    >
      <div className="relative mt-16 flex h-full w-full flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-linear-to-b from-white from-25% to-[#00DDFF] pt-16 md:pt-24">
        <motion.div
          style={{ width }}
          className="absolute top-0 left-[50%] aspect-square w-[64rem] -translate-x-[50%] rounded-full border-[3px] border-white"
        />

        <motion.h1 className="relative z-10 w-full bg-linear-to-t from-black to-[#AEAEAE] to-95% bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl">
          Split Bills, Not Friendships with DoughSplit
        </motion.h1>

        <p className="max-w-96 -translate-y-3 text-center text-sm md:max-w-xl md:text-base">
          The hassle-free way to handle group expenses without the awkward "who
          owes what" conversations
        </p>

        <Link href="/downloads" prefetch className="cursor-pointer">

        <Button
          variant="secondary"
          icon={<ArrowRight color="white" size={20} />}
        >
          Get Started
        </Button>
        </Link>
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
