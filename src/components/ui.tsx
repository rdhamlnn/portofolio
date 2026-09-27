import type { ReactNode } from "react";

/**
 * Generic UI glyphs. Plain strokes on a 24-unit grid, inheriting `currentColor`,
 * so they inherit the text color and weight of whatever they sit in.
 */
function Stroke({ className, children }: { className: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M4.5 12h14M12.5 6l6 6-6 6" />
    </Stroke>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
    </Stroke>
  );
}

export function ArrowUp({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M12 19.5V5M5.5 11.5l6.5-6.5 6.5 6.5" />
    </Stroke>
  );
}

export function Mail({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </Stroke>
  );
}

export function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M6.5 15H5.5A2.5 2.5 0 0 1 3 12.5v-7A2.5 2.5 0 0 1 5.5 3h7A2.5 2.5 0 0 1 15 5.5v1" />
    </Stroke>
  );
}

export function Check({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="m5 12.5 5 5 9-11" />
    </Stroke>
  );
}

/* --- Generic concept glyphs. Not everything has a brand mark: "REST API",
   "Database Design", and "Migration & Seeder" are ideas, not logos. These are
   drawn strokes so those rows still line up with the branded ones. --- */

export function Braces({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M9 4.5c-2.1 0-2.1 2.5-2.1 3.8 0 1.9-.9 2.9-2.4 3.7 1.5.8 2.4 1.8 2.4 3.7 0 1.3 0 3.8 2.1 3.8" />
      <path d="M15 4.5c2.1 0 2.1 2.5 2.1 3.8 0 1.9.9 2.9 2.4 3.7-1.5.8-2.4 1.8-2.4 3.7 0 1.3 0 3.8-2.1 3.8" />
    </Stroke>
  );
}

export function Database({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <ellipse cx="12" cy="6.2" rx="8.25" ry="3.2" />
      <path d="M3.75 6.2v11.6c0 1.77 3.69 3.2 8.25 3.2s8.25-1.43 8.25-3.2V6.2" />
      <path d="M20.25 12c0 1.77-3.69 3.2-8.25 3.2s-8.25-1.43-8.25-3.2" />
    </Stroke>
  );
}

export function Migration({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M12 14.5V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4 17.5h16M4 21h16" />
    </Stroke>
  );
}

export function Template({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <Stroke className={className}>
      <path d="M9.5 5 4.5 12l5 7M14.5 5l5 7-5 7" />
    </Stroke>
  );
}
