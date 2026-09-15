"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { projects, type Project } from "@/lib/content";
import { Stagger, StaggerItem } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";
import { trackSpotlight } from "./ui/spotlight";

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.href ? motion.a : motion.div;

  return (
    <StaggerItem className="h-full">
      <Wrapper
        {...(project.href
          ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        onMouseMove={trackSpotlight}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="panel spotlight group flex h-full flex-col overflow-hidden transition-colors duration-500 hover:border-jade/25"
      >
        {project.image && (
          <div className="relative h-40 overflow-hidden border-b border-line">
            {/* Decorative preview, dimmed so it reads as texture rather than content. */}
            <Image
              src={project.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="scale-105 object-cover opacity-[0.28] grayscale transition-all duration-700 group-hover:scale-100 group-hover:opacity-50 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/55 to-transparent" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {project.name}
              </h3>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-wider text-jade/80">
                {project.tag}
              </p>
            </div>
            {project.href && (
              <span className="shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-jade">
                ↗
              </span>
            )}
          </div>

          <p className="mt-4 flex-1 text-[0.88rem] leading-relaxed text-ink-dim">
            {project.blurb}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line bg-raised px-2 py-1 font-mono text-[0.64rem] text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Wrapper>
    </StaggerItem>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative z-10 scroll-mt-24 py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Things I build on my own time."
          intro="Side projects where I own every decision: schema, API surface, interface and infrastructure."
        />

        <Stagger className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
