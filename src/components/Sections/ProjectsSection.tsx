"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { ExternalLink, Github, X, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  return (
    <div className="w-full h-screen min-h-screen bg-[#F1EEE9] text-[#18191B] border-t border-b border-neutral-300 flex flex-col justify-between overflow-hidden">
      {/* Viewport Pinned Framework (Exact 100vh Height - Zero Overflow) */}
      <section
        id="build"
        className="w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between py-6 sm:py-8 overflow-hidden"
      >
        {/* Navbar Clearance Header Spacer */}
        <div className="w-full h-16 sm:h-20 shrink-0 bg-[#F1EEE9]" />

        {/* Section Header & Subtitle */}
        <div className="shrink-0 mb-3 sm:mb-4">
          <SectionHeader
            number="03"
            title="BUILD / FEATURED PROJECTS"
            subtitle="Autonomous agent platforms, spatial desktop engines, and real-time telemetry systems."
            inverted={true}
          />
        </div>

        {/* Monolithic Architectural Spec Strip Matrix (Zero Separate Floating Cards) */}
        <div className="flex-1 min-h-0 border border-neutral-300 bg-[#F1EEE9] rounded-none shadow-sm flex flex-col justify-between overflow-hidden">
          
          {/* 3-Column Dossier Strip Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 flex-1 min-h-0 overflow-y-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group p-5 sm:p-6 flex flex-col justify-between bg-[#F1EEE9] hover:bg-[#E8E4DD] transition-all duration-300 relative border-t-2 border-t-transparent hover:border-t-[#18191B] ${
                  index < 2 ? "border-b md:border-b-0 md:border-r border-neutral-300" : ""
                }`}
              >
                <div>
                  {/* Spec Strip Header: Index Counter + Status Beacon */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-300">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold text-[#18191B]">
                        {"// 0"}{index + 1}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#E0DCD3] text-neutral-900 font-bold uppercase tracking-wider">
                        {project.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600 font-semibold">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-mono font-extrabold text-[#18191B] mb-1.5 uppercase tracking-tight group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="text-xs font-sans text-neutral-800 font-semibold mb-3 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs font-sans text-neutral-700 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech Stack List */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-neutral-600 uppercase font-bold tracking-wider block mb-2">
                      SYSTEM ARCHITECTURE STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-none bg-[#E0DCD3] group-hover:bg-[#D8D3C7] text-neutral-900 font-medium border border-neutral-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-neutral-300 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProjectModal(project)}
                    data-cursor="INSPECT"
                    className="flex items-center gap-2 text-xs font-mono text-[#18191B] hover:text-black font-extrabold tracking-wider uppercase transition-colors"
                  >
                    <span>INSPECT SPEC</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="CODE"
                      className="text-neutral-600 hover:text-black transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="LIVE"
                        className="text-neutral-600 hover:text-black transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Detail Drawer / Modal - Warm Cream Aesthetic #F1EEE9 */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectModal(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              />

              {/* Modal Box (#F1EEE9 Background, Sharp Edges) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-3xl bg-[#F1EEE9] border border-neutral-300 rounded-none p-6 sm:p-10 shadow-2xl z-10 my-auto text-[#18191B]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  data-cursor="CLOSE"
                  className="absolute top-6 right-6 p-2 rounded-none bg-[#E0DCD3] border border-neutral-300 text-neutral-700 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded-none bg-[#18191B] text-white uppercase font-bold tracking-wider">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-600">
                    {activeProjectModal.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-mono font-extrabold text-[#18191B] uppercase tracking-tight mb-2">
                  {activeProjectModal.title}
                </h2>

                <p className="text-sm font-sans text-neutral-700 mb-6">
                  {activeProjectModal.tagline}
                </p>

                {/* Problem / Solution / Result Breakdown */}
                <div className="space-y-4 mb-6 text-sm font-sans">
                  <div className="p-4 rounded-none bg-[#E0DCD3] border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      01 / THE CHALLENGE
                    </h4>
                    <p className="text-neutral-900 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.problem}
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-[#E0DCD3] border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-700 uppercase mb-1">
                      02 / ARCHITECTURAL SOLUTION
                    </h4>
                    <p className="text-neutral-900 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.solution}
                    </p>
                  </div>

                  <div className="p-4 rounded-none bg-[#E0DCD3] border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900" />
                      <span>03 / QUANTIFIED RESULT</span>
                    </h4>
                    <p className="text-neutral-900 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.result}
                    </p>
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold text-neutral-700 uppercase mb-2">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-none bg-[#E0DCD3] border border-neutral-300 text-xs font-mono text-neutral-900 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="REPOS"
                    className="flex items-center gap-2 px-6 py-3 rounded-none bg-[#E0DCD3] hover:bg-[#D8D3C7] border border-neutral-300 text-xs font-mono text-neutral-900 transition-colors font-bold tracking-wider"
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
                      className="flex items-center gap-2 px-6 py-3 rounded-none bg-[#18191B] hover:bg-black text-white font-mono text-xs font-bold tracking-wider transition-colors"
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
      </section>
    </div>
  );
}
