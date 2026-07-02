"use client";

import { useEffect, useState } from "react";

interface Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const count = 5;
    const initial: Shape[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 200 + 100,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.03 + 0.02,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
    }));
    setShapes(initial);

    let frame: number;
    const animate = () => {
      setShapes((prev) =>
        prev.map((s) => {
          let x = s.x + s.speedX;
          let y = s.y + s.speedY;
          let r = s.rotation + s.rotationSpeed;

          if (x < -s.size) x = window.innerWidth + s.size;
          if (x > window.innerWidth + s.size) x = -s.size;
          if (y < -s.size) y = window.innerHeight + s.size;
          if (y > window.innerHeight + s.size) y = -s.size;

          return { ...s, x, y, rotation: r };
        })
      );
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotation}deg)`,
            borderColor: i % 2 === 0 ? "rgba(59, 130, 246, 0.15)" : "rgba(139, 92, 246, 0.15)",
            borderRadius: i % 3 === 0 ? "30% 70% 50% 50% / 40% 40% 60% 60%" : "60% 40% 30% 70% / 60% 30% 70% 40%",
          }}
        />
      ))}
    </div>
  );
}
