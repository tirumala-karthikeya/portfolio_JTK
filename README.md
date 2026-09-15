# portfolio-jtk

Portfolio of **Jaddu Tirumala Karthikeya**, Full Stack Developer.
Live at [portfolio-jtk.vercel.app](https://portfolio-jtk.vercel.app/).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion (Framer Motion)

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

Everything the page displays lives in [`src/lib/content.ts`](src/lib/content.ts):
profile, stats, impact figures, experience, case studies, projects, skills,
education and achievements. Change it there and every section follows.

House style: **no em dashes** in visitor-facing copy. Use commas, colons,
parentheses or "to" for ranges.

## Structure

```
src/
  app/
    layout.tsx        fonts, metadata, theme
    globals.css       design tokens and utilities
    page.tsx          section composition
  lib/content.ts      all site content
  components/
    hero.tsx          headline, rotating role, stat strip
    hero-canvas.tsx   animated node graph on <canvas>
    about.tsx         bio, ownership rail, impact scorecard
    impact-bars.tsx   before/after metric bars
    case-studies.tsx  the three detailed case studies
    pipeline-diagram.tsx  auto-advancing architecture diagram
    experience.tsx    scroll-linked timeline
    projects.tsx      side project grid
    skills.tsx        proficiency meters
    achievements.tsx  recognition cards
    contact.tsx       CTA and footer
    ui/               reveal, counter, magnetic, spotlight, section heading
```

## Accessibility

`prefers-reduced-motion` is honoured throughout: the canvas renders a single
still frame, counters jump to their final value, and transitions collapse.
