"use client";

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

export default function Home() {
  return (
    <>
      <Background />
      <FloatingShapes />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero data={defaultData} />
        <About data={defaultData} />
        <Skills data={defaultData} />
        <Experience data={defaultData} />
        <Projects data={defaultData} />
        <Services data={defaultData} />
        <CreativeInterests data={defaultData} />
        <Contact data={defaultData} />
      </main>
      <Footer data={defaultData} />
    </>
  );
}
