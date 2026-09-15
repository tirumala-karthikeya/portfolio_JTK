"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { profile, socials } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { Magnetic } from "./ui/magnetic";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const glowScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [0.6, 1.1]
  );
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked (insecure context or denied). The mailto link still works.
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative z-10 scroll-mt-24 overflow-hidden py-28 md:py-40"
    >
      <motion.div
        aria-hidden
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade/[0.07] blur-[140px]"
      />

      <div className="shell relative text-center">
        <Reveal>
          <div className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-jade" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
            </span>
            <span className="font-mono text-[0.7rem] tracking-wide text-ink-dim">
              Available for new work
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mx-auto max-w-3xl text-[clamp(2.1rem,5.5vw,3.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-gradient">
            Let&apos;s build something
            <br />
            <span className="accent-gradient">worth deploying.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-lg text-[1rem] leading-relaxed text-ink-dim">
            Whether it&apos;s a platform to architect, an API surface to design or
            infrastructure to tame, I&apos;d like to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.28}>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_44px_-6px] hover:shadow-jade/60"
              >
                {profile.email}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-5 py-3.5 text-sm font-medium text-ink-dim backdrop-blur-sm transition-colors duration-300 hover:border-jade/45 hover:text-jade"
            >
              {copied ? "Copied" : "Copy"}
              <span className="font-mono text-xs">{copied ? "✓" : "⧉"}</span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.78rem] text-ink-faint">
            <a
              href={`tel:${profile.phoneHref}`}
              className="transition-colors duration-300 hover:text-jade"
            >
              {profile.phone}
            </a>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <span>{profile.location}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-10">
      <div className="shell flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface font-mono text-[0.6rem] font-bold text-jade">
            {profile.initials}
          </span>
          <p className="font-mono text-[0.72rem] text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] text-ink-faint transition-colors duration-300 hover:text-jade"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[0.68rem] text-ink-faint">
          Built with Next.js &amp; Motion
        </p>
      </div>
    </footer>
  );
}
