"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface HeroSectionProps {
  onNavigate?: (sectionId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 100% Continuous Opacity Fade for Boxes 1, 2, 3 across scroll progress (0.05 -> 0.70)
  const otherBoxesOpacity = useTransform(scrollYProgress, [0.05, 0.70], [1, 0]);

  // Box 1 (Top-Left) Reactive Outward Motion
  const box1X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "0%" : "-40%"]);
  const box1Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "-100%" : "-40%"]);

  // Box 2 (Top-Right) Reactive Outward Motion
  const box2X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "0%" : "40%"]);
  const box2Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "-100%" : "-40%"]);

  // Box 3 (Bottom-Left) Reactive Outward Motion
  const box3X = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "0%" : "-40%"]);
  const box3Y = useTransform(scrollYProgress, [0.05, 0.70], ["0%", isMobile ? "-100%" : "40%"]);

  // Box 4 Anchor Expansion (Bottom: 0, Right: 0 remains strictly fixed)
  const box4Width = useTransform(scrollYProgress, [0.05, 0.75], [isMobile ? "100%" : "33.333333%", "100%"]);
  const box4Height = useTransform(scrollYProgress, [0.05, 0.75], [isMobile ? "40%" : "41.666667%", "100%"]);

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
    <div ref={containerRef} className="relative h-auto lg:h-[280vh] bg-[#18191B] text-neutral-100">
      {/* Sticky Viewport Framework for Desktop / Standard Flow for Mobile */}
      <section
        id="hero"
        className="relative lg:sticky top-0 w-full h-auto lg:h-screen flex flex-col bg-[#18191B] rounded-none lg:overflow-hidden z-20"
      >
        {/* Navbar Clearance Header Spacer */}
        <div className="w-full h-20 sm:h-24 shrink-0 bg-[#18191B] lg:block hidden" />

        {/* Relative Canvas (Takes EXACT Remaining Viewport Height: calc(100vh - 96px)) */}
        <div className="relative flex-1 min-h-0 w-full border-t-0 lg:border-t border-b border-neutral-800 bg-[#18191B] lg:overflow-hidden flex flex-col lg:block pt-24 lg:pt-0">
          
          {/* BOX 1: Top-Left (66.666% W x 58.333% H) */}
          <motion.div
            style={{
              x: isMobile ? 0 : box1X,
              y: isMobile ? 0 : box1Y,
              opacity: isMobile ? 1 : otherBoxesOpacity,
            }}
            className="relative lg:absolute top-0 left-0 w-full lg:w-[66.666667%] h-auto lg:h-[58.333333%] border-r-0 lg:border-r border-b border-neutral-800 rounded-none p-10 sm:p-14 lg:p-14 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden min-h-[30vh]"
          >
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold font-sans tracking-tight text-neutral-100 leading-tight uppercase max-w-xl text-center lg:text-left">
              SARUHASAN THAVACHELVAN IS A FULL-STACK SOFTWARE DEVELOPER.
            </p>
          </motion.div>

          {/* BOX 2: Top-Right (33.333% W x 58.333% H) */}
          <motion.div
            style={{
              x: isMobile ? 0 : box2X,
              y: isMobile ? 0 : box2Y,
              opacity: isMobile ? 1 : otherBoxesOpacity,
            }}
            className="relative lg:absolute top-0 right-0 w-full lg:w-[33.333333%] h-auto lg:h-[58.333333%] border-b border-neutral-800 rounded-none p-8 sm:p-12 lg:p-12 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden min-h-[25vh]"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-400 leading-tight uppercase max-w-md text-center lg:text-left">
              COMPUTING &amp; INFORMATION SYSTEMS DEGREE UNDERGRADUATE AT SABARAGAMUWA UNIVERSITY OF SRI LANKA.
            </p>
          </motion.div>

          {/* BOX 3: Bottom-Left (66.666% W x 41.666% H) */}
          <motion.div
            style={{
              x: isMobile ? 0 : box3X,
              y: isMobile ? 0 : box3Y,
              opacity: isMobile ? 1 : otherBoxesOpacity,
            }}
            className="relative lg:absolute bottom-0 left-0 w-full lg:w-[66.666667%] h-auto lg:h-[41.666667%] border-r-0 lg:border-r border-b lg:border-b-0 border-neutral-800 rounded-none p-8 sm:p-12 flex items-center justify-center bg-[#18191B] z-10 overflow-hidden min-h-[25vh]"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-400 leading-tight uppercase max-w-md text-center lg:text-left">
              CREATOR OF XMUSIC (STREAMING), LIFELINE (STORY PLATFORM), AND STHETICS (MOBILE FITNESS).
            </p>
          </motion.div>

          {/* BOX 4: Bottom-Right Anchor Expansion (bottom: 0, right: 0 fixed) */}
          <motion.div
            style={{
              width: isMobile ? "100%" : box4Width,
              height: isMobile ? "100%" : box4Height,
              borderTopColor: isMobile ? "rgba(39, 39, 42, 1)" : box4BorderColor,
              borderLeftColor: isMobile ? "rgba(39, 39, 42, 1)" : box4BorderColor,
              bottom: isMobile ? 'auto' : 0,
              right: isMobile ? 'auto' : 0,
              position: isMobile ? "relative" : "absolute",
              zIndex: 30,
            }}
            className="relative lg:absolute rounded-none p-10 sm:p-14 flex flex-col items-center justify-center bg-[#18191B] border-t-0 lg:border-t border-l-0 lg:border-l overflow-hidden text-center w-full min-h-[40vh] lg:min-h-0"
          >
            {/* Header Status Tag (Absolute - gradual enter & gradual exit fade) */}
            <motion.div
              style={{ 
                opacity: isMobile ? 1 : revealOpacity, 
                y: isMobile ? 0 : revealY 
              }}
              className="relative lg:absolute top-0 left-0 lg:top-14 lg:left-14 flex flex-col sm:flex-row items-center gap-3 z-40 mb-8 lg:mb-0 w-full lg:w-auto justify-center"
            >
              <span className="px-3 py-1 rounded bg-neutral-800 text-neutral-200 font-mono text-xs uppercase font-bold tracking-widest">
                01 ME / AUTHOR STATUS
              </span>
              <span className="text-xs font-mono text-neutral-500 uppercase">
                SABARAGAMUWA UNIVERSITY OF SRI LANKA
              </span>
            </motion.div>

            {/* PRIMARY HERO TEXT - CENTERED IN BOX */}
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold font-sans tracking-tight text-neutral-100 leading-tight uppercase max-w-md lg:max-w-3xl z-40">
              AVAILABLE FOR HIGH-IMPACT SOFTWARE ENGINEERING ROLES AND GLOBAL COLLABORATIONS.
            </p>

            {/* MINIMAL COMPLEMENTARY CONTEXT & LEAD-IN BUTTON (Absolute - gradual enter & gradual exit fade) */}
            <motion.div
              style={{
                opacity: isMobile ? 1 : revealOpacity,
                y: isMobile ? 0 : revealY,
                pointerEvents: isMobile ? 'auto' : revealPointerEvents,
              }}
              className="relative lg:absolute bottom-0 left-0 right-0 lg:bottom-14 lg:left-14 lg:right-14 mt-8 lg:mt-0 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 z-40 w-full"
            >
              <p className="text-xs sm:text-sm font-sans text-neutral-400 max-w-md leading-relaxed text-left">
                Computing &amp; Information Systems undergraduate at Sabaragamuwa University of Sri Lanka with in-depth knowledge in JavaScript, full-stack web platforms &amp; mobile apps.
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
