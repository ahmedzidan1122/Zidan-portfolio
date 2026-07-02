"use client";

import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";
import { AnimatedSection, AnimatedText, StaggerChildren, StaggerItem } from "@/components/AnimatedSection";
import { SectionLabel, SectionTitle } from "@/components/GlassCard";
import type { SiteData } from "@/lib/types";

const contactItems = [
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@zidan__v7",
    href: "https://instagram.com/zidan__v7",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: "zidanv07@gmail.com",
    href: "mailto:zidanv07@gmail.com",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+201006158659",
    href: "tel:+201006158659",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Message me",
    href: "https://wa.me/201006158659",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Egypt",
    href: null,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },
];

export function Contact({ data }: { data: SiteData }) {
  return (
    <AnimatedSection id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText delay={0}>
            <SectionLabel>Contact</SectionLabel>
          </AnimatedText>
          <AnimatedText delay={0.1}>
            <SectionTitle>Let&apos;s work together</SectionTitle>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <p className="text-text-secondary max-w-md mx-auto">
              Have a project in mind? Let&apos;s build something great together.
            </p>
          </AnimatedText>
        </div>

        <StaggerChildren className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group relative">
                <div className="relative glass rounded-xl p-5 glass-hover transition-all duration-500 group-hover:translate-y-[-2px]">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl ${item.bgColor} flex items-center justify-center ${item.color}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-text-primary mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <StaggerItem key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </AnimatedSection>
  );
}
