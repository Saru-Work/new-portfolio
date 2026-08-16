"use client";

import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { ShieldCheck, Layers, Gauge, Terminal, MapPin, GraduationCap } from "lucide-react";

export default function AboutSection() {
  const { profile } = PORTFOLIO_DATA;

  const philosophyIcons = [
    <Layers key="layers" className="w-5 h-5 text-neutral-300" />,
    <ShieldCheck key="shield" className="w-5 h-5 text-neutral-300" />,
    <Gauge key="gauge" className="w-5 h-5 text-neutral-300" />,
  ];

  return (
    <section id="me" className="py-32 sm:py-36 px-6 lg:px-12 max-w-6xl mx-auto relative">
      <SectionHeader
        number="01"
        title="ME / PROFILE & PHILOSOPHY"
        subtitle="Computer Science engineer focused on low-level system efficiency and spatial Web UI."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col justify-between space-y-6"
        >
          <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-mono font-bold text-neutral-100">SARUHASAN</h3>
                <p className="text-xs font-mono text-neutral-400">{profile.role}</p>
              </div>
            </div>

            <div className="space-y-6 text-neutral-300 text-base font-sans leading-relaxed">
              {profile.bio.map((paragraph, index) => (
                <p key={index} className="relative pl-5 border-l-2 border-neutral-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Metadata Info */}
            <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap gap-6 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-neutral-400" />
                <span>Computer Science & Engineering</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Philosophy Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col space-y-4"
        >
          <h3 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-2">
            ARCHITECTURAL PHILOSOPHY
          </h3>

          {profile.philosophy.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-4"
            >
              <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700 shrink-0">
                {philosophyIcons[idx % philosophyIcons.length]}
              </div>

              <div>
                <h4 className="text-base font-mono font-bold text-neutral-100 mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
