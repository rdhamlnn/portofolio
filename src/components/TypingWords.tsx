"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const WORDS = [
  "Web Developer",
  "Database Engineer",
  "Laravel Enthusiast",
  "Problem Solver",
];

// Static export: the server never sees the client's reduced-motion preference, so the
// server snapshot is `false` and hydration reconciles to the real value.
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(REDUCED_QUERY);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export default function TypingWords() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState({ index: 0, chars: 0, deleting: false });

  useEffect(() => {
    if (reduce) return;

    const word = WORDS[typed.index];
    const atEnd = typed.chars === word.length;
    const atStart = typed.chars === 0;

    if (typed.deleting ? atStart : atEnd) {
      const pause = typed.deleting ? 240 : 1700;
      const timer = window.setTimeout(
        () =>
          setTyped((s) =>
            s.deleting
              ? { index: (s.index + 1) % WORDS.length, chars: 0, deleting: false }
              : { ...s, deleting: true },
          ),
        pause,
      );
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(
      () => setTyped((s) => ({ ...s, chars: s.chars + (s.deleting ? -1 : 1) })),
      typed.deleting ? 42 : 78,
    );
    return () => window.clearTimeout(timer);
  }, [typed, reduce]);

  const shown = reduce ? WORDS[0] : WORDS[typed.index].slice(0, typed.chars);
  const caretVisible = reduce ? false : typed.chars > 0;

  return (
    <span className="text-accent2">
      {shown}
      {caretVisible && (
        <span className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent2 align-middle" />
      )}
    </span>
  );
}
