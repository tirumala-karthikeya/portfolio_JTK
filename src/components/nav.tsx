"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { profile, sections } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: the section whose top sits nearest under the navbar wins.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line/80 bg-void/72 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-[68px] items-center justify-between">
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-surface font-mono text-[0.68rem] font-bold text-jade transition-colors duration-300 group-hover:border-jade/50">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-ink sm:block">
              {profile.shortName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative block rounded-full px-3.5 py-1.5 text-[0.82rem] transition-colors duration-300 ${
                    active === s.id
                      ? "text-ink"
                      : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full border border-jade/30 bg-jade/10 px-4 py-1.5 text-[0.82rem] font-medium text-jade transition-colors duration-300 hover:bg-jade hover:text-void sm:block"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface md:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 top-0 h-px bg-ink"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-[5px] h-px bg-ink"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 top-[10px] h-px bg-ink"
                />
              </span>
            </button>
          </div>
        </nav>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-jade via-jade to-violet"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex h-full flex-col justify-center gap-1">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.06 * i + 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-5 text-3xl font-semibold tracking-tight text-ink"
                  >
                    <span className="tnum text-xs text-jade">
                      0{i + 1}
                    </span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
