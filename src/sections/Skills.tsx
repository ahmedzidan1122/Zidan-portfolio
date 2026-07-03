"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Globe,
  FileType,
  FileJson,
  Server,
  Smartphone,
  Shield,
  Network,
  Terminal,
  Video,
  Paintbrush,
  Languages,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import { StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { cn } from "@/lib/utils";
import type { SiteData, Skill } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  python: Code2,
  html: Globe,
  css: FileType,
  javascript: FileJson,
  nodejs: Server,
  responsive: Smartphone,
  security: Shield,
  network: Network,
  linux: Terminal,
  premiere: Video,
  affinity: Paintbrush,
  language: Languages,
};

const iconColors: Record<string, string> = {
  frontend: "text-blue-400",
  backend: "text-emerald-400",
  design: "text-purple-400",
  security: "text-red-400",
  other: "text-yellow-400",
};

const barColors: Record<string, string> = {
  frontend: "bg-gradient-to-r from-blue-500 to-cyan-400",
  backend: "bg-gradient-to-r from-emerald-500 to-teal-400",
  design: "bg-gradient-to-r from-purple-500 to-pink-400",
  security: "bg-gradient-to-r from-red-500 to-orange-400",
  other: "bg-gradient-to-r from-yellow-500 to-amber-400",
};

function SkillProgressBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="w-full h-1.5 rounded-full bg-glass-bg overflow-hidden mt-2">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon] || Code2;

  return (
    <StaggerItem>
      <div className="glass rounded-2xl p-4 sm:p-5 glass-hover transition-all duration-500 hover:translate-y-[-4px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-glass-bg flex items-center justify-center shrink-0",
                  iconColors[skill.category]
                )}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-medium text-text-primary block truncate">
                  {skill.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
                  {skill.category}
                </span>
              </div>
            </div>
            {skill.level && (
              <span className="text-xs font-mono text-text-tertiary">{skill.level}%</span>
            )}
          </div>
          {skill.level && (
            <div
              className={cn("h-1.5 rounded-full bg-glass-bg overflow-hidden")}
            >
              <SkillProgressBar level={skill.level} />
            </div>
          )}
        </div>
      </div>
    </StaggerItem>
  );
}

export function Skills({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="skills" className="py-24 md:py-32" variant="scale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel>Skills & Expertise</SectionLabel>
          <SectionTitle>Technologies I work with</SectionTitle>
        </div>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
