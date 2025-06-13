"use client";
import { ArrowDown, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";
import { useScroll, motion, useTransform, AnimatePresence } from "motion/react";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [menu, setMenu] = useState(false);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "100vh"],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 12]);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.85)"],
  );
  const backdropBlur = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(10px)"],
  );

  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0 4px 6px rgba(0, 0, 0, 0)", "0 8px 24px rgba(0, 0, 0, 0.2)"],
  );

  const width = useTransform(scrollYProgress, [0, 0.5], ["70vw", "60vw"]);

  // Button animation
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const visibility = useTransform(scrollYProgress, (value) =>
    value > 0.5 ? "hidden" : "visible",
  );

  const navPosition = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 200]);

  const navItem = ["Home", "Features", "Testimonials", "About Us"];

  if (isMobile) {
    return (
      <div className="flex h-fit w-full justify-center">
        <motion.div
          layout
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          style={{
            borderRadius,
            backgroundColor,
            boxShadow,
            width: width,
          }}
          className="fixed z-50 mx-auto mt-2 flex h-14 w-full max-w-6xl items-center justify-between px-8 transition-all duration-300 ease-in-out"
        >
          <p className="text-xl font-bold">doughSplit</p>

          <motion.div className="relative z-50">
            <motion.button
              onClick={() => setMenu((prev) => !prev)}
              className="relative flex items-center justify-center p-1"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: menu ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "anticipate" }}
              >
                {menu ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.95,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                className="fixed inset-x-0 top-16 z-40 mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white/90 shadow-lg"
              >
                <div className="flex w-full flex-col items-center py-6">
                  {navItem.map((item, index) => (
                    <motion.a
                      key={index}
                      href={`#${item.toLowerCase()}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0.05 * index,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        transition: {
                          delay: 0.02 * (navItem.length - index - 1),
                          duration: 0.15,
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        color: "#3b82f6",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="my-3 w-full px-6 py-2 text-center text-lg font-medium transition-colors"
                      onClick={() => setMenu(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-30 bg-black/5"
                onClick={() => setMenu(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className="flex h-fit w-full justify-center">
        <motion.div
          layout
          transition={{
            ease: "easeInOut",
            duration: 0.5,
          }}
          style={{
            borderRadius,
            backgroundColor,
            boxShadow,
            backdropFilter: backdropBlur,
            width: width,
          }}
          className="fixed z-50 mx-auto mt-2 flex h-14 w-full max-w-6xl items-center justify-between px-8 backdrop-blur-md transition-all duration-300 ease-in-out"
        >
          <Link href="/" prefetch className="cursor-pointer">
          <p className="text-xl font-bold">doughSplit</p>
          </Link>

          <motion.div
            className="absolute left-1/2 flex -translate-x-1/2 transform gap-12 text-sm font-medium"
            style={{
              x: navPosition,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {navItem.map((item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase()}`}
                layout
                whileHover={{ scale: 1.05, color: "#3b82f6" }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  delay: 0.05 * index,
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                }}
                className="cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
            <Link href="/downloads" prefetch className="cursor-pointer">
          <motion.div style={{ opacity, visibility }}>
            <Button icon={<ArrowDown color="white" size={20} />}>
              Download
            </Button>
          </motion.div>
            </Link>
        </motion.div>
      </div>
    );
  }
};
