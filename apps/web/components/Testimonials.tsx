import React from "react";

export const Testimonials = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="relative h-full w-full flex flex-col gap-2 items-center justify-center">
        <div className="absolute inset-0 blur-[100px]">
          <div className="absolute -top-[30%] -left-80 z-10 aspect-square w-4xl rounded-full bg-white" />
          <div className="absolute -top-[10%] -left-80 aspect-square w-4xl rounded-full bg-[#8C00FF]" />
          <div className="absolute -right-80 -bottom-[30%] z-10 aspect-square w-4xl rounded-full bg-white" />
          <div className="absolute -right-80 -bottom-[10%] aspect-square w-4xl rounded-full bg-[#00FFF2]" />
        </div>
        
        <p className="relative z-50 text-[#0077B7] text-sm font-semibold">What people are saying</p>
        <p className="relative z-50 text-black text-3xl font-semibold">Trusted By Me</p>
        <p className="relative z-50 text-neutral-400 text-sm">(Singularly)</p>

      </div>
    </div>
  );
};