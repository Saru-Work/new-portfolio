"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA, TechNode } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";

const TECH_LOGOS = [
  {
    id: "javascript",
    name: "JavaScript",
    version: "IN-DEPTH",
    category: "LANGUAGE",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#F7DF1E]" viewBox="0 0 24 24">
        <path d="M3 3h18v18H3V3zm10.72 13.97c.48.8 1.16 1.4 2.27 1.4 1.14 0 1.84-.57 1.84-1.39 0-.96-.78-1.31-2.09-1.87l-.72-.31c-2.07-.88-3.44-1.98-3.44-4.34 0-2.48 1.9-4.22 4.8-4.22 2.15 0 3.63.76 4.6 2.45l-1.9 1.22c-.44-.76-1.05-1.12-1.99-1.12-.96 0-1.57.57-1.57 1.26 0 .84.6 1.18 1.9 1.74l.72.31c2.43 1.03 3.66 2.11 3.66 4.5 0 2.87-2.23 4.41-5.38 4.41-2.92 0-4.63-1.35-5.51-3.03l1.9-1.09zM8.32 17.06c.4 1.2 1.34 1.88 2.68 1.88.94 0 1.58-.33 1.58-1.12v-8.79h2.36v8.78c0 2.29-1.56 3.4-3.86 3.4-2.46 0-3.92-1.25-4.57-3.04l1.81-1.11z" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    version: "3.12",
    category: "LANGUAGE",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#3776AB]" viewBox="0 0 24 24">
        <path d="M12 2c-4.4 0-4.7.2-4.7 2.2V6h9.4v.7H6.3C4.2 6.7 4 7 4 11.4c0 4.3.2 4.6 2.3 4.6h1.4v-2.2c0-2.4 2.1-4.5 4.5-4.5h4.5c.2 0 .4-.2.4-.4V6.7C17.1 2.4 16.7 2 12 2zm-2.2 2.2c.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1zM12 22c4.4 0 4.7-.2 4.7-2.2V18H7.3v-.7h10.4c2.1 0 2.3-.3 2.3-4.7 0-4.3-.2-4.6-2.3-4.6h-1.4v2.2c0 2.4-2.1 4.5-4.5 4.5H7.3c-.2 0-.4.2-.4.4v2.5C6.9 21.6 7.3 22 12 22zm2.2-2.2c-.6 0-1.1-.5-1.1-1.1 0-.6.5-1.1 1.1-1.1.6 0 1.1.5 1.1 1.1 0 .6-.5 1.1-1.1 1.1z" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    version: "19.0",
    category: "FRONTEND",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    version: "15.0",
    category: "FRONTEND",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#18191B]" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.89 14.5L10.3 8.76v7.74H8.8V7.5h1.68l5.41 7.55V7.5h1.5v9h-1.5z" />
      </svg>
    ),
  },
  {
    id: "reactnative",
    name: "React Native",
    version: "MOBILE",
    category: "MOBILE",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#61DAFB]" viewBox="0 0 24 24">
        <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14zm-5-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
      </svg>
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    version: "4.0",
    category: "FRONTEND",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#06B6D4]" viewBox="0 0 24 24">
        <path d="M12 6c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 0.3 1.7 1.1 2.5 1.9C13.2 12.4 14.7 14 18 14c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1-0.3-1.7-1.1-2.5-1.9C16.8 7.6 15.3 6 12 6zm-6 6c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 0.3 1.7 1.1 2.5 1.9C7.2 18.4 8.7 20 12 20c3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1-0.3-1.7-1.1-2.5-1.9C9.8 13.6 8.3 12 6 12z" />
      </svg>
    ),
  },
  {
    id: "express",
    name: "Express.js",
    version: "4.19",
    category: "BACKEND",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#18191B]" viewBox="0 0 24 24">
        <path d="M4 5h16v2H6v4h12v2H6v4h14v2H4V5z" />
      </svg>
    ),
  },
  {
    id: "node",
    name: "Node.js",
    version: "20 LTS",
    category: "BACKEND",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#5FA04E]" viewBox="0 0 24 24">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm-1 15.5l-4.5-2.5v-5L11 12.5v4.5zm2 0v-4.5l4.5-2.5v5L13 17.5z" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    version: "26.0",
    category: "DEVOPS",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#2496ED]" viewBox="0 0 24 24">
        <path d="M13 10h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm9 9.5c-.5.4-1.6.6-2.5.6-2.8 0-4.5-1.4-4.5-3.5 0-.4.1-.8.2-1.2-1.2 0-2.3.4-3.2 1.1-.3-.6-.8-1-1.5-1.2v-.3h10v.3c.7.2 1.2.6 1.5 1.2.9-.7 2-1.1 3.2-1.1 0 .4.1.8.2 1.2 0 2.1-1.7 3.5-4.5 3.5z" />
      </svg>
    ),
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    version: "1.30",
    category: "DEVOPS",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#326CE5]" viewBox="0 0 24 24">
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.5 3.8v7.6L12 19.5 5.5 15.7V8.1L12 4.3z" />
      </svg>
    ),
  },
  {
    id: "nginx",
    name: "Nginx",
    version: "1.26",
    category: "DEVOPS",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#009639]" viewBox="0 0 24 24">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm4 13.5l-4-6v6H10V8.5l4 6v-6h2v9z" />
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    version: "7.0",
    category: "DATABASE",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#47A248]" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-4H9v-2h2V8.5h2v2h2v2h-2v4z" />
      </svg>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    version: "8.0",
    category: "DATABASE",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#4479A1]" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5l7 3.5-7 3.5-7-3.5 7-3.5zm-7 5.5l6 3v6l-6-3v-6zm14 6l-6 3v-6l6-3v6z" />
      </svg>
    ),
  },
  {
    id: "figma",
    name: "Figma",
    version: "DESIGN",
    category: "DESIGN",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#F24E1E]" viewBox="0 0 24 24">
        <path d="M8 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm8-8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm-8 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 8c-2.2 0-4-1.8-4-4s1.8-4 4-4h4v4c0 2.2-1.8 4-4 4zm8-8c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
      </svg>
    ),
  },
  {
    id: "agile",
    name: "Agile Methodologies",
    version: "SPRINT",
    category: "PROCESS",
    icon: (
      <svg className="w-7 h-7 sm:w-9 sm:h-9 fill-[#18191B]" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export default function SkillsConstellation() {
  const { nodes } = PORTFOLIO_DATA.skills;
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(nodes[0]);
  const activeNode = selectedNode || nodes[0];

  // Scroll container reference for scroll-driven movement
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Track X translations tied STRICTLY to page scrolling
  const track1X = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const track2X = useTransform(scrollYProgress, [0, 1], ["-38%", "0%"]);

  const marqueeTrack1 = [...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS];
  const marqueeTrack2 = [
    ...TECH_LOGOS.slice().reverse(),
    ...TECH_LOGOS.slice().reverse(),
    ...TECH_LOGOS.slice().reverse(),
  ];

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#F1EEE9] text-[#18191B] border-t border-b border-neutral-300 py-20 sm:py-32 overflow-hidden select-none"
    >
      <section id="think" className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header & Subtitle */}
        <div className="mb-8 sm:mb-12">
          <SectionHeader
            number="04"
            title="THINK / TECH CONSTELLATION"
            subtitle="Mastered technology stack topology graph across core languages, frontend, backend, & DevOps infrastructure."
            inverted={true}
          />
        </div>

        {/* TOP: Expansive Breathing Interactive Tech Topology Graph with Staggered Viewport Entry */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-[480px] sm:h-[580px] md:h-[650px] my-6"
        >
          {/* SVG Connection Lines Floating Directly on Light Background */}
          <svg className="w-full h-full absolute inset-0 overflow-visible">
            {nodes.map((node) =>
              node.connections.map((targetId) => {
                const targetNode = nodes.find((n) => n.id === targetId);
                if (!targetNode) return null;
                const isSelected = activeNode.id === node.id || activeNode.id === targetId;

                return (
                  <motion.line
                    key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke={isSelected ? "#18191B" : "#C7C2B8"}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    strokeDasharray={isSelected ? "none" : "4,4"}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: isSelected ? 1 : 0.8 }}
                    viewport={{ once: true, margin: "-60px" }}
                    animate={isSelected ? { opacity: [0.6, 1, 0.6] } : {}}
                    transition={{
                      opacity: {
                        duration: isSelected ? 1.5 : 0.8,
                        repeat: isSelected ? Infinity : 0,
                        delay: 0.1,
                      },
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* Spacious Staggered Viewport Entry Tech Nodes */}
          {nodes.map((node, nodeIdx) => {
            const isSelected = activeNode.id === node.id;
            const floatDuration = 4 + (nodeIdx % 4) * 1.2;

            return (
              <motion.button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                data-cursor="NODE"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ scale: 0, opacity: 0, y: 30 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                animate={{
                  y: [0, -6, 0, 6, 0],
                }}
                transition={{
                  scale: { type: "spring", stiffness: 350, damping: 18, delay: 0.15 + nodeIdx * 0.04 },
                  opacity: { duration: 0.5, delay: 0.15 + nodeIdx * 0.04 },
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2 + nodeIdx * 0.04,
                  },
                }}
                whileHover={{ scale: 1.22, transition: { type: "spring", stiffness: 450, damping: 18 } }}
                whileTap={{ scale: 0.95 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
              >
                {/* Active Radar Pulse Ring */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-neutral-900 pointer-events-none"
                  />
                )}

                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? "bg-[#18191B] border-2 border-black shadow-xl scale-110"
                      : "bg-[#E5E1D8] border border-neutral-400 hover:border-neutral-800 shadow-sm"
                  }`}
                >
                  <div
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors ${
                      isSelected ? "bg-[#F1EEE9]" : "bg-neutral-600 group-hover:bg-neutral-900"
                    }`}
                  />
                </div>

                <div
                  className={`absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-none text-xs sm:text-sm font-mono font-bold tracking-wider transition-all pointer-events-none ${
                    isSelected
                      ? "bg-[#18191B] text-white shadow-lg scale-105"
                      : "bg-[#F1EEE9] text-neutral-900 border border-neutral-300 shadow-xs group-hover:border-neutral-600"
                  }`}
                >
                  {node.name}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* BOTTOM: BIGGER Tech Logo Cards Moving STRICTLY ON PAGE SCROLL with Viewport Entry */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full space-y-6 pt-10 mt-8 border-t border-neutral-300/80 overflow-hidden"
      >
        {/* Left & Right Gradient Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#F1EEE9] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#F1EEE9] to-transparent z-20 pointer-events-none" />

        {/* TRACK 01: Moves Leftward ONLY when user scrolls page */}
        <div className="flex w-full overflow-hidden">
          <motion.div style={{ x: track1X }} className="flex gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
            {marqueeTrack1.map((item, idx) => (
              <div
                key={`${item.id}-t1-${idx}`}
                data-cursor="TECH"
                className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-4 sm:py-5 rounded-none bg-[#E5E1D8] border border-neutral-300 hover:border-neutral-800 transition-all duration-300 hover:scale-105 shadow-sm group"
              >
                <div className="shrink-0 group-hover:rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-mono font-bold text-[#18191B] tracking-tight whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-none bg-neutral-900/10 text-neutral-800 font-semibold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 tracking-wider uppercase">
                    v{item.version}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* TRACK 02: Moves Rightward ONLY when user scrolls page */}
        <div className="flex w-full overflow-hidden">
          <motion.div style={{ x: track2X }} className="flex gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
            {marqueeTrack2.map((item, idx) => (
              <div
                key={`${item.id}-t2-${idx}`}
                data-cursor="TECH"
                className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 py-4 sm:py-5 rounded-none bg-[#E5E1D8] border border-neutral-300 hover:border-neutral-800 transition-all duration-300 hover:scale-105 shadow-sm group"
              >
                <div className="shrink-0 group-hover:-rotate-12 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-mono font-bold text-[#18191B] tracking-tight whitespace-nowrap">
                      {item.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-none bg-neutral-900/10 text-neutral-800 font-semibold uppercase">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 tracking-wider uppercase">
                    v{item.version}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
