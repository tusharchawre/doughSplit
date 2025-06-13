"use client";
import { Navbar } from "@/components/Navbar";
import { motion } from "motion/react";
import { Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BsGooglePlay } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl h-16 md:text-5xl font-bold bg-gradient-to-r from-[#0077B7] to-[#00DDFF] bg-clip-text text-transparent mb-4">
            Download DoughSplit
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Get the app and start splitting bills with friends effortlessly.
            Available for iOS and Android devices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-8"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://apps.apple.com/app/doughsplit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<Apple size={20} />}
                  >
                    App Store
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <p>Not enough money to host it</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://play.google.com/store/apps/details?id=com.doughsplit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon={<BsGooglePlay size={20} />}
                  >
                    Google Play
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                <p>Not enough money to host it</p>
              </TooltipContent>
            </Tooltip>

            <a
              href="/downloads/doughsplit.apk"
              download
              className="inline-block"
            >
              <Button
                icon={<Smartphone size={20} />}
              >
                Download APK
              </Button>
            </a>
          </TooltipProvider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 max-w-md"
        >
          <h2 className="text-xl font-semibold mb-2">System Requirements</h2>
          <ul className="text-neutral-600 text-left mx-auto inline-block">
            <li>• iOS 12.0 or later</li>
            <li>• Android 8.0 or later</li>
            <li>• APK: Android 8.0 or later</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}