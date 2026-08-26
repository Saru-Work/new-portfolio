"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Terminal,
  ArrowUpRight,
  Code2,
  Database,
  Sparkles,
  Rocket,
  Atom,
  Globe,
  FileCode2,
  Palette,
  Server,
  Zap,
  Network,
  Layout,
  MousePointer2,
  Activity,
  Box,
  GitBranch,
  Workflow,
  CloudUpload,
} from "lucide-react";

interface TechItem {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface ExpertiseCategory {
  id: string;
  number: string;
  date: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  technologies: TechItem[];
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const EXPERTISE_DATA: ExpertiseCategory[] = [
  {
    id: "build",
    number: "01",
    date: "March 20, 2026",
    tag: "FRONTEND & SYSTEMS",
    title: "Profile",
    headline: "Frontend: We build spatial web interfaces and component architecture",
    description: "Architecting high-performance spatial web interfaces and accessible digital experiences using React 19, Next.js, TypeScript, and Tailwind CSS. We ask about your design systems, server-driven architecture, and zero-layout-shift frontends.",
    technologies: [
      { name: "React", icon: Atom },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: FileCode2 },
      { name: "Tailwind CSS", icon: Palette },
    ],
    icon: Code2,
    accentColor: "#1D1E20",
    bgColor: "bg-[#EAE3D2]",
    textColor: "text-[#2B2927]",
    borderColor: "border-0",
  },
  {
    id: "connect",
    number: "02",
    date: "January 14, 2026",
    tag: "BACKEND & APIS",
    title: "Profile",
    headline: "Telemetry & APIs: Building real-time backend services & infrastructure",
    description: "Engineering deterministic backend services, real-time telemetry pipelines, and low-latency API infrastructure using Node.js, Express, WebSockets, and PostgreSQL for high-throughput data processing.",
    technologies: [
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Zap },
      { name: "REST APIs", icon: Network },
      { name: "Databases", icon: Database },
    ],
    icon: Database,
    accentColor: "#14231E",
    bgColor: "bg-[#DDE5D7]",
    textColor: "text-[#2B2927]",
    borderColor: "border-0",
  },
  {
    id: "create",
    number: "03",
    date: "April 1, 2026",
    tag: "MOTION & INTERACTION",
    title: "Profile",
    headline: "Motion: Crafting physics-driven micro-interactions & web digitality",
    description: "Designing fluid interactive experiences, scroll-driven choreography, and tactile digital interfaces using GSAP, Framer Motion, and WebGL to create memorable web journeys.",
    technologies: [
      { name: "UI Design", icon: Layout },
      { name: "Interaction", icon: MousePointer2 },
      { name: "GSAP", icon: Sparkles },
      { name: "Framer Motion", icon: Activity },
    ],
    icon: Sparkles,
    accentColor: "#1F1B29",
    bgColor: "bg-[#EADCD9]",
    textColor: "text-[#2B2927]",
    borderColor: "border-0",
  },
  {
    id: "ship",
    number: "04",
    date: "January 22, 2024",
    tag: "DEVOPS & DEPLOYMENT",
    title: "Profile",
    headline: "DevOps: Orchestrating containerized pipelines & cloud infrastructure",
    description: "Orchestrating containerized deployment workflows, automated CI/CD release pipelines, and secure cloud infrastructure using Linux, Docker, Git, and GitHub Actions with zero-downtime deployments.",
    technologies: [
      { name: "Linux", icon: Terminal },
      { name: "Docker", icon: Box },
      { name: "Git", icon: GitBranch },
      { name: "GitHub Actions", icon: Workflow },
      { name: "Deployment", icon: CloudUpload },
    ],
    icon: Rocket,
    accentColor: "#262018",
    bgColor: "bg-[#DCE1E7]",
    textColor: "text-[#2B2927]",
    borderColor: "border-0",
  },
];

const HEADLINE_LETTERS = [
  { char: "W", hoverColor: "#F0EAE1", cursor: "BEIGE" },
  { char: "H", hoverColor: "#B5D8C5", cursor: "SAGE" },
  { char: "A", hoverColor: "#FAF9F6", cursor: "PEARL" },
  { char: "T", hoverColor: "#F3E5AB", cursor: "GOLD" },
  { char: " ", hoverColor: "transparent", cursor: "DEFAULT" },
  { char: "I", hoverColor: "#C8E6C9", cursor: "MINT" },
  { char: " ", hoverColor: "transparent", cursor: "DEFAULT" },
  { char: "B", hoverColor: "#F8C8DC", cursor: "ROSE" },
  { char: "U", hoverColor: "#E6C280", cursor: "SAND" },
  { char: "I", hoverColor: "#A8E6CF", cursor: "JADE" },
  { char: "L", hoverColor: "#E1EEF6", cursor: "ICE" },
  { char: "D", hoverColor: "#FFFFFF", cursor: "WHITE" },
];

function VerticalLetterSpan({
  char,
  hoverColor,
  cursor,
  scrollYProgress,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  char: string;
  hoverColor: string;
  cursor: string;
  scrollYProgress: MotionValue<number>;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const start = index * 0.012;
  const end = start + 0.035;

  const scrollOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scrollYOffset = useTransform(scrollYProgress, [start, end], [4, 0]);

  if (char === " ") {
    return <span className="inline-block w-4 sm:w-8" />;
  }

  // Pure vertical movement in a strict small range (max 10px lift)
  let hoverY = 0;
  let targetColor = "#1C1D1F"; // dark charcoal default for light background

  if (hoveredIndex !== null) {
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) {
      hoverY = -10;
      targetColor = hoverColor;
    } else if (distance === 1) {
      hoverY = -5;
      targetColor = "#555555";
    } else if (distance === 2) {
      hoverY = -2;
      targetColor = "#888888";
    }
  }

  return (
    <motion.div
      style={{ opacity: scrollOpacity, y: scrollYOffset }}
      className="inline-block"
    >
      <motion.span
        onMouseEnter={() => setHoveredIndex(index)}
        animate={{ y: hoverY, color: targetColor }}
        transition={{ type: "spring", stiffness: 450, damping: 26 }}
        data-cursor={cursor}
        className="cursor-pointer inline-block font-black select-none"
      >
        {char}
      </motion.span>
    </motion.div>
  );
}

function HeadlineRow({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHoveredIndex(null)}
      className="flex flex-wrap items-baseline gap-1 sm:gap-2 font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none py-4"
    >
      <span className="text-neutral-400 font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-normal mr-3 sm:mr-6">
        02 —
      </span>

      {HEADLINE_LETTERS.map((item, idx) => (
        <VerticalLetterSpan
          key={idx}
          index={idx}
          char={item.char}
          hoverColor={item.hoverColor}
          cursor={item.cursor}
          scrollYProgress={scrollYProgress}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      ))}
    </div>
  );
}

function SingleExpertiseCard({
  category,
  opacity,
  x,
  y,
  display,
  zIndex,
  isMobile,
}: {
  category: ExpertiseCategory;
  opacity: MotionValue<number>;
  x: MotionValue<string>;
  y?: MotionValue<number>;
  display: MotionValue<string>;
  zIndex: number;
  isMobile: boolean;
}) {
  return (
    <motion.div
      style={{
        opacity: isMobile ? 1 : opacity,
        x: isMobile ? 0 : x,
        y: isMobile ? 0 : y,
        display: isMobile ? "flex" : display,
        zIndex: isMobile ? 'auto' : zIndex,
      }}
      className="relative md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[3vw] pointer-events-auto md:pointer-events-none w-full md:w-[49vw] px-0"
    >
      {/* Editorial Box */}
      <div
        className={`pointer-events-auto w-full h-auto min-h-[320px] md:h-[54vh] md:max-h-[480px] p-8 md:p-10 rounded-none ${category.bgColor} text-[#2B2927] flex flex-col justify-between shadow-xl shadow-black/10 transition-all duration-300 relative overflow-hidden select-none border-0`}
      >
        {/* Top Section: Large ALL CAPS Headline + Top-Right Solid Dark Circle Dot */}
        <div className="flex items-start justify-between gap-6 shrink-0">
          <h3 className="text-xl sm:text-3xl md:text-[2.1rem] lg:text-[2.4rem] font-sans font-bold tracking-tight leading-[1.15] text-[#2B2927] max-w-xl uppercase">
            {category.headline}
          </h3>
          <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-[#2B2927] shrink-0 mt-2" />
        </div>

        {/* Description Section */}
        <div className="my-auto py-2">
          <p className="text-xs sm:text-sm md:text-base font-sans text-[#4A443C] leading-relaxed font-normal max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Bottom Technology Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs pt-4 shrink-0 border-t border-[#2B2927]/10 mt-auto">
          <span className="font-bold tracking-wider text-[#2B2927] text-[10px] sm:text-xs uppercase">
            [{category.tag}]
          </span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {category.technologies.map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase bg-[#2B2927]/10 text-[#2B2927] rounded-none"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth Spring Scroller Physics Damper for ultra-fluid card gliding
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.0001,
  });

  // Expansion Pillars Reveal
  const pillarsOpacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);
  const pillarsY = useTransform(smoothProgress, [0.12, 0.18], [15, 0]);

  // Overall Phase 1 & 2 Fade-out & Hiding
  const phase1Opacity = useTransform(smoothProgress, [0.18, 0.23], [1, 0]);
  const phase1Display = useTransform<number, string>(smoothProgress, (v) => (v < 0.23 ? "flex" : "none"));

  // CARD FADE & EXIT MOTION (Smooth liquid cross-fade exit transition into Phase 4)
  const cardOpacity = useTransform(smoothProgress, [0.23, 0.26, 0.77, 0.85], [0, 1, 1, 0]);
  const cardExitY = useTransform(smoothProgress, [0.77, 0.85], [0, -35]);
  const cardDisplay = useTransform<number, string>(smoothProgress, (v) => (v >= 0.23 && v < 0.86 ? "flex" : "none"));

  // CARD 01 [BUILD] - PINNED AT left: 3vw (x: 0vw) -> Occupies 3vw to 52vw (3vw Left Margin)
  const card1X = useTransform(smoothProgress, [0.23, 0.85], ["0vw", "0vw"]);

  // CARD 02 [CONNECT]
  const c2Start = isMobile ? "85vw" : "49vw";
  const c2End = isMobile ? "5vw" : "15vw";
  const card2X = useTransform(smoothProgress, [0.23, 0.28, 0.44, 0.85], [c2Start, c2Start, c2End, c2End]);

  // CARD 03 [CREATE]
  const c3Start = isMobile ? "170vw" : "98vw";
  const c3Mid = isMobile ? "90vw" : "64vw";
  const c3End = isMobile ? "10vw" : "30vw";
  const card3X = useTransform(smoothProgress, [0.23, 0.28, 0.44, 0.60, 0.85], [c3Start, c3Start, c3Mid, c3End, c3End]);

  // CARD 04 [SHIP]
  const c4Start = isMobile ? "255vw" : "147vw";
  const c4Mid1 = isMobile ? "175vw" : "113vw";
  const c4Mid2 = isMobile ? "95vw" : "79vw";
  const c4End = isMobile ? "15vw" : "45vw";
  const card4X = useTransform(smoothProgress, [0.23, 0.28, 0.44, 0.60, 0.76, 0.85], [c4Start, c4Start, c4Mid1, c4Mid2, c4End, c4End]);

  const singleCardTransforms = [
    { opacity: cardOpacity, x: card1X, y: cardExitY, display: cardDisplay, zIndex: 30 },
    { opacity: cardOpacity, x: card2X, y: cardExitY, display: cardDisplay, zIndex: 31 },
    { opacity: cardOpacity, x: card3X, y: cardExitY, display: cardDisplay, zIndex: 32 },
    { opacity: cardOpacity, x: card4X, y: cardExitY, display: cardDisplay, zIndex: 33 },
  ];

  // PHASE 4: FINAL STATEMENT ("FROM PIXEL -> PRODUCT") - Smooth Cross-Fade Entrance
  const phase4Opacity = useTransform(smoothProgress, [0.80, 0.87, 0.99], [0, 1, 1]);
  const phase4Y = useTransform(smoothProgress, [0.80, 0.87, 0.99], [30, 0, 0]);
  const phase4Display = useTransform<number, string>(smoothProgress, (v) => (v >= 0.79 ? "flex" : "none"));

  return (
    <div ref={containerRef} className="relative h-auto md:h-[450vh] bg-[#F1EEE9] text-[#1C1D1F]">
      {/* Sticky Viewport Framework - Exact 100vh Height on Desktop */}
      <section
        id="me"
        className="relative md:sticky top-0 w-full h-auto md:h-screen flex flex-col justify-between bg-[#F1EEE9] rounded-none md:overflow-hidden z-20 border-t border-b border-neutral-300/60"
      >
        {/* PHASE 3: SEAMLESSLY JOINED ACCORDION CARD DECK */}
        <div className="relative md:absolute md:inset-0 pointer-events-none z-25 md:overflow-hidden flex flex-col md:block gap-6 px-6 py-12 md:p-0">
          {EXPERTISE_DATA.map((category, index) => {
            const t = singleCardTransforms[index];
            return (
              <SingleExpertiseCard
                key={category.id}
                category={category}
                opacity={t.opacity}
                x={t.x}
                y={t.y}
                display={t.display}
                zIndex={t.zIndex}
                isMobile={isMobile}
              />
            );
          })}
        </div>

        {/* Top Spacer for Navbar Clearance */}
        <div className="w-full h-20 sm:h-24 shrink-0 bg-[#F1EEE9]" />

        {/* MAIN CANVAS */}
        <div className="relative flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between py-6 sm:py-8 z-20">
          
          {/* TOP SECTION HEADER INDEX */}
          <div className="flex items-center justify-between border-b border-neutral-300/80 pb-4 z-20 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-500">
                [02]
              </span>
              <div className="h-px w-8 bg-neutral-300" />
              <span className="text-xs font-mono font-semibold tracking-wider text-neutral-800 uppercase">
                WHAT I BUILD / JOINED ACCORDION DECK
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 hidden sm:flex">
              <Terminal className="w-3.5 h-3.5 text-neutral-500" />
              <span>SMOOTH SPRING ACCORDION DECK</span>
            </div>
          </div>

          {/* CENTER SCROLL CHOREOGRAPHY CONTAINER */}
          <div className="relative flex-1 my-auto flex flex-col justify-center items-center z-20 w-full overflow-hidden">
            
            {/* PHASE 1 & 2: LETTER-BY-LETTER REVEAL "WHAT I BUILD" + PILLARS */}
            <motion.div
              style={{
                opacity: isMobile ? 1 : phase1Opacity,
                display: isMobile ? "flex" : phase1Display,
              }}
              className="relative md:absolute inset-0 flex flex-col justify-center items-start space-y-6 sm:space-y-8 font-mono z-30 w-full pt-16 md:pt-0"
            >
              {/* Headline Row with Vertical Cursor-Following Letter Wave */}
              <HeadlineRow scrollYProgress={smoothProgress} />

              {/* Expansion Pillars */}
              <motion.div
                style={{ opacity: pillarsOpacity, y: pillarsY }}
                className="pt-6 sm:pt-8 border-t border-neutral-300/80 w-full flex flex-wrap items-center gap-4 sm:gap-8 font-mono text-xs sm:text-base lg:text-lg text-neutral-600 uppercase tracking-widest font-semibold"
              >
                <span
                  data-cursor="BEIGE"
                  className="transition-colors duration-300 hover:text-[#1C1D1F] cursor-pointer"
                >
                  DIGITAL PRODUCTS
                </span>
                <span className="text-neutral-400">+</span>
                <span
                  data-cursor="GREEN"
                  className="transition-colors duration-300 hover:text-[#1C1D1F] cursor-pointer"
                >
                  INTERACTIVE EXPERIENCES
                </span>
                <span className="text-neutral-400">+</span>
                <span
                  data-cursor="BUILD"
                  className="transition-colors duration-300 hover:text-[#1C1D1F] cursor-pointer"
                >
                  FULL-STACK SYSTEMS
                </span>
              </motion.div>
            </motion.div>

            {/* PHASE 4: FINAL STATEMENT ("FROM PIXEL -> PRODUCT") */}
            <motion.div
              style={{
                opacity: isMobile ? 1 : phase4Opacity,
                y: isMobile ? 0 : phase4Y,
                display: isMobile ? "flex" : phase4Display,
              }}
              className="relative md:absolute inset-0 flex flex-col justify-center items-start z-30 w-full py-16 md:py-0"
            >
              <div className="space-y-5 max-w-4xl">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-mono font-extrabold text-[#1C1D1F] uppercase tracking-tight leading-tight">
                  FROM PIXEL → PRODUCT
                </h2>

                <p className="text-sm sm:text-lg font-sans text-neutral-700 leading-relaxed max-w-2xl border-l-2 border-neutral-300 pl-5 py-1">
                  Computing &amp; Information Systems undergraduate at Sabaragamuwa University of Sri Lanka with in-depth knowledge of JavaScript, engineering web streaming platforms (XMusic), story apps (Lifeline), and mobile software (Sthetics).
                </p>

                <div className="pt-3 flex items-center gap-4">
                  <a
                    href="#build"
                    data-cursor="PROJECTS"
                    className="flex items-center gap-2 px-6 py-3 rounded-none bg-[#1C1D1F] text-[#FAF9F6] font-mono text-xs font-bold tracking-wider hover:bg-black transition-colors"
                  >
                    <span>PROJECTS</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* BOTTOM FOOTER TRACKER */}
          <div className="flex items-center justify-between border-t border-neutral-300/80 pt-4 z-20 text-xs font-mono text-neutral-500 shrink-0">
            <span>02 / EDITORIAL NARRATIVE</span>
            <span className="hidden sm:inline">SMOOTH SPRING ACCORDION DECK</span>
            <span>SARUHASAN</span>
          </div>

        </div>
      </section>
    </div>
  );
}
