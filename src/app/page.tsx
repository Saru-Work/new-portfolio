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
import SmoothScroll, { useLenisScroll } from "@/components/UI/SmoothScroll";

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState<string>("me");
  const { getLenis } = useLenisScroll();

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
    const lenis = getLenis();
    if (sectionId === "hero") {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenis) {
        lenis.scrollTo(el, { duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScrollTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#18191B] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cyberpunk Boot Sequence Loader */}
      <BootSequence />

      {/* Interactive Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Fixed Blur Glass Navigation Bar */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Portfolio Sections */}
      <HeroSection onNavigate={() => scrollToSection("me")} />
      <AboutSection />
      <ProjectsSection />
      <SkillsConstellation />
      <NowSection />
      <ContactSection />

      {/* Footer */}
      <Footer onScrollTop={handleScrollTop} />
    </main>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <PortfolioContent />
    </SmoothScroll>
  );
}
