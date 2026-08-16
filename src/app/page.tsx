"use client";

import { useState, useEffect } from "react";
import BootSequence from "@/components/UI/BootSequence";
import CustomCursor from "@/components/UI/CustomCursor";
import Navbar from "@/components/Navigation/Navbar";
import HeroSection from "@/components/Sections/HeroSection";
import AboutSection from "@/components/Sections/AboutSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import SkillsConstellation from "@/components/Sections/SkillsConstellation";
import NowSection from "@/components/Sections/NowSection";
import ContactSection from "@/components/Sections/ContactSection";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/UI/SmoothScroll";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("me");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "me", "build", "think", "now", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#18191B] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Cyberpunk Boot Sequence Loader */}
        <BootSequence />

        {/* Interactive Magnetic Custom Cursor */}
        <CustomCursor />

        {/* Fixed Blur Glass Navigation Bar */}
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Portfolio Sections */}
        <HeroSection onNavigate={scrollToSection} />
        <AboutSection />
        <ProjectsSection />
        <SkillsConstellation />
        <NowSection />
        <ContactSection />

        {/* Footer */}
        <Footer onScrollTop={handleScrollTop} />
      </main>
    </SmoothScroll>
  );
}
