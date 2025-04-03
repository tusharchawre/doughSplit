"use client";

import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";
import { useRef } from "react";

const HomePage = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
};

export default HomePage;
