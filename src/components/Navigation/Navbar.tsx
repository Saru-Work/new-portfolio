"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "me", label: "ME" },
    { id: "build", label: "BUILD" },
    { id: "think", label: "THINK" },
    { id: "now", label: "NOW" },
  ];

  return (
    <header className="fixed top-8 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto flex items-center justify-between gap-4 px-4 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#18191B]/90 backdrop-blur-md border-neutral-800"
            : "bg-[#18191B]/60 backdrop-blur-sm border-neutral-800/60"
        }`}
      >
        {/* Brand Button */}
        <button
          onClick={() => onNavigate("hero")}
          data-cursor="HOME"
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-neutral-400" />
          <span className="text-xs font-mono font-semibold tracking-wider">SARUHASAN</span>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                data-cursor="GO"
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors ${
                  isActive ? "text-neutral-950 font-bold" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-neutral-100"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contact Link */}
        <button
          onClick={() => onNavigate("contact")}
          data-cursor="TALK"
          className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
        >
          CONTACT
        </button>
      </motion.nav>
    </header>
  );
}
