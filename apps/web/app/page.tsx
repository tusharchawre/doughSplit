"use client";

import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";
import { useRef } from "react";

const HomePage = () => {
  return (
    <div className="h-fit w-full">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="download">
        <Testimonials />
      </div>
      <div id="faqs">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
