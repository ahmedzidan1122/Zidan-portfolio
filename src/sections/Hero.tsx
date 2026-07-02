"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Eye } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { GlassCard } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const floatingPositions = [
  { x: "15%", y: "20%", size: 60, delay: 0 },
  { x: "80%", y: "15%", size: 40, delay: 1 },
  { x: "70%", y: "60%", size: 50, delay: 2 },
  { x: "20%", y: "70%", size: 35, delay: 0.5 },
];

function FloatingGlow({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        y: [0, -size * 0.3, 0],
        scale: [1, 1.1, 1],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1), transparent)",
          filter: "blur(8px)",
        }}
      />
    </motion.div>
  );
}

function LiquidGlassCircle({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 180, 360],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 10 + delay * 2,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05), rgba(6, 182, 212, 0.08))",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "inherit",
        }}
      />
    </motion.div>
  );
}

export function Hero({ data }: { data: SiteData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setParallaxOffset({
      x: mousePos.x * 15,
      y: mousePos.y * 15,
    });
  }, [mousePos]);

  const titleLines = data.title.split("\n");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15), transparent)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(139, 92, 246, 0.1), transparent)",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {floatingPositions.map((pos, i) => (
        <FloatingGlow key={i} {...pos} />
      ))}

      <LiquidGlassCircle x="10%" y="10%" size={300} delay={0} />
      <LiquidGlassCircle x="75%" y="65%" size={200} delay={2} />
      <LiquidGlassCircle x="60%" y="15%" size={150} delay={4} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.span
                className="inline-block text-xs font-medium tracking-widest uppercase text-accent-cyan bg-accent-cyan/10 px-4 py-1.5 rounded-full mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Welcome to my portfolio
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="gradient-text">{data.name}</span>
            </motion.h1>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {titleLines.map((line, i) => (
                <p
                  key={i}
                  className="text-xl sm:text-2xl md:text-3xl text-text-secondary font-medium"
                >
                  {line}
                </p>
              ))}
            </motion.div>

            <motion.p
              className="text-base sm:text-lg text-text-secondary max-w-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {data.heroDescription}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MagneticButton href="#projects" variant="primary">
                <Eye size={16} />
                View Projects
              </MagneticButton>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
              }}
            >
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.15))",
                    filter: "blur(20px)",
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full glass overflow-hidden"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.08)","--tw-ring-color": "rgba(59,130,246,0.3)" }}
                >
                  <Image
                    src={data.profileImage}
                    alt={data.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 400px"
                    priority
                  />
                </div>

                <GlassCard
                  className="absolute -bottom-4 -left-4 !p-3 !rounded-xl"
                  hover={false}
                  glow={false}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-text-secondary text-xs">Available for work</span>
                  </div>
                </GlassCard>

                <GlassCard
                  className="absolute -top-2 -right-2 !p-3 !rounded-xl"
                  hover={false}
                  glow={false}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {["JS", "PY", "RC"].map((l, i) => (
                        <span
                          key={i}
                          className="w-6 h-6 rounded-full bg-accent-blue/20 border border-glass-border flex items-center justify-center text-[8px] font-bold text-accent-cyan"
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                    <span className="text-text-secondary text-xs">+3</span>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#about" className="text-text-tertiary hover:text-text-secondary transition-colors">
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
}
