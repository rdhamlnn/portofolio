"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
};

const HUES = [258, 190, 330];
const LINK_DIST = 132;
const CURSOR_DIST = 168;

export default function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const cv = canvas;
    const hs = host;
    const cx = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;
    const pointer = { x: -9999, y: -9999, active: false };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    function seed() {
      const area = width * height;
      const count = Math.max(28, Math.min(96, Math.round(area / 19000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.5 + 0.75,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      }));
    }

    function resize() {
      const rect = hs.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function onPointerMove(event: MouseEvent) {
      const rect = hs.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active =
        pointer.x > -80 && pointer.y > -80 && pointer.x < width + 80 && pointer.y < height + 80;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function draw() {
      if (!running) return;
      cx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < CURSOR_DIST && dist > 0.001) {
            const push = (1 - dist / CURSOR_DIST) * 0.55;
            p.x += (dx / dist) * push;
            p.y += (dy / dist) * push;
          }
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DIST) continue;
          const alpha = (1 - dist / LINK_DIST) * 0.28;
          cx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${alpha})`;
          cx.lineWidth = 1;
          cx.beginPath();
          cx.moveTo(a.x, a.y);
          cx.lineTo(b.x, b.y);
          cx.stroke();
        }
      }

      if (pointer.active) {
        cx.beginPath();
        cx.arc(pointer.x, pointer.y, 150, 0, Math.PI * 2);
        const glow = cx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          150,
        );
        glow.addColorStop(0, "rgba(124, 92, 255, 0.13)");
        glow.addColorStop(1, "rgba(124, 92, 255, 0)");
        cx.fillStyle = glow;
        cx.fill();
      }

      for (const p of particles) {
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fillStyle = `hsla(${p.hue}, 95%, 74%, 0.85)`;
        cx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) {
        cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(draw);
      }
    }

    resize();
    raf = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseout", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseout", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block" />;
}
