"use client";

import { achievements } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/reveal";
import { trackSpotlight } from "./ui/spotlight";

export function Achievements() {
  return (
    <section className="relative z-10 py-8 md:py-12">
      <div className="shell">
        <div className="mb-10 flex items-center gap-3">
          <span className="eyebrow">Recognition</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {achievements.map((a) => (
            <StaggerItem key={a.title} className="h-full">
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={trackSpotlight}
                className="panel spotlight group flex h-full flex-col p-6 transition-colors duration-500 hover:border-jade/25"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <span className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-jade">
                    ↗
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-jade/80">
                  {a.org}
                </p>
                <p className="mt-4 text-[0.86rem] leading-relaxed text-ink-dim">
                  {a.blurb}
                </p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
