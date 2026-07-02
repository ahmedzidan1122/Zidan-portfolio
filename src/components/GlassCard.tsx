"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  as?: "div" | "motion.div";
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={cn(
        "glass rounded-2xl p-6",
        hover && "glass-hover",
        "relative overflow-hidden",
        className
      )}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-[100px] opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at ${glowX}% ${glowY}%, rgba(59, 130, 246, 0.1), transparent 40%)`,
          }}
        />
      )}
      <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium tracking-widest uppercase text-accent-blue bg-accent-blue/10 px-4 py-1.5 rounded-full mb-4">
      {children}
    </span>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 gradient-text", className)}>
      {children}
    </h2>
  );
}
