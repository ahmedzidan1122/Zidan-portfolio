"use client";

import { Code2, Palette, Target, Shield, type LucideIcon } from "lucide-react";
import { AnimatedSection, AnimatedText, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  target: Target,
  shield: Shield,
};

export function Services({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText delay={0}>
            <SectionLabel>Services</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <SectionTitle>What I can do for you</SectionTitle>
          </AnimatedText>
        </div>

        <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <StaggerItem key={service.id}>
                <div className="group relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative glass rounded-2xl p-6 glass-hover transition-all duration-500 group-hover:translate-y-[-4px]">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mb-4 text-accent-cyan group-hover:scale-110 transition-transform duration-500">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
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
