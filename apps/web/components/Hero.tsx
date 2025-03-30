import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="h-screen w-full px-12 py-8">
      <div className="relative mt-16 flex h-full w-full flex-col items-center gap-4 rounded-2xl bg-linear-to-b from-white from-25% to-[#00DDFF] py-32">
        <div className="absolute top-0 left-[50%] aspect-square w-[64rem] -translate-x-[50%] rounded-full border-[3px] border-white" />
        <Image
          className="absolute bottom-0 left-[50%] -translate-x-[50%]"
          src="/Mockup.png"
          width={400}
          height={400}
          alt="MockUp"
        />

        <h1 className="relative z-10 bg-linear-to-t from-black to-[#AEAEAE] to-95% bg-clip-text text-center text-4xl font-bold text-transparent">
          Split Bills, Not Friendships with DoughSplit
        </h1>

        <p className="max-w-xl -translate-y-3 text-center text-base">
          The hassle-free way to handle group expenses without the awkward "who
          owes what" conversations
        </p>

        <Button
          variant="secondary"
          icon={<ArrowRight color="white" size={20} />}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};
