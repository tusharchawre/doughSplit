"use client";

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

const HomePage = () => {
  return (
    <div className="flex h-screen w-full justify-center">
      <Navbar />
      <Hero />
    </div>
  );
};

export default HomePage;
