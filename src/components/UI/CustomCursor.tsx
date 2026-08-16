"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest("[data-cursor]") as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);
        setCursorText(interactiveEl.getAttribute("data-cursor") || "VIEW");
      } else if (target?.closest("a, button, input, textarea, [role='button']")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Central Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-neutral-100 rounded-full"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />

      {/* Ring / Badge */}
      <motion.div
        className={`fixed flex items-center justify-center rounded-full border transition-colors ${
          cursorText
            ? "px-3 py-1 bg-neutral-900 border-neutral-700 text-neutral-100"
            : "w-7 h-7 border-neutral-700/80 bg-neutral-800/20"
        }`}
        animate={{
          x: cursorText ? mousePosition.x - 32 : mousePosition.x - 14,
          y: cursorText ? mousePosition.y - 14 : mousePosition.y - 14,
          scale: isHovered ? (cursorText ? 1 : 1.3) : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-widest text-neutral-200 uppercase whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
