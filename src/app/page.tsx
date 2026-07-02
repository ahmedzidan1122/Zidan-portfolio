"use client";

import { useEffect, useState } from "react";
import { Background } from "@/components/Background";
import { CursorGlow } from "@/components/CursorGlow";
import { FloatingShapes } from "@/components/FloatingShapes";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Services } from "@/sections/Services";
import { CreativeInterests } from "@/sections/CreativeInterests";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { defaultData } from "@/lib/defaultData";
import type { SiteData } from "@/lib/types";

export default function Home() {
  const [data, setData] = useState<SiteData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Use default data on error
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-bg-primary">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-accent-blue border-t-transparent animate-spin" />
          <span className="text-sm text-text-tertiary">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Background />
      <FloatingShapes />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero data={data} />
        <About data={data} />
        <Skills data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Services data={data} />
        <CreativeInterests data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </>
  );
}
