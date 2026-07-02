"use client";

import { Heart } from "lucide-react";
import type { SiteData } from "@/lib/types";

export function Footer({ data }: { data: SiteData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-glass-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-tertiary">
            &copy; {year} {data.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary flex items-center gap-1">
            Crafted with <Heart size={12} className="text-red-400" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
