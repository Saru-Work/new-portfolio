"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { ExternalLink, Github, X, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";

export default function ProjectsSection() {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ["ALL", "DEVELOPER TOOLS", "AI / SYSTEMS", "FULL-STACK"];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "ALL") return true;
    return p.category.toUpperCase() === selectedCategory;
  });

  return (
    <div className="w-full bg-[#FAFAFA] text-[#18191B] border-t border-b border-neutral-300 transition-colors">
      <section id="build" className="py-32 sm:py-36 px-6 lg:px-12 max-w-6xl mx-auto relative">
        <SectionHeader
          number="02"
          title="BUILD / FEATURED PROJECTS"
          subtitle="Autonomous agent platforms, spatial desktop engines, and real-time telemetry systems."
          inverted={true}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="FILTER"
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors ${
                  isActive
                    ? "text-white font-bold bg-[#18191B] border border-black shadow-sm"
                    : "text-neutral-700 hover:text-black bg-white border border-neutral-300 shadow-xs"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-8 rounded-2xl bg-white border border-neutral-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-200 text-neutral-800 font-semibold tracking-wider">
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">{project.year}</span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-mono font-bold text-[#18191B] mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-sans text-neutral-700 font-medium mb-4 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs font-sans text-neutral-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Pills */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-100 border border-neutral-300 text-[11px] font-mono text-neutral-800"
                      >
                        <Zap className="w-3 h-3 text-neutral-600" />
                        <span>{metric.label}:</span>
                        <span className="text-black font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-neutral-200 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  data-cursor="INSPECT"
                  className="flex items-center gap-1.5 text-xs font-mono text-[#18191B] hover:text-black font-semibold transition-colors"
                >
                  <span>DEEP DIVE</span>
                  <ArrowUpRight className="w-4 h-4" />
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

        {/* Project Detail Drawer / Modal - Inverted Light Theme */}
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

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl bg-white border border-neutral-300 rounded-2xl p-8 sm:p-10 shadow-2xl z-10 my-auto text-[#18191B]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  data-cursor="CLOSE"
                  className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-600 hover:text-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono px-3 py-1 rounded bg-[#18191B] text-white uppercase font-semibold">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    {activeProjectModal.status}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-[#18191B] mb-2">
                  {activeProjectModal.title}
                </h2>

                <p className="text-sm font-sans text-neutral-600 mb-8">
                  {activeProjectModal.tagline}
                </p>

                {/* Problem / Solution / Result Breakdown */}
                <div className="space-y-6 mb-8 text-sm font-sans">
                  <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-600 uppercase mb-2">
                      01 / THE CHALLENGE
                    </h4>
                    <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.problem}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-600 uppercase mb-2">
                      02 / ARCHITECTURAL SOLUTION
                    </h4>
                    <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.solution}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-300">
                    <h4 className="text-xs font-mono font-bold text-neutral-800 uppercase mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-neutral-800" />
                      <span>03 / QUANTIFIED RESULT</span>
                    </h4>
                    <p className="text-neutral-800 text-xs sm:text-sm leading-relaxed">
                      {activeProjectModal.result}
                    </p>
                  </div>
                </div>

                {/* Tech Stack List */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono font-bold text-neutral-600 uppercase mb-3">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-800"
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
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-mono text-neutral-900 transition-colors font-semibold"
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
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18191B] hover:bg-black text-white font-mono text-xs font-bold transition-colors"
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
