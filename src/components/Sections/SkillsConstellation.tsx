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
    <div className="w-full h-screen min-h-screen bg-[#F1EEE9] text-[#18191B] border-t border-b border-neutral-300 flex flex-col justify-between overflow-hidden">
      {/* Viewport Pinned Framework (Exact 100vh Height - Zero Overflow) */}
      <section
        id="think"
        className="w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-between py-6 sm:py-8 overflow-hidden"
      >
        {/* Navbar Clearance Header Spacer */}
        <div className="w-full h-16 sm:h-20 shrink-0 bg-[#F1EEE9]" />

        {/* Section Header & Subtitle */}
        <div className="shrink-0 mb-3 sm:mb-4">
          <SectionHeader
            number="04"
            title="THINK / TECH CONSTELLATION"
            subtitle="Interactive technology topology graph and system architectural principles."
            inverted={true}
          />
        </div>

        {/* Unified Joined Grid Container (Takes Remaining Viewport Height - #F1EEE9 Warm Cream Aesthetic) */}
        <div className="flex-1 min-h-0 border border-neutral-300 bg-[#F1EEE9] rounded-none shadow-sm flex flex-col justify-between overflow-hidden">
          
          {/* TOP ROW: Topology Graph (8 Cols) + Node Inspector (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-300 flex-1 min-h-0 overflow-hidden">
            
            {/* Topology Network Graph Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-8 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-300 flex flex-col justify-between relative bg-[#F1EEE9] overflow-hidden"
            >
              <div className="flex items-center justify-between z-10 mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neutral-700" />
                  <span className="text-xs font-mono text-[#18191B] font-bold uppercase tracking-wider">
                    TOPOLOGY NETWORK GRAPH
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-600">
                  SELECT NODE TO INSPECT
                </span>
              </div>

              {/* SVG Canvas Graph */}
              <div className="relative w-full h-[180px] sm:h-[220px] my-2">
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
                          stroke={isSelected ? "#18191B" : "#C7C2B8"}
                          strokeWidth={isSelected ? 1.5 : 1}
                          strokeDasharray={isSelected ? "none" : "2,2"}
                        />
                      );
                    })
                  )}
                </svg>

                {/* Nodes (Smooth Circular Nodes - rounded-full) */}
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
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#18191B] border border-black shadow-md"
                            : "bg-[#E5E1D8] border border-neutral-400 hover:border-neutral-700"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isSelected ? "bg-[#F1EEE9]" : "bg-neutral-600"
                          }`}
                        />
                      </div>

                      <div
                        className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-none text-[9px] font-mono tracking-wider transition-colors pointer-events-none ${
                          isSelected
                            ? "bg-[#18191B] text-white font-bold shadow-md"
                            : "bg-[#F1EEE9] text-neutral-900 border border-neutral-300 shadow-xs"
                        }`}
                      >
                        {node.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-700 border-t border-neutral-300 pt-3 z-10">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#18191B]" /> ACTIVE NODE
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-400" /> CONNECTED NODE
                  </span>
                </div>
                <span className="font-semibold text-neutral-800">{nodes.length} MASTERED NODES</span>
              </div>
            </motion.div>

            {/* Node Inspector Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="lg:col-span-4 p-5 sm:p-6 flex flex-col justify-between bg-[#F1EEE9] overflow-hidden"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-neutral-700" />
                  <span className="text-xs font-mono text-neutral-700 uppercase tracking-wider font-semibold">
                    NODE INSPECTOR
                  </span>
                </div>

                <h3 className="text-xl font-mono font-bold text-[#18191B] mb-1.5">
                  {activeNode.name}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#E5E1D8] text-neutral-900 font-semibold">
                    {activeNode.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-600">
                    LEVEL {activeNode.level}/5
                  </span>
                </div>

                <p className="text-xs font-sans text-neutral-800 leading-relaxed mb-6">
                  {activeNode.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-[10px] font-mono text-neutral-600 uppercase mb-2 font-semibold">
                    CONNECTED NODES
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeNode.connections.map((connId) => {
                      const connNode = nodes.find((n) => n.id === connId);
                      return (
                        <button
                          key={connId}
                          onClick={() => connNode && setSelectedNode(connNode)}
                          data-cursor="JUMP"
                          className="px-2.5 py-1 rounded-none bg-[#E5E1D8] hover:bg-[#DCD7CB] border border-neutral-300 text-[10px] font-mono text-neutral-900 hover:text-black transition-colors font-semibold"
                        >
                          {connNode ? connNode.name : connId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-none bg-[#E5E1D8] border border-neutral-300 text-[11px] font-mono text-neutral-800 flex items-center gap-2 font-medium">
                <Zap className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
                <span>Active in production benchmarks.</span>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW: 3 Engineering Principles (4 Cols each, Compact Padding) */}
          <div className="grid grid-cols-1 md:grid-cols-3 bg-[#F1EEE9] shrink-0">
            {principles.map((principle, pIdx) => (
              <div
                key={pIdx}
                className={`p-4 sm:p-5 flex flex-col space-y-2 bg-[#F1EEE9] ${
                  pIdx < 2 ? "border-b md:border-b-0 md:border-r border-neutral-300" : ""
                }`}
              >
                <div className="p-2 rounded-none bg-[#E5E1D8] border border-neutral-300 w-fit text-neutral-900">
                  {pIdx === 0 && <Cpu className="w-4 h-4" />}
                  {pIdx === 1 && <Layers className="w-4 h-4" />}
                  {pIdx === 2 && <Zap className="w-4 h-4" />}
                </div>

                <h4 className="text-sm font-mono font-bold text-[#18191B]">
                  {principle.title}
                </h4>

                <p className="text-xs font-sans text-neutral-700 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
