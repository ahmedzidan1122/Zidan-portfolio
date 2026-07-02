"use client";

import { Film, Music, BookOpen, Sparkles } from "lucide-react";
import { AnimatedSection, AnimatedText, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const interestIcons = [Film, Sparkles, Music, BookOpen];

export function CreativeInterests({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="interests" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText delay={0}>
            <SectionLabel>Beyond Code</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <SectionTitle>Creative interests</SectionTitle>
          </AnimatedText>
        </div>

        <StaggerChildren className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
          {data.creativeInterests.map((interest, i) => {
            const Icon = interestIcons[i % interestIcons.length];
            return (
              <StaggerItem key={interest}>
                <div className="group relative">
                  <div className="relative glass rounded-xl p-5 glass-hover flex items-center gap-4 transition-all duration-500 md:group-hover:translate-x-1">
                    <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      {interest}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
