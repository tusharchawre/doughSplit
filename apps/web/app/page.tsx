"use client"
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'motion/react';

// Phone Model Component
function PhoneModel() {
  const { scene } = useGLTF('./smartphone.glb');
  
  return <primitive object={scene} scale={0.5} />;
}

// Main Landing Page Component
function PhoneLandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Rotate and twist transformations based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, Math.PI]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div ref={ref} className="h-[300vh] w-full relative">
      <div className="h-screen sticky top-0 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <motion.hgroup 
            style={{
              rotateX,
              rotateY,
              scale
            }}
          >
            <PhoneModel />
          </motion.hgroup>
          
          <OrbitControls />
        </Canvas>
      </div>
      
      {/* Content sections */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10 pointer-events-none">
        <h1 className="text-4xl font-bold mb-4">Your Phone, Reimagined</h1>
        <p className="text-xl">Scroll to explore the design</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <PhoneLandingPage />
    </div>
  );
}