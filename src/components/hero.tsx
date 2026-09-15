"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile, socials, stats } from "@/lib/content";
import { HeroCanvas } from "./hero-canvas";
import { Counter } from "./ui/counter";
import { Magnetic } from "./ui/magnetic";

/** Types each role in, holds, deletes, moves to the next. */
function useTypewriter(words: readonly string[], reduced: boolean) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduced ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];
    const done = text === word;

    let delay = deleting ? 38 : 72;
    if (done && !deleting) delay = 2100;
    if (text === "" && deleting) delay = 320;

    const timer = setTimeout(() => {
      if (done && !deleting) {
        setDeleting(true);
      } else if (text === "" && deleting) {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, reduced]);

  return text;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const typed = useTypewriter(profile.roles, !!reduced);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 190]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Depth stack: node field, accent blooms, vignette */}
      <motion.div style={{ y: canvasY }} className="absolute inset-0 z-0">
        <HeroCanvas />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18%] z-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-jade/[0.07] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 z-0 h-[420px] w-[620px] rounded-full bg-violet/[0.06] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-void to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative z-10"
      >
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-jade" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
          </span>
          <span className="font-mono text-[0.7rem] tracking-wide text-ink-dim">
            Open to full-stack roles &amp; freelance
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4"
        >
          {profile.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.95, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-[clamp(2.4rem,7.2vw,5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-gradient"
        >
          Jaddu Tirumala
          <br />
          Karthikeya
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex min-h-[2.1rem] items-center gap-3"
        >
          <span className="font-mono text-sm text-jade">&gt;</span>
          <span className="caret font-mono text-base text-ink sm:text-lg">
            {typed}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-dim"
        >
          {profile.tagline} Currently at{" "}
          <span className="text-ink">Xpectrum AI</span>, working across healthcare
          data platforms, payments infrastructure and agentic AI workflows.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.25}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-jade px-6 py-3 text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_38px_-6px] hover:shadow-jade/60"
            >
              View selected work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-medium text-ink backdrop-blur-sm transition-colors duration-300 hover:border-jade/45 hover:text-jade"
            >
              Résumé
              <span className="text-ink-faint">↗</span>
            </a>
          </Magnetic>

          <div className="ml-1 hidden items-center gap-4 sm:flex">
            <span className="h-4 w-px bg-line" />
            {socials.slice(0, 3).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-ink-faint transition-colors duration-300 hover:text-jade"
              >
                {s.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Headline numbers */}
        <motion.dl
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-base/85 p-5 backdrop-blur-sm">
              <dt className="tnum text-2xl font-semibold text-jade sm:text-[1.7rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </dt>
              <dd className="mt-1.5 text-[0.78rem] leading-snug text-ink-dim">
                {s.label}
              </dd>
              <dd className="mt-1 font-mono text-[0.65rem] text-ink-faint">
                {s.note}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-jade"
            animate={reduced ? {} : { y: ["-100%", "260%"] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
