"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BillSplit } from "./ui/gridElem/billSplit";
import { ScanSplit } from "./ui/gridElem/scanSplit";

export const Features = () => {
  return (
    <div className="grid-col-1 grid h-screen w-full grid-rows-2 gap-4 px-8 py-2 md:grid-cols-3 md:px-16">
      <div className="flex flex-col items-start justify-around gap-4 overflow-hidden rounded-xl bg-neutral-100 px-10 py-6 md:col-span-2">
        <BillSplit />
      </div>

      <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-8 py-6 md:col-span-1">
        <ScanSplit />
      </div>

      <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-6 md:col-span-1"></div>

      <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-6 md:col-span-2"></div>
    </div>
  );
};
