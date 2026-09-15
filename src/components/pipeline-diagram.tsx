"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { PipelineStage } from "@/lib/content";

type Accent = "jade" | "sky" | "violet" | "amber";

const tone: Record<
  Accent,
  { text: string; ring: string; fill: string; line: string; soft: string }
> = {
  jade: {
    text: "text-jade",
    ring: "border-jade/60 shadow-[0_0_26px_-6px_var(--color-jade)]",
    fill: "bg-jade",
    line: "from-jade to-jade/0",
    soft: "bg-jade/10",
  },
  sky: {
    text: "text-sky",
    ring: "border-sky/60 shadow-[0_0_26px_-6px_var(--color-sky)]",
    fill: "bg-sky",
    line: "from-sky to-sky/0",
    soft: "bg-sky/10",
  },
  violet: {
    text: "text-violet",
    ring: "border-violet/60 shadow-[0_0_26px_-6px_var(--color-violet)]",
    fill: "bg-violet",
    line: "from-violet to-violet/0",
    soft: "bg-violet/10",
  },
  amber: {
    text: "text-amber",
    ring: "border-amber/60 shadow-[0_0_26px_-6px_var(--color-amber)]",
    fill: "bg-amber",
    line: "from-amber to-amber/0",
    soft: "bg-amber/10",
  },
};

/**
 * The stage flow for a case study. Auto-advances so the architecture reads
 * itself, and holds still while the visitor is pointing at it.
 */
export function PipelineDiagram({
  stages,
  accent,
}: {
  stages: PipelineStage[];
  accent: Accent;
}) {
  const t = tone[accent];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const uid = useId();

  useEffect(() => {
    if (reduced || held || !inView) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % stages.length),
      3400
    );
    return () => clearInterval(id);
  }, [reduced, held, inView, stages.length]);

  const current = stages[active];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      className="rounded-2xl border border-line bg-base/60 p-5 md:p-7"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="eyebrow">Architecture</span>
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[0.62rem] text-ink-faint">
          {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
        </span>
      </div>

      {/* Stage rail */}
      <div className="flex flex-col gap-1 md:flex-row md:items-start">
        {stages.map((stage, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <div
              key={stage.id}
              className="flex flex-1 items-start gap-3 md:block"
            >
              <div className="flex flex-col items-center md:flex-row">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={stage.label}
                  aria-current={on}
                  className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-surface font-mono text-[0.68rem] transition-all duration-500 ${
                    on
                      ? `${t.ring} ${t.text}`
                      : done
                        ? "border-line text-ink-dim"
                        : "border-line text-ink-faint"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                  {on && (
                    <motion.span
                      layoutId={`stage-glow-${uid}`}
                      className={`absolute inset-0 -z-10 rounded-xl ${t.soft}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>

                {/* Connector: vertical on mobile, horizontal from md up */}
                {i < stages.length - 1 && (
                  <span className="relative my-1 h-6 w-px overflow-hidden bg-line md:my-0 md:mx-2 md:h-px md:w-full">
                    <motion.span
                      className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r ${t.line}`}
                      initial={false}
                      animate={{ opacity: i < active ? 1 : 0.15 }}
                      transition={{ duration: 0.6 }}
                    />
                  </span>
                )}
              </div>

              <div className="pb-4 md:pt-3">
                <p
                  className={`text-[0.82rem] font-medium transition-colors duration-500 ${
                    on ? "text-ink" : "text-ink-dim"
                  }`}
                >
                  {stage.label}
                </p>
                <p className="mt-0.5 font-mono text-[0.62rem] text-ink-faint">
                  {stage.tech}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* One detail at a time, instead of six paragraphs at once */}
      <div className="mt-2 min-h-[4.5rem] rounded-xl border border-line bg-surface/70 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${t.fill}`} />
              <span className={`text-[0.82rem] font-semibold ${t.text}`}>
                {current.label}
              </span>
            </div>
            <p className="mt-2 text-[0.86rem] leading-relaxed text-ink-dim">
              {current.detail}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
