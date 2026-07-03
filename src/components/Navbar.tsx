"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, Mail } from "lucide-react";
import { InstagramIcon } from "./Icons";
import { MagneticButton } from "./MagneticButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#070b14]/80 backdrop-blur-xl border-b border-glass-border"
            : "bg-transparent"
        )}
      >
        <div
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan transition-all duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#"
              className="text-lg font-bold tracking-tight gradient-text"
            >
              AZ
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors duration-300 relative",
                    activeSection === link.href.slice(1)
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-blue rounded-full"
                    />
                  )}
                </a>
              ))}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/zidan__v7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=zidanv07@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-blue-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://wa.me/201006158659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
              <MagneticButton
                href="https://wa.me/201006158659"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <MessageCircle size={16} />
                Let&apos;s Talk
              </MagneticButton>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-xl border-b border-glass-border md:hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-text-secondary hover:text-text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-2 border-t border-glass-border">
                <a
                  href="https://instagram.com/zidan__v7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=zidanv07@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-blue-400 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://wa.me/201006158659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-tertiary hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
              <MagneticButton
                href="https://wa.me/201006158659"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-2"
              >
                <MessageCircle size={16} />
                Let&apos;s Talk
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
