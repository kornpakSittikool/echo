"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  phase: number;
  twinkleSpeed: number;
  speedY: number;
};

export function BackgroundDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    // ⭐ เพิ่มดาวเยอะขึ้น
    const STAR_COUNT = width < 768 ? 120 : 320;

    const randomBetween = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const createStar = (): Star => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() < 0.7 ? 2 : 3, // pixel เล็ก ๆ
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: randomBetween(0.012, 0.03), // กระพริบเร็วขึ้นนิด
      speedY: randomBetween(-0.04, -0.12), // ลอยขึ้นช้า ๆ
    });

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(createStar());
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star, index) => {
        star.y += star.speedY;
        star.phase += star.twinkleSpeed;

        // กระพริบเบา ๆ
        const twinkle = (Math.sin(star.phase) + 1) / 2; // 0–1
        const alpha = 0.25 + twinkle * 0.55;

        if (star.y + star.size < 0) {
          stars[index] = {
            ...createStar(),
            y: height + star.size,
          };
        }

        ctx.fillStyle = `rgba(148, 163, 253, ${alpha})`;
        ctx.fillRect(
          Math.round(star.x),
          Math.round(star.y),
          star.size,
          star.size,
        );
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
