"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
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
