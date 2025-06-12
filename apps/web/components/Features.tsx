"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BillSplit } from "./ui/gridElem/billSplit";
import { ScanSplit } from "./ui/gridElem/scanSplit";
import { TrackExpenses } from "./ui/gridElem/trackExpenses";
import { SettleUp } from "./ui/gridElem/settleUp";

export const Features = () => {
  return (
    <div className="h-[1080px] my-12 mb-24 w-full px-8 py-2 md:px-32">
      <h1 className="w-full text-center font-semibold text-3xl">Everything you need</h1>
      <p className="text-center mx-auto my-4 w-3xl text-muted-background text-sm">
        Split bills effortlessly, track expenses in real-time, and settle up with friends - all in one place. Our smart features make managing shared expenses as easy as splitting a pizza.
      </p>
      <div className="grid-col-1 grid my-4 grid-rows-2 gap-4  md:grid-cols-3 ">

        <div className="flex flex-col items-start justify-around gap-4 overflow-hidden rounded-xl bg-neutral-100 px-10 py-6 md:col-span-2">
          <BillSplit />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-8 py-6 md:col-span-1">
          <ScanSplit />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-6 md:col-span-1">
          <TrackExpenses />
        </div>

        <div className="flex flex-col items-start justify-around rounded-xl bg-neutral-100 px-10 py-6 md:col-span-2">
          <SettleUp />
        </div>
      </div>
    </div>
  );
};
