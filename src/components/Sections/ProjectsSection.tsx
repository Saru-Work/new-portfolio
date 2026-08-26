"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { ExternalLink, Github, X, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PROJECT_LETTERS = ["P", "R", "O", "J", "E", "C", "T", "S"];

function DismantlingLetter({
  letter,
  index,
  totalLetters,
  smoothProgress,
  isMobile,
}: {
  letter: string;
  index: number;
  totalLetters: number;
  smoothProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const reverseIndex = totalLetters - 1 - index;

  // FORWARD FLIGHT (Left 0vw -> Right 58vw)
  const fStart = 0.02 + reverseIndex * 0.02;
  const fP1 = fStart + 0.04;
  const fEnd = fStart + 0.22; // Travel to 58vw on right
  const fScaleUp = fEnd + 0.06; // Scales up to 1.0 AFTER arriving

  // RETURN FLIGHT (Right 58vw -> Left 0vw)
  const rStart = 0.44 + index * 0.018;
  const rP1 = rStart + 0.04;
  const rEnd = rStart + 0.22; // Return travel to 0vw on left
  const rScaleUp = rEnd + 0.06; // Scales up to 1.0 AFTER arriving

  const targetX = isMobile ? "35vw" : "58vw";
  const returnP1 = isMobile ? "30vw" : "52vw";

  // Horizontal position trajectory
  const x = useTransform(
    smoothProgress,
    [fStart, fP1, fEnd, fScaleUp, rStart, rP1, rEnd, rScaleUp, 1],
    ["0vw", "6vw", targetX, targetX, targetX, returnP1, "0vw", "0vw", "0vw"]
  );

  // Scale trajectory: Stays at 0.125 (6px) throughout flight, scales up to 1.0 ONLY AFTER arriving!
  const scale = useTransform(
    smoothProgress,
    [fStart, fP1, fEnd, fScaleUp, rStart, rP1, rEnd, rScaleUp, 1],
    [1, 0.125, 0.125, 1, 1, 0.125, 0.125, 1, 1]
  );

  // Gentle vertical arc during flight
  const y = useTransform(
    smoothProgress,
    [fStart, fP1, fEnd, fScaleUp, rStart, rP1, rEnd, rScaleUp, 1],
    [0, -12, 0, 0, 0, -12, 0, 0, 0]
  );

  // Crisp Light Dark Mode Tone Shimmer during flight
  const color = useTransform(
    smoothProgress,
    [fStart, fEnd, fScaleUp, rStart, rEnd, rScaleUp, 1],
    ["#F0EFEA", "#A09A90", "#F0EFEA", "#F0EFEA", "#A09A90", "#F0EFEA", "#F0EFEA"]
  );

  return (
    <motion.span
      style={{ x, scale, y, color }}
      className="inline-block font-mono font-bold select-none origin-center"
    >
      {letter}
    </motion.span>
  );
}

const CARD_ANIMATION_VARIANTS = [
  {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const },
  },
  {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const },
  },
];

const LIQUID_FLUID_REVEALS = [
  {
    // Card 01: Top-Left Organic Fluid Unroll
    initial: {
      clipPath: "inset(0% 88% 88% 0% round 32px 0px 48px 0px)",
      scale: 1.18,
      filter: "blur(14px)",
      opacity: 0.2,
    },
    whileInView: {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
    },
    transition: {
      duration: 1.05,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  {
    // Card 02: Top-Left Asymmetric Wave Flow
    initial: {
      clipPath: "inset(0% 94% 80% 0% round 40px 0px 24px 0px)",
      scale: 1.15,
      filter: "blur(12px)",
      opacity: 0.2,
    },
    whileInView: {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
    },
    transition: {
      duration: 1.15,
      delay: 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  {
    // Card 03: Top-Left Ripple Expansion
    initial: {
      clipPath: "inset(0% 82% 94% 0% round 28px 0px 36px 0px)",
      scale: 1.2,
      filter: "blur(16px)",
      opacity: 0.2,
    },
    whileInView: {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
    },
    transition: {
      duration: 1.1,
      delay: 0.2,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
];

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 35,
    mass: 1.2,
    restDelta: 0.0001,
  });

  return (
    <section
      ref={containerRef}
      id="build"
      className="w-full min-h-[190vh] relative bg-[#0E0F12] text-[#F0EFEA] border-t border-b border-neutral-800/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-4 sm:pb-6">
        {/* Section 03 Index & Subtitle (Scrolls in normal flow) */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <span className="text-xs font-mono font-semibold tracking-widest uppercase text-neutral-400">
              [03]
            </span>
            <div className="h-px w-8 bg-neutral-800" />
          </div>

          <p className="text-sm sm:text-base max-w-2xl font-sans text-neutral-300 leading-relaxed">
            Autonomous agent platforms, spatial desktop engines, and real-time telemetry systems.
          </p>
        </div>

        {/* STICKY DISMANTLING LETTER WAVE - Crisp Light Dark Mode Palette */}
        <div className="sticky top-16 sm:top-20 z-30 mb-8 sm:mb-12 py-2 pointer-events-none flex items-center gap-1 sm:gap-1.5 text-3xl sm:text-4xl md:text-5xl uppercase">
          {PROJECT_LETTERS.map((letter, idx) => (
            <DismantlingLetter
              key={idx}
              letter={letter}
              index={idx}
              totalLetters={PROJECT_LETTERS.length}
              smoothProgress={smoothProgress}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* DIAGNOAL STAIRCASE PROJECT CARDS (Sharp Edges, Micro Footer Typography) */}
        <div className="flex flex-col space-y-12 sm:space-y-16 relative pb-2">
          {projects.map((project, index) => {
            const variant = CARD_ANIMATION_VARIANTS[index % CARD_ANIMATION_VARIANTS.length];
            const liquidReveal = LIQUID_FLUID_REVEALS[index % LIQUID_FLUID_REVEALS.length];
            const marginClasses =
              index === 0
                ? "md:ml-0"
                : index === 1
                ? "md:ml-[30%]"
                : "md:ml-[60%]";

            return (
              <motion.div
                key={project.id}
                initial={variant.initial}
                whileInView={variant.whileInView}
                viewport={{ once: true, margin: "-50px" }}
                transition={variant.transition}
                className={`group w-full md:w-[40%] flex flex-col justify-between ${marginClasses}`}
              >
                {/* Top Category Label */}
                <div className="mb-2">
                  <span className="text-xs sm:text-sm font-mono font-medium tracking-widest text-neutral-400 uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Main Headline Title (Matching User Reference Image) */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium tracking-tight text-white mb-6 leading-tight group-hover:text-neutral-100 transition-colors">
                  {project.tagline}.
                </h3>

                {/* Giant Immersive Mockup Image Container (Sharp Edges rounded-none) */}
                <motion.div
                  initial={liquidReveal.initial}
                  whileInView={liquidReveal.whileInView}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={liquidReveal.transition}
                  className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-none overflow-hidden bg-[#15161A] border border-neutral-800/90 shadow-2xl transition-colors duration-500 group-hover:border-neutral-700"
                >
                  {project.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={`${project.title} Interface Preview`}
                      className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#18191E] text-neutral-500">
                      <span className="text-xs font-mono uppercase tracking-widest">[ IMAGE PLACEHOLDER ]</span>
                    </div>
                  )}

                  {/* Gradient Scrim & Micro-Typography Action Bar Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-200">
                          {project.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-none bg-white/10 text-neutral-300 font-semibold uppercase tracking-wider backdrop-blur-xs border border-white/10">
                          {project.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveProjectModal(project)}
                          data-cursor="INSPECT"
                          className="flex items-center gap-1 text-[10px] font-mono font-bold text-white hover:text-neutral-200 tracking-wider uppercase transition-colors px-2.5 py-1 rounded-none bg-white/15 backdrop-blur-md border border-white/20 hover:bg-white/25"
                        >
                          <span>INSPECT SPEC</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="CODE"
                          className="p-1 rounded-none bg-white/15 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Project Detail Drawer / Modal - Sleek Dark Theme */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectModal(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-xs"
              />

              {/* Modal Box (Sleek Dark Surface, Sharp Edges) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl bg-[#141519] border border-neutral-800 rounded-none p-6 sm:p-10 shadow-2xl z-10 my-auto text-[#F0EFEA]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  data-cursor="CLOSE"
                  className="absolute top-6 right-6 p-2 rounded-none bg-[#22242B] border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-none bg-[#F0EFEA] text-neutral-950 uppercase font-bold tracking-wider">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {activeProjectModal.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-mono font-extrabold text-[#F0EFEA] uppercase tracking-tight mb-2">
                  {activeProjectModal.title}
                </h2>

                <p className="text-sm font-sans text-neutral-300 mb-6">
                  {activeProjectModal.tagline}
                </p>

                {/* Problem / Solution / Result Breakdown */}
                <div className="space-y-4 mb-6 text-sm font-sans">
                  <div className="p-4 rounded-none bg-[#1C1D22] border border-neutral-800">
                    <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase mb-1">
                      01 / THE CHALLENGE
                    </h4>
                    <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-[#1C1D22] border border-neutral-800">
                    <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase mb-1">
                      02 / ARCHITECTURAL SOLUTION
                    </h4>
                    <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.solution}
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-[#1C1D22] border border-neutral-800">
                    <h4 className="text-xs font-mono font-bold text-neutral-200 uppercase mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>03 / QUANTIFIED RESULT</span>
                    </h4>
                    <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.result}
                    </p>
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase mb-2">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-none bg-[#22242B] border border-neutral-700 text-xs font-mono text-neutral-200 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="REPOS"
                    className="flex items-center gap-2 px-6 py-3 rounded-none bg-[#22242B] hover:bg-[#2A2C35] border border-neutral-700 text-xs font-mono text-neutral-200 transition-colors font-bold tracking-wider"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW REPOSITORY</span>
                  </a>

                  {activeProjectModal.liveUrl && (
                    <a
                      href={activeProjectModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="DEMO"
                      className="flex items-center gap-2 px-6 py-3 rounded-none bg-[#F0EFEA] hover:bg-white text-neutral-950 font-mono text-xs font-bold tracking-wider transition-colors"
                    >
                      <span>LAUNCH LIVE SYSTEM</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
