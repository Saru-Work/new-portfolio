"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { Clock, Terminal, BookOpen, Compass, Play } from "lucide-react";

export default function NowSection() {
  const { now } = PORTFOLIO_DATA;
  const [logs, setLogs] = useState(now.recentLogs);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Date().toLocaleTimeString("en-GB", options) + " IST");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateLog = () => {
    const timeStr = new Date().toISOString().slice(0, 16).replace("T", " ");
    const newMsgs = [
      "Health ping response received: 2ms across edge nodes",
      "Garbage collection trace verified: 0 memory leaks detected",
      "Executed spatial viewport inertia physics calibration",
      "Synced active state tree to local IndexedDB store",
    ];
    const randomMsg = newMsgs[Math.floor(Math.random() * newMsgs.length)];
    setLogs((prev) => [{ time: timeStr, msg: randomMsg }, ...prev.slice(0, 4)]);
  };

  return (
    <section id="now" className="py-32 sm:py-36 px-6 lg:px-12 max-w-6xl mx-auto relative">
      <SectionHeader
        number="04"
        title="NOW / LIVE SYSTEM TELEMETRY"
        subtitle="Real-time operational dashboard, active focus areas, and live event logs."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-8"
        >
          {/* Header Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <h4 className="text-sm font-mono font-bold text-neutral-100">
                  {now.status}
                </h4>
                <p className="text-[11px] font-mono text-neutral-500">
                  UPTIME: {now.uptime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{currentTime || "UTC+5:30 IST"}</span>
            </div>
          </div>

          {/* Currently Building Box */}
          <div className="p-6 rounded-xl bg-neutral-900/80 border border-neutral-800">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold uppercase tracking-wider">
                CURRENT FOCUS
              </span>
              <span className="text-xs font-mono text-neutral-300 font-bold">
                {now.currentlyBuilding.progress}% COMPLETE
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-neutral-100 mb-1">
              {now.currentlyBuilding.title}
            </h3>

            <p className="text-xs font-sans text-neutral-400 mb-5">
              {now.currentlyBuilding.desc}
            </p>

            {/* Plain Progress Bar */}
            <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden relative border border-neutral-850">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${now.currentlyBuilding.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-neutral-200"
              />
            </div>
          </div>

          {/* Learning & Exploring Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learning */}
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4 text-neutral-200 font-mono text-xs font-bold uppercase">
                <BookOpen className="w-4 h-4 text-neutral-400" />
                <span>CURRENTLY LEARNING</span>
              </div>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                {now.currentlyLearning.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-500 font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exploring */}
            <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4 text-neutral-200 font-mono text-xs font-bold uppercase">
                <Compass className="w-4 h-4 text-neutral-400" />
                <span>EXPLORING FRONTIERS</span>
              </div>
              <ul className="space-y-2.5 text-xs font-sans text-neutral-400">
                {now.exploring.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-neutral-500 font-mono">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Live System Log Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between font-mono"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-neutral-400" />
                <span className="text-xs text-neutral-100 font-bold tracking-wider">
                  SYSTEM LOG STREAM
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                LIVE
              </span>
            </div>

            <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] leading-relaxed text-neutral-300"
                >
                  <span className="text-neutral-500 block text-[10px] mb-1">
                    [{log.time}]
                  </span>
                  <span>{log.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSimulateLog}
            data-cursor="PING"
            className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-200 font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-neutral-400" />
            <span>TRIGGER TELEMETRY CHECK</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
