"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { AnimatedSection, AnimatedText, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const projectColors = [
  "from-blue-500/10 via-cyan-500/10 to-transparent",
  "from-purple-500/10 via-pink-500/10 to-transparent",
  "from-emerald-500/10 via-teal-500/10 to-transparent",
  "from-orange-500/10 via-red-500/10 to-transparent",
  "from-indigo-500/10 via-purple-500/10 to-transparent",
  "from-cyan-500/10 via-blue-500/10 to-transparent",
];

export function Projects({ data }: { data: SiteData }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <AnimatedSection id="projects" className="py-24 md:py-32" variant="slide-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText delay={0}>
            <SectionLabel>Projects</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <SectionTitle>Selected work</SectionTitle>
          </AnimatedText>
        </div>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project, i) => (
            <StaggerItem key={project.id}>
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="absolute inset-0 bg-gradient-to-br glass rounded-2xl" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${projectColors[i % projectColors.length]} rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative p-5">
                  <div className="relative h-40 mb-4 rounded-xl overflow-hidden bg-glass-bg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1))",
                      }}
                    />
                  </div>

                  <h3 className="text-base font-semibold text-text-primary mb-2 md:group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1 rounded-full bg-glass-bg text-text-tertiary border border-glass-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-accent-cyan hover:text-accent-blue transition-colors"
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-primary transition-colors"
                      >
                        <GithubIcon size={12} />
                        Code
                      </a>
                    )}
                  </div>
                </div>

                {hoveredId === project.id && (
                  <motion.div
                    className="absolute inset-0 border border-accent-blue/20 rounded-2xl pointer-events-none"
                    layoutId="project-border"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
