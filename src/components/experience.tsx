"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { experience, type Role } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { trackSpotlight } from "./ui/spotlight";

/** Renders the **bold** spans the resume bullets use for metrics. */
function Bullet({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function RoleCard({ role, index }: { role: Role; index: number }) {
  return (
    <Reveal delay={index * 0.05} amount={0.15}>
      <div className="relative pl-10 md:pl-16">
        {/* Node on the rail */}
        <span className="absolute left-0 top-2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-line bg-base md:left-0">
          {role.current ? (
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-jade" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
            </span>
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
          )}
        </span>

        <div
          onMouseMove={trackSpotlight}
          className="panel spotlight group p-6 transition-colors duration-500 hover:border-jade/25 md:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
                  {role.company}
                </h3>
                <span className="rounded-full border border-line bg-raised px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-ink-faint">
                  {role.type}
                </span>
                {role.current && (
                  <span className="rounded-full border border-jade/30 bg-jade/10 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-jade">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-[0.95rem] text-jade">{role.title}</p>
            </div>

            <div className="text-right">
              <p className="tnum text-xs text-ink-dim">{role.period}</p>
              <p className="mt-1 font-mono text-[0.68rem] text-ink-faint">
                {role.location}
              </p>
            </div>
          </div>

          <p className="mt-4 text-[0.92rem] leading-relaxed text-ink-dim">
            {role.summary}
          </p>

          <ul className="mt-5 space-y-3">
            {role.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 text-[0.9rem] leading-relaxed text-ink-dim"
              >
                <span
                  aria-hidden
                  className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-jade/50"
                />
                <span>
                  <Bullet text={b} />
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-line pt-5">
            {role.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[0.66rem] text-ink-dim transition-colors duration-300 group-hover:border-line group-hover:text-ink"
              >
                {t}
              </span>
            ))}
            {role.caseStudy && (
              <a
                href={`#case-${role.caseStudy}`}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-jade/30 bg-jade/10 px-2.5 py-1 font-mono text-[0.66rem] text-jade transition-colors duration-300 hover:bg-jade hover:text-void"
              >
                Read the case study
                <span aria-hidden>↑</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const railScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rail = useTransform(railScale, (v) => (reduced ? 1 : v));

  return (
    <section id="experience" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've shipped."
          intro="Two and a half years across product engineering, platform work and client delivery, from WhatsApp bots to multi-tenant payments infrastructure."
        />

        <div ref={ref} className="relative">
          {/* Track + scroll-linked fill */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-line md:left-0"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: rail }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-jade via-jade to-violet md:left-0"
          />

          <div className="space-y-6 md:space-y-8">
            {experience.map((role, i) => (
              <RoleCard key={role.company} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
