"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA, TechNode } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { Cpu, Zap, Sparkles, Layers, Info } from "lucide-react";

export default function SkillsConstellation() {
  const { nodes, principles } = PORTFOLIO_DATA.skills;
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(nodes[0]);

  const activeNode = selectedNode || nodes[0];

  return (
    <div className="w-full bg-[#FAFAFA] text-[#18191B] border-t border-b border-neutral-300 transition-colors">
      <section id="think" className="py-32 sm:py-36 px-6 lg:px-12 max-w-6xl mx-auto relative">
        <SectionHeader
          number="03"
          title="THINK / TECH CONSTELLATION"
          subtitle="Interactive technology topology graph and system architectural principles."
          inverted={true}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Constellation Container - Inverted Light Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-white border border-neutral-300 shadow-sm relative min-h-[420px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between z-10 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-mono text-[#18191B] font-bold uppercase tracking-wider">
                  TOPOLOGY NETWORK GRAPH
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">
                SELECT NODE TO INSPECT
              </span>
            </div>

            {/* Minimalist SVG Canvas Graph - Inverted Light Theme */}
            <div className="relative w-full h-[320px] sm:h-[360px] my-4">
              <svg className="w-full h-full absolute inset-0 overflow-visible">
                {nodes.map((node) =>
                  node.connections.map((targetId) => {
                    const targetNode = nodes.find((n) => n.id === targetId);
                    if (!targetNode) return null;
                    const isSelected = activeNode.id === node.id || activeNode.id === targetId;

                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${targetNode.x}%`}
                        y2={`${targetNode.y}%`}
                        stroke={isSelected ? "#18191B" : "#D4D4D8"}
                        strokeWidth={isSelected ? 1.5 : 1}
                        strokeDasharray={isSelected ? "none" : "2,2"}
                      />
                    );
                  })
                )}
              </svg>

              {/* Nodes */}
              {nodes.map((node) => {
                const isSelected = activeNode.id === node.id;

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    data-cursor="NODE"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#18191B] border-2 border-black shadow-md"
                          : "bg-neutral-200 border border-neutral-400 hover:border-neutral-700"
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-white" : "bg-neutral-600"
                        }`}
                      />
                    </div>

                    <div
                      className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded text-[10px] font-mono tracking-wider transition-colors pointer-events-none ${
                        isSelected
                          ? "bg-[#18191B] text-white font-bold shadow-md"
                          : "bg-white text-neutral-800 border border-neutral-300 shadow-xs"
                      }`}
                    >
                      {node.name}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 border-t border-neutral-200 pt-6 z-10">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#18191B]" /> ACTIVE NODE
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" /> CONNECTED NODE
                </span>
              </div>
              <span className="font-semibold text-neutral-700">{nodes.length} MASTERED NODES</span>
            </div>
          </motion.div>

          {/* Node Inspector Box - Inverted Light Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 p-8 sm:p-10 rounded-2xl bg-white border border-neutral-300 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-4 h-4 text-neutral-700" />
                <span className="text-xs font-mono text-neutral-700 uppercase tracking-wider font-semibold">
                  NODE INSPECTOR
                </span>
              </div>

              <h3 className="text-2xl font-mono font-bold text-[#18191B] mb-2">
                {activeNode.name}
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-neutral-200 text-neutral-800 font-semibold">
                  {activeNode.category}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  LEVEL {activeNode.level}/5
                </span>
              </div>

              <p className="text-xs sm:text-sm font-sans text-neutral-700 leading-relaxed mb-8">
                {activeNode.description}
              </p>

              <div className="mb-8">
                <h4 className="text-[11px] font-mono text-neutral-500 uppercase mb-3 font-semibold">
                  CONNECTED NODES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeNode.connections.map((connId) => {
                    const connNode = nodes.find((n) => n.id === connId);
                    return (
                      <button
                        key={connId}
                        onClick={() => connNode && setSelectedNode(connNode)}
                        data-cursor="JUMP"
                        className="px-3 py-1 rounded bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-[11px] font-mono text-neutral-800 hover:text-black transition-colors"
                      >
                        {connNode ? connNode.name : connId}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-300 text-xs font-mono text-neutral-700 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neutral-700 shrink-0" />
              <span>Active in production benchmarks.</span>
            </div>
          </motion.div>
        </div>

        {/* Engineering Principles - Inverted Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, pIdx) => (
            <div
              key={pIdx}
              className="p-8 rounded-2xl bg-white border border-neutral-300 shadow-sm flex flex-col space-y-4"
            >
              <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-300 w-fit text-neutral-900">
                {pIdx === 0 && <Cpu className="w-5 h-5" />}
                {pIdx === 1 && <Layers className="w-5 h-5" />}
                {pIdx === 2 && <Zap className="w-5 h-5" />}
              </div>

              <h4 className="text-base font-mono font-bold text-[#18191B]">
                {principle.title}
              </h4>

              <p className="text-xs sm:text-sm font-sans text-neutral-600 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
