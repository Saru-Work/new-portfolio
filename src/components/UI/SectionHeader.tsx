"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
  inverted?: boolean;
  titleClassName?: string;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  align = "left",
  inverted = false,
  titleClassName = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`mb-16 sm:mb-20 flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`text-xs font-mono font-semibold tracking-widest uppercase ${
            inverted ? "text-neutral-600" : "text-neutral-400"
          }`}
        >
          [{number}]
        </span>
        <div className={`h-px w-8 ${inverted ? "bg-neutral-300" : "bg-neutral-800"}`} />
      </div>

      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight mb-4 ${
          titleClassName
            ? titleClassName
            : inverted
            ? "text-[#18191B]"
            : "text-neutral-100"
        }`}
      >
        {title}
      </h2>

      <p
        className={`text-sm sm:text-base max-w-2xl font-sans leading-relaxed ${
          inverted ? "text-neutral-600" : "text-neutral-400"
        }`}
      >
        {subtitle}
      </p>
    </motion.div>
  );
}
