"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 100% Continuous Opacity Fade for Boxes 1, 2, 3 across scroll progress (0.05 -> 0.70)
  const otherBoxesOpacity = useTransform(scrollYProgress, [0.05, 0.70], [1, 0]);

  // Box 1 (Top-Left) Reactive Outward Motion
  const box1X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "-40%"]);
  const box1Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "-40%"]);

  // Box 2 (Top-Right) Reactive Outward Motion
  const box2X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "40%"]);
  const box2Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "-40%"]);

  // Box 3 (Bottom-Left) Reactive Outward Motion
  const box3X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "-40%"]);
  const box3Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", "40%"]);

  // Box 4 Anchor Expansion (Bottom: 0, Right: 0 remains strictly fixed)
  const box4Width = useTransform(scrollYProgress, [0.05, 0.75], ["33.333333%", "100%"]);
  const box4Height = useTransform(scrollYProgress, [0.05, 0.75], ["41.666667%", "100%"]);

  // Gradual Border Fade for Growing Box 4
  const box4BorderColor = useTransform(
    scrollYProgress,
    [0.1, 0.65],
    ["rgba(39, 39, 42, 1)", "rgba(39, 39, 42, 0)"]
  );

  // Smooth enter AND gradual exit fade out for revealed metadata text
  const revealOpacity = useTransform(scrollYProgress, [0.72, 0.85, 0.92, 0.99], [0, 1, 1, 0]);
  const revealY = useTransform(scrollYProgress, [0.72, 0.85, 0.92, 0.99], [20, 0, 0, -20]);
  const revealPointerEvents = useTransform(scrollYProgress, (v) => (v > 0.8 && v < 0.98 ? "auto" : "none"));

  return (
    <div ref={containerRef} className="relative h-[280vh] bg-[#18191B] text-neutral-100">
      {/* Sticky Viewport Framework - Exact 100vh Height (Zero Bottom Overflow) */}
      <section
        id="hero"
        className="sticky top-0 w-full h-screen flex flex-col bg-[#18191B] rounded-none overflow-hidden z-20"
      >
        {/* Navbar Clearance Header Spacer */}
        <div className="w-full h-20 sm:h-24 shrink-0 bg-[#18191B]" />

        {/* Relative Canvas (Takes EXACT Remaining Viewport Height: calc(100vh - 96px)) */}
        <div className="relative flex-1 min-h-0 w-full border-t border-b border-neutral-800 bg-[#18191B] overflow-hidden">
          
          {/* BOX 1: Top-Left (66.666% W x 58.333% H) */}
          <motion.div
            style={{
              x: box1X,
              y: box1Y,
              opacity: otherBoxesOpacity,
            }}
            className="absolute top-0 left-0 w-[66.666667%] h-[58.333333%] border-r border-b border-neutral-800 rounded-none p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden"
          >
            <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-neutral-100 leading-tight uppercase max-w-xl">
              SARUHASAN IS A COMPUTER SCIENCE ENGINEER BUILDING SPATIAL WEB SOFTWARE.
            </p>
          </motion.div>

          {/* BOX 2: Top-Right (33.333% W x 58.333% H) */}
          <motion.div
            style={{
              x: box2X,
              y: box2Y,
              opacity: otherBoxesOpacity,
            }}
            className="absolute top-0 right-0 w-[33.333333%] h-[58.333333%] border-b border-neutral-800 rounded-none p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden"
          >
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-400 leading-tight uppercase max-w-md">
              DRIVEN BY DETERMINISTIC ARCHITECTURE, PHYSICAL DIGITALITY, AND SUB-MILLISECOND PERFORMANCE.
            </p>
          </motion.div>

          {/* BOX 3: Bottom-Left (66.666% W x 41.666% H) */}
          <motion.div
            style={{
              x: box3X,
              y: box3Y,
              opacity: otherBoxesOpacity,
            }}
            className="absolute bottom-0 left-0 w-[66.666667%] h-[41.666667%] border-r border-neutral-800 rounded-none p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden"
          >
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-400 leading-tight uppercase max-w-md">
              ARCHITECTING BROWSER-NATIVE SPATIAL OPERATING SYSTEMS AND AUTONOMOUS AI PIPELINES.
            </p>
          </motion.div>

          {/* BOX 4: Bottom-Right Anchor Expansion (bottom: 0, right: 0 fixed) */}
          <motion.div
            style={{
              width: box4Width,
              height: box4Height,
              borderTopColor: box4BorderColor,
              borderLeftColor: box4BorderColor,
              bottom: 0,
              right: 0,
              position: "absolute",
              zIndex: 30,
            }}
            className="rounded-none p-6 sm:p-10 lg:p-14 flex items-center justify-center bg-[#18191B] border-t border-l overflow-hidden text-center relative"
          >
            {/* Header Status Tag (Absolute - gradual enter & gradual exit fade) */}
            <motion.div
              style={{ opacity: revealOpacity, y: revealY }}
              className="absolute top-6 left-6 sm:top-10 sm:left-10 lg:top-14 lg:left-14 flex items-center gap-3 z-40"
            >
              <span className="px-3 py-1 rounded bg-neutral-800 text-neutral-200 font-mono text-xs uppercase font-bold tracking-widest">
                01 ME / AUTHOR STATUS
              </span>
              <span className="text-xs font-mono text-neutral-500">
                BENGALURU, INDIA (IST UTC+5:30)
              </span>
            </motion.div>

            {/* PRIMARY HERO TEXT - CENTERED IN BOX */}
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-100 leading-tight uppercase max-w-md lg:max-w-3xl z-40">
              AVAILABLE FOR HIGH-IMPACT SOFTWARE ENGINEERING ROLES AND GLOBAL COLLABORATIONS.
            </p>

            {/* MINIMAL COMPLEMENTARY CONTEXT & LEAD-IN BUTTON (Absolute - gradual enter & gradual exit fade) */}
            <motion.div
              style={{
                opacity: revealOpacity,
                y: revealY,
                pointerEvents: revealPointerEvents,
              }}
              className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 lg:bottom-14 lg:left-14 lg:right-14 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-40"
            >
              <p className="text-xs sm:text-sm font-sans text-neutral-400 max-w-md leading-relaxed text-left">
                Computer Science student &amp; software engineer bridging spatial Web UI craftsmanship with deterministic system architecture.
              </p>

              {onNavigate && (
                <button
                  onClick={() => onNavigate("me")}
                  data-cursor="ME"
                  className="flex items-center gap-2 px-6 py-3 rounded-none bg-neutral-100 text-neutral-950 font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors shrink-0"
                >
                  <Terminal className="w-4 h-4 text-neutral-950" />
                  <span>EXPLORE PROFILE</span>
                  <ArrowDown className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
