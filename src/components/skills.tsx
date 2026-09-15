"use client";

import { motion } from "motion/react";
import { skills } from "@/lib/content";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { trackSpotlight } from "./ui/spotlight";

export function Skills() {
  return (
    <section id="skills" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Toolkit"
          title="What I reach for."
          intro="Grouped by where it sits in the stack. Everything here has shipped to production."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.group} delay={gi * 0.06} amount={0.2}>
              <div
                onMouseMove={trackSpotlight}
                className="panel spotlight h-full p-6 transition-colors duration-500 hover:border-jade/25"
              >
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-[0.95rem] font-semibold tracking-tight text-ink">
                    {group.group}
                  </h3>
                  <span className="tnum text-[0.72rem] text-jade">
                    {group.level}%
                  </span>
                </div>

                {/* Proficiency meter, drawn on scroll */}
                <span className="mb-5 block h-1 overflow-hidden rounded-full bg-raised">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-jade via-jade to-violet"
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${group.level}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 1.1,
                      delay: gi * 0.06 + 0.15,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </span>

                <motion.ul
                  className="flex flex-wrap gap-1.5"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.03 } },
                  }}
                >
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 6 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-lg border border-line bg-raised px-2.5 py-1.5 font-mono text-[0.7rem] text-ink-dim transition-colors duration-300 hover:border-jade/40 hover:text-jade"
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
