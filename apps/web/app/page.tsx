"use client";

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
      <div className="w-full h-screen">

      </div>
    </div>
  );
};

export default HomePage;
