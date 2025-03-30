"use client";

import { Navbar } from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="flex h-screen w-full justify-center">
      <Navbar />
      <div className="w-full h-fit flex flex-col">
        <div className="h-screen w-full"></div>
        <div className="bg-red-500 h-screen w-full"></div>
      </div>
    </div>
  );
};

export default HomePage;
