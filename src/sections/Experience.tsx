"use client";

import { Briefcase } from "lucide-react";
import { AnimatedSection, AnimatedText, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle, GlassCard } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

export function Experience({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="experience" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText delay={0}>
            <SectionLabel>Experience</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <SectionTitle>Where I&apos;ve worked</SectionTitle>
          </AnimatedText>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue/40 via-accent-purple/20 to-transparent" />

          <StaggerChildren className="space-y-8">
            {data.experience.map((exp) => (
              <StaggerItem key={exp.id}>
                <div className="relative pl-14">
                  <div className="absolute left-[11px] top-1 w-[17px] h-[17px] rounded-full bg-accent-blue/20 border-2 border-accent-blue flex items-center justify-center">
                    <div className="w-[7px] h-[7px] rounded-full bg-accent-blue" />
                  </div>

                  <GlassCard className="!p-5" hover={true} glow={false}>
                    <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-text-primary">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-accent-cyan">{exp.company}</p>
                      </div>
                      <span className="text-xs text-text-tertiary bg-glass-bg px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </GlassCard>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </AnimatedSection>
  );
}
