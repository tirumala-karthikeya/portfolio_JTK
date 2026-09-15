"use client";

import { motion } from "motion/react";
import { education, profile, skills } from "@/lib/content";
import { ImpactBars } from "./impact-bars";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const facts = [
  { k: "Based in", v: "Vijayawada, India" },
  { k: "Focus", v: "Full stack, APIs, cloud infrastructure" },
  { k: "Core stack", v: "TypeScript, React, Node, Python, Go" },
  { k: "Status", v: "Open to roles & freelance" },
];

/** What I actually do, in four verbs rather than four paragraphs. */
const owns = [
  { step: "Schema", note: "Data model, indexes, migrations" },
  { step: "API", note: "REST surface, auth, RBAC, validation" },
  { step: "UI", note: "React and Next.js, typed end to end" },
  { step: "Deploy", note: "AWS and DigitalOcean, Docker, Kubernetes, CI/CD" },
];

const marquee = skills.flatMap((g) => g.items).filter((s) => s.length < 18);

export function About() {
  return (
    <section id="about" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="I own the whole path to production."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
            <Reveal>
              <p className="text-[1.05rem] leading-[1.75] text-ink-dim">
                {profile.bio}
              </p>
            </Reveal>

            {/* Ownership rail: visual, not prose */}
            <Reveal delay={0.08}>
              <ol className="mt-8 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
                {owns.map((o, i) => (
                  <li
                    key={o.step}
                    className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors duration-300 hover:bg-raised"
                  >
                    <span className="tnum w-6 shrink-0 text-[0.68rem] text-jade">
                      0{i + 1}
                    </span>
                    <span className="w-20 shrink-0 text-[0.9rem] font-semibold text-ink">
                      {o.step}
                    </span>
                    <span className="h-px w-6 shrink-0 bg-line transition-colors duration-300 group-hover:bg-jade/50" />
                    <span className="text-[0.82rem] leading-snug text-ink-dim">
                      {o.note}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.12}>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.k} className="bg-surface p-4">
                    <dt className="eyebrow mb-1.5">{f.k}</dt>
                    <dd className="text-[0.86rem] leading-snug text-ink">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="panel mt-5 p-5">
                <div className="eyebrow mb-3">Education</div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[1.02rem] font-semibold tracking-tight text-ink">
                    {education.school}
                  </h3>
                  <span className="tnum text-xs text-ink-faint">
                    {education.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-ink-dim">{education.degree}</p>
                <p className="tnum mt-2 inline-block rounded-md border border-jade/25 bg-jade/10 px-2 py-0.5 text-xs text-jade">
                  {education.score}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <ImpactBars />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="marquee-mask relative mt-20 overflow-hidden border-y border-line py-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="marquee-track flex w-max gap-10"
        >
          {[...marquee, ...marquee].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="whitespace-nowrap font-mono text-[0.78rem] text-ink-faint"
            >
              {tech}
              <span className="ml-10 text-jade/35">/</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
