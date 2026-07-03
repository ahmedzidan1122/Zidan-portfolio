"use client";

import { Code2, Shield, Video, Palette } from "lucide-react";
import { AnimatedSection, AnimatedText } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const highlights = [
  { icon: Code2, label: "Full Stack Development", color: "text-accent-blue" },
  { icon: Shield, label: "Cyber Security", color: "text-accent-purple" },
  { icon: Video, label: "Video Editing", color: "text-accent-cyan" },
  { icon: Palette, label: "Graphic Design", color: "text-accent-teal" },
];

export function About({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="about" className="py-24 md:py-32" variant="slide-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <AnimatedText delay={0}>
              <SectionLabel>About Me</SectionLabel>
            </AnimatedText>
            <AnimatedText delay={0.1} as="h2">
              <SectionTitle>Crafting digital experiences</SectionTitle>
            </AnimatedText>

            <div className="space-y-4 mt-6">
              {data.aboutDescription.map((paragraph, i) => (
                <AnimatedText key={i} delay={0.2 + i * 0.1}>
                  <p className="text-text-secondary leading-relaxed">{paragraph}</p>
                </AnimatedText>
              ))}
            </div>
          </div>

          <div>
            <AnimatedText delay={0.3}>
              <SectionLabel>What I Do</SectionLabel>
            </AnimatedText>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {highlights.map((item, i) => (
                <AnimatedText key={i} delay={0.4 + i * 0.1}>
                  <div className="glass rounded-xl p-5 glass-hover">
                    <item.icon size={24} className={`${item.color} mb-3`} />
                    <h3 className="text-sm font-medium text-text-primary">
                      {item.label}
                    </h3>
                  </div>
                </AnimatedText>
              ))}
            </div>

            <AnimatedText delay={0.8}>
              <div className="mt-6 glass rounded-xl p-5">
                <h3 className="text-sm font-medium text-text-primary mb-3">
                  Quick Facts
                </h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent-blue" />
                    Fluent in English
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent-purple" />
                    Located in {data.contact.location}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent-cyan" />
                    Always learning
                  </li>
                </ul>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
