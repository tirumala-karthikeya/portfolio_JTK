"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./reveal";

/** Section header with an index chip, a rule that draws itself in, and a parallax ghost numeral. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [60, -60]);

  return (
    <div ref={ref} className="relative mb-14 md:mb-20">
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-bold leading-none text-white/[0.025] md:text-[11rem]"
      >
        {index}
      </motion.span>

      <Reveal>
        <div className="flex items-center gap-3">
          <span className="tnum text-xs text-jade">{index}</span>
          <span className="eyebrow">{eyebrow}</span>
          <motion.span
            className="h-px flex-1 origin-left bg-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>

      {intro && (
        <Reveal delay={0.14}>
          <p className="mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-ink-dim">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
