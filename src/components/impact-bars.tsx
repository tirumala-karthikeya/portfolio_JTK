"use client";

import { motion } from "motion/react";
import { impact } from "@/lib/content";

/**
 * Before / after bars on a shared scale. The bar length does the arguing,
 * so the copy can stay to one line per row.
 */
export function ImpactBars() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="text-[0.95rem] font-semibold tracking-tight text-ink">
            Measured impact
          </p>
          <p className="mt-0.5 font-mono text-[0.64rem] text-ink-faint">
            Before vs after, same workloads
          </p>
        </div>
        <span className="rounded-full border border-jade/30 bg-jade/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-jade">
          Shipped
        </span>
      </div>

      <div className="divide-y divide-line">
        {impact.map((row, i) => {
          const pct = (row.after / row.before) * 100;
          return (
            <div key={row.label} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.85rem] font-medium text-ink">{row.label}</p>
                <span className="tnum text-[0.95rem] font-semibold text-jade">
                  {row.delta}
                </span>
              </div>

              <div className="mt-3 space-y-1.5">
                {/* Before: full width, muted */}
                <div className="flex items-center gap-3">
                  <span className="w-11 shrink-0 font-mono text-[0.58rem] uppercase tracking-wider text-ink-faint">
                    Before
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                    <motion.span
                      className="block h-full rounded-full bg-ink-faint/45"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ originX: 0 }}
                    />
                  </span>
                  <span className="tnum w-24 shrink-0 text-right text-[0.7rem] text-ink-faint">
                    {row.beforeText}
                  </span>
                </div>

                {/* After: proportional, accented */}
                <div className="flex items-center gap-3">
                  <span className="w-11 shrink-0 font-mono text-[0.58rem] uppercase tracking-wider text-jade/70">
                    After
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-jade to-jade/70"
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 1.1,
                        delay: i * 0.1 + 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </span>
                  <span className="tnum w-24 shrink-0 text-right text-[0.7rem] font-medium text-jade">
                    {row.afterText}
                  </span>
                </div>
              </div>

              <p className="mt-2.5 text-[0.72rem] leading-snug text-ink-faint">
                {row.how}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
