"use client";

import { ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollTop: () => void;
}

export default function Footer({ onScrollTop }: FooterProps) {
  return (
    <footer className="w-full border-t border-neutral-900 bg-[#18191B] py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-200 font-mono text-xs font-bold">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-neutral-100 tracking-widest">
                SARUHASAN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            </div>
            <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
              SPATIAL WEB & DETERMINISTIC SYSTEMS
            </p>
          </div>
        </div>

        {/* Middle Copyright */}
        <div className="text-center md:text-left">
          <p className="text-xs font-mono text-neutral-400">
            © {new Date().getFullYear()} SARUHASAN. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
            BUILT WITH NEXT.JS 16, REACT 19, TAILWIND & FRAMER MOTION
          </p>
        </div>

        {/* Right Back to Top Button */}
        <button
          onClick={onScrollTop}
          data-cursor="TOP"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </div>
    </footer>
  );
}
