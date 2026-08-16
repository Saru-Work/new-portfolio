"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import SectionHeader from "../UI/SectionHeader";
import { Mail, Copy, Check, Github, Linkedin, Twitter, Send, Sparkles, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const { contact } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#fafafa", "#a1a1aa", "#52525b"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffffff", "#e5e5e5", "#a3a3a3"],
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-32 sm:py-36 px-6 lg:px-12 max-w-6xl mx-auto relative">
      <SectionHeader
        number="05"
        title="CONTACT / INITIATE CONNECTION"
        subtitle="Available for high-impact software engineering roles, system architecture, and technical collaborations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Box - Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-neutral-400" />
              <span className="text-xs font-mono text-neutral-400 font-bold tracking-wider uppercase">
                DIRECT TRANSMISSION
              </span>
            </div>

            <h3 className="text-2xl font-mono font-bold text-neutral-100 mb-3">
              Let&apos;s Build Something Exceptional
            </h3>

            <p className="text-xs sm:text-sm font-sans text-neutral-400 leading-relaxed mb-8">
              Whether you are looking for a software developer to engineer a high-throughput system or design an interactive web app, my inbox is open.
            </p>

            {/* Email Copy Box */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 mb-8">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 rounded-lg bg-neutral-900 text-neutral-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-neutral-300 truncate">
                  {contact.email}
                </span>
              </div>

              <button
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-mono text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-neutral-200" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-4">
              SOCIAL NETWORK NODES
            </h4>

            <div className="grid grid-cols-3 gap-3">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex flex-col items-center gap-2 transition-colors group"
              >
                <Github className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">
                  GITHUB
                </span>
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex flex-col items-center gap-2 transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">
                  LINKEDIN
                </span>
              </a>

              <a
                href={contact.twitter}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="TWITTER"
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 flex flex-col items-center gap-2 transition-colors group"
              >
                <Twitter className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white">
                  TWITTER
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Box - Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-neutral-900/60 border border-neutral-800"
        >
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-mono text-neutral-400 font-bold uppercase tracking-wider">
              SEND DIRECT MESSAGE
            </span>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-100 mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-mono font-bold text-neutral-100">
                TRANSMISSION SUCCESSFUL
              </h3>
              <p className="text-xs font-sans text-neutral-400 max-w-sm">
                Thank you for getting in touch! Your message has been logged. Saruhasan will reply shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-2 uppercase">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-xs font-sans text-white placeholder-neutral-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 mb-2 uppercase">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-xs font-sans text-white placeholder-neutral-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 mb-2 uppercase">
                  MESSAGE CONTENT
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder="Describe your project, role, or collaboration idea..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 focus:border-neutral-600 focus:outline-none text-xs font-sans text-white placeholder-neutral-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                data-cursor="TRANSMIT"
                className="w-full py-3.5 rounded-xl bg-neutral-100 text-neutral-950 font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT MESSAGE</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
