"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { caseStudies, type CaseStudy } from "@/lib/content";
import { PipelineDiagram } from "./pipeline-diagram";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { trackSpotlight } from "./ui/spotlight";

// Full class strings: Tailwind scans source text, so `hover:${t.edge}` would
// never be generated.
const tone = {
  jade: {
    text: "text-jade",
    dot: "bg-jade",
    glow: "bg-jade/[0.08]",
    edge: "hover:border-jade/25",
  },
  sky: {
    text: "text-sky",
    dot: "bg-sky",
    glow: "bg-sky/[0.08]",
    edge: "hover:border-sky/25",
  },
  violet: {
    text: "text-violet",
    dot: "bg-violet",
    glow: "bg-violet/[0.08]",
    edge: "hover:border-violet/25",
  },
  amber: {
    text: "text-amber",
    dot: "bg-amber",
    glow: "bg-amber/[0.08]",
    edge: "hover:border-amber/25",
  },
} as const;

function StudyBlock({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const t = tone[study.accent];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -70]);

  return (
    <article
      ref={ref}
      id={`case-${study.slug}`}
      className="relative scroll-mt-28"
    >
      <motion.span
        aria-hidden
        style={{ y: glowY }}
        className={`pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full blur-[120px] ${t.glow}`}
      />

      <div
        onMouseMove={trackSpotlight}
        className={`panel spotlight relative overflow-hidden p-6 transition-colors duration-500 md:p-9 ${t.edge}`}
      >
        {/* Header: identity and the three numbers that matter */}
        <Reveal amount={0.15}>
          <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                <span className="eyebrow">{study.kicker}</span>
              </div>
              <h3 className="text-[1.6rem] font-semibold leading-tight tracking-tight text-ink md:text-[2.1rem]">
                {study.name}
              </h3>
              <p className="mt-2 font-mono text-[0.72rem] text-ink-faint">
                {study.org} <span className="text-line">/</span> {study.period}
              </p>
            </div>

            <span className="tnum text-5xl font-bold leading-none text-white/[0.05] md:text-7xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </Reveal>

        <Reveal amount={0.15} delay={0.05}>
          <dl className="mt-7 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {study.metrics.map((m) => (
              <div key={m.label} className="bg-base/80 px-5 py-4">
                <dt className={`tnum text-[1.35rem] font-semibold leading-none ${t.text}`}>
                  {m.value}
                </dt>
                <dd className="mt-2 text-[0.74rem] leading-snug text-ink-dim">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Problem and approach, two tight columns instead of a wall */}
        <Reveal amount={0.15} delay={0.08}>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="eyebrow mb-2.5">The problem</p>
              <p className="text-[0.88rem] leading-relaxed text-ink-dim">
                {study.problem}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface/60 p-5">
              <p className="eyebrow mb-2.5">What I built</p>
              <p className="text-[0.88rem] leading-relaxed text-ink-dim">
                {study.approach}
              </p>
            </div>
          </div>
        </Reveal>

        {/* The diagram carries the detail that used to be prose */}
        <Reveal amount={0.1} delay={0.1}>
          <div className="mt-5">
            <PipelineDiagram stages={study.stages} accent={study.accent} />
          </div>
        </Reveal>

        <Reveal amount={0.1} delay={0.12}>
          <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {study.highlights.map((h) => (
              <div key={h.title} className="bg-surface/80 p-5">
                <p className={`text-[0.84rem] font-semibold ${t.text}`}>
                  {h.title}
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-ink-dim">
                  {h.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal amount={0.1} delay={0.14}>
          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-6">
            {study.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[0.66rem] text-ink-dim"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Case studies"
          title="Four systems, in detail."
          intro="Not screenshots. The actual problem, the architecture I chose, and the number it moved. Click any stage to walk the pipeline."
        />

        <div className="space-y-8 md:space-y-12">
          {caseStudies.map((study, i) => (
            <StudyBlock key={study.slug} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
