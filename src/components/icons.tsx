import type { ReactNode } from "react";
import { brandByName, brandPaths } from "./brand-paths";
import { Braces, Database, Migration } from "./ui";

/**
 * Rows that are concepts rather than products: there is no brand logo for
 * "REST API" or "Database Design", so those names map to a drawn glyph instead
 * of a fake logo. Keeps every row visually aligned.
 */
const CONCEPT: Record<string, (p: { className?: string }) => ReactNode> = {
  rest: Braces,
  database: Database,
  migration: Migration,
};

/**
 * Brand mark on the canonical 24-unit simple-icons grid, so every mark carries
 * its own optical weight. Inherits `currentColor` — set color with a text class
 * and size with h-/w- utilities.
 */
export function BrandIcon({
  brand,
  className = "h-4 w-4",
  title,
}: {
  brand: string;
  className?: string;
  title?: string;
}) {
  const d = brandPaths[brand];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
      fill="currentColor"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  );
}

/** Brand mark for a display name, or nothing when there is no mark for it. */
export function TechMark({
  name,
  className = "h-4 w-4",
  fallback,
}: {
  name: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const key = brandByName[name];
  if (!key) return <>{fallback ?? null}</>;
  const Concept = CONCEPT[key];
  if (Concept) return <>{Concept({ className })}</>;
  return <BrandIcon brand={key} className={className} title={name} />;
}

/** Brand key for a display name, or undefined when there is no mark for it. */
export function brandOf(name: string) {
  return brandByName[name];
}
