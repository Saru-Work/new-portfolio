"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function BootSequence() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const steps = [
    "/ INITIALIZING...",
    "/ LOADING PROFILE...",
    "/ MOUNTING CONSTELLATION...",
    "SYSTEM READY."
  ];

  const totalSteps = steps.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 350);
          return prev;
        }
      });
    }, 240);

    return () => clearInterval(interval);
  }, [totalSteps]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#18191B] text-white"
        >
          <div className="flex flex-col items-center space-y-4 px-6">
            <div className="flex items-center space-x-2 text-neutral-300 font-mono text-sm tracking-wider">
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span>SARUHASAN // v2026</span>
            </div>

            <div className="h-8 flex items-center">
              <motion.span
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-neutral-400 tracking-widest uppercase"
              >
                {steps[step]}
              </motion.span>
            </div>

            <div className="w-48 h-1 bg-neutral-900 rounded-full overflow-hidden relative border border-neutral-800">
              <motion.div
                className="h-full bg-neutral-200"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
