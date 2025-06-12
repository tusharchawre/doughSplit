"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BillSplit } from "./ui/gridElem/billSplit";
import { ScanSplit } from "./ui/gridElem/scanSplit";
import { TrackExpenses } from "./ui/gridElem/trackExpenses";
import { SettleUp } from "./ui/gridElem/settleUp";

export const Features = () => {
  return (
    <div className="my-8 mb-24 min-h-[600px] w-full px-4 py-2 md:my-12 md:mb-48 md:h-[1080px] md:px-32">
      <h1 className="w-full text-center text-2xl font-semibold md:text-3xl">
        Everything you need
      </h1>
      <p className="text-muted-background mx-auto my-4 w-full text-center text-sm md:w-3xl">
        Split bills effortlessly, track expenses in real-time, and settle up
        with friends - all in one place. Our smart features make managing shared
        expenses as easy as splitting a pizza.
      </p>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex flex-col items-start justify-around gap-4 overflow-hidden rounded-xl bg-neutral-100 px-6 py-6 md:col-span-2 md:px-10">
          <BillSplit />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-6 py-6 md:col-span-1 md:px-8">
          <ScanSplit />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-6 py-6 md:col-span-1 md:px-10">
          <TrackExpenses />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-6 py-6 md:col-span-2 md:px-10">
          <SettleUp />
        </div>
      </div>
    </div>
  );
};
