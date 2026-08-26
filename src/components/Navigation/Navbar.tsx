"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  ];

  const handleMobileNav = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed top-6 sm:top-8 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        
        {/* DESKTOP NAVIGATION PILL */}
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`hidden sm:flex pointer-events-auto items-center justify-between gap-4 px-4 py-2.5 rounded-full border transition-all duration-300 ${
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

        {/* MOBILE TOP BAR */}
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`sm:hidden pointer-events-auto flex items-center justify-between w-full max-w-sm px-4 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#18191B]/90 backdrop-blur-md border-neutral-800"
              : "bg-[#18191B]/60 backdrop-blur-sm border-neutral-800/60"
          }`}
        >
          {/* Brand Button */}
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200"
          >
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span className="text-xs font-mono font-semibold tracking-wider">SARUHASAN</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200"
          >
            <Menu className="w-4 h-4" />
          </button>
        </motion.nav>
      </header>

      {/* MOBILE SIDEBAR OVLERY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 sm:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 w-64 h-screen bg-[#18191B] border-l border-neutral-800 z-50 p-6 flex flex-col sm:hidden shadow-2xl"
            >
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-6 font-mono text-sm tracking-widest">
                <button
                  onClick={() => handleMobileNav("hero")}
                  className="text-left py-2 border-b border-neutral-800/50 text-neutral-400 hover:text-white"
                >
                  HOME
                </button>
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMobileNav(item.id)}
                      className={`text-left py-2 border-b border-neutral-800/50 transition-colors ${
                        isActive ? "text-white font-bold" : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => handleMobileNav("contact")}
                  className="text-left py-2 border-b border-neutral-800/50 text-neutral-400 hover:text-white"
                >
                  CONTACT
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
