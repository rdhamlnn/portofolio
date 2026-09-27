"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Axis = "up" | "left" | "right" | "scale" | "blur" | "fade";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  axis?: Axis;
  className?: string;
};

export default function Reveal({ children, delay = 0, axis = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown="false"
      data-axis={axis}
      className={`reveal ${className ?? ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
