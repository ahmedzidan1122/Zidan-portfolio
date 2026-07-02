"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer select-none";

  const variants = {
    primary:
      "gradient-button text-white",
    secondary:
      "glass glass-hover text-text-primary",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-glass-bg",
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return <div onClick={onClick}>{content}</div>;
}
