"use client";

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

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const Icon = iconMap[skill.icon] || Code2;

  const categoryColors: Record<string, string> = {
    frontend: "from-blue-500/20 to-cyan-500/20 border-blue-500/20",
    backend: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20",
    design: "from-purple-500/20 to-pink-500/20 border-purple-500/20",
    security: "from-red-500/20 to-orange-500/20 border-red-500/20",
    other: "from-yellow-500/20 to-amber-500/20 border-yellow-500/20",
  };

  const iconColors: Record<string, string> = {
    frontend: "text-blue-400",
    backend: "text-emerald-400",
    design: "text-purple-400",
    security: "text-red-400",
    other: "text-yellow-400",
  };

  return (
    <StaggerItem>
      <div className="group relative">
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${categoryColors[skill.category]} border opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
        <div className="relative glass rounded-2xl p-5 glass-hover transition-all duration-500 group-hover:translate-y-[-4px]">
          <div className="flex flex-col items-center text-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl bg-glass-bg flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${iconColors[skill.category]}`}
            >
              <Icon size={24} />
            </div>
            <span className="text-sm font-medium text-text-primary group-hover:text-white transition-colors duration-300">
              {skill.name}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-text-tertiary">
              {skill.category}
            </span>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export function Skills({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel>Skills & Expertise</SectionLabel>
          <SectionTitle>Technologies I work with</SectionTitle>
        </div>

        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
