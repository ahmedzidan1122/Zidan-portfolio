"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] hidden lg:block"
      style={{
        left: position.x - 150,
        top: position.y - 150,
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)",
        borderRadius: "50%",
        transform: "translate(0, 0)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
