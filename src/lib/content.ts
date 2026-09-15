// Single source of truth for everything on the page.
// Mirrors Resume_Karthikeya.pdf. Edit here, the whole site follows.
// House style: no em dashes anywhere in visitor-facing copy.

export const profile = {
  name: "Jaddu Tirumala Karthikeya",
  shortName: "JT Karthikeya",
  initials: "JTK",
  role: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "Backend & API Engineer",
    "Cloud & DevOps Practitioner",
    "AI Workflow Builder",
  ],
  tagline:
    "I build production systems end to end, then deploy and run them myself on AWS and DigitalOcean.",
  bio: "Two and a half years building production systems for enterprise clients: a healthcare ingestion platform moving 600K+ records, a multi-tenant payments stack wired to five financial providers, and an app estate I migrated, containerised and instrumented myself.",
  location: "Vijayawada, Andhra Pradesh, India",
  email: "j.karthikeya2004@gmail.com",
  phone: "+91 91829 52376",
  phoneHref: "+919182952376",
  available: true,
  resumeUrl:
    "https://drive.google.com/file/d/1ECq9ncYLbou5VDx5jyS9uHxShdCcJKZ-/view?usp=sharing",
} as const;

export const socials = [
  { label: "GitHub", handle: "tirumala-karthikeya", href: "https://github.com/tirumala-karthikeya" },
  { label: "LinkedIn", handle: "karthikeya-j-t", href: "https://www.linkedin.com/in/karthikeya-j-t/" },
  { label: "LeetCode", handle: "jtkarthikeya_2004", href: "https://leetcode.com/u/jtkarthikeya_2004/" },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
] as const;

/** Headline numbers, straight off the resume. */
export const stats = [
  { value: 600, suffix: "K+", label: "Records processed", note: "Opzig ingestion" },
  { value: 40, suffix: "%", label: "Infra cost cut", note: "AWS to DigitalOcean" },
  { value: 15, suffix: "+", label: "REST APIs designed", note: "Express & FastAPI" },
  { value: 6, suffix: "+", label: "Enterprise clients", note: "Shipped end to end" },
] as const;

/**
 * Before / after pairs. `before` and `after` are plotted on a shared scale,
 * so the bar length itself carries the story.
 */
export const impact = [
  {
    label: "Infrastructure cost",
    before: 100,
    after: 60,
    beforeText: "Baseline",
    afterText: "40% lower",
    delta: "-40%",
    how: "Migrated the production estate from AWS to DigitalOcean",
  },
  {
    label: "Deployment time",
    before: 30,
    after: 5,
    beforeText: "30 min",
    afterText: "under 5 min",
    delta: "-83%",
    how: "Containerised builds behind GitHub Actions CI/CD",
  },
  {
    label: "Production debugging",
    before: 100,
    after: 50,
    beforeText: "Baseline",
    afterText: "50% faster",
    delta: "-50%",
    how: "OpenTelemetry traces and Grafana dashboards across services",
  },
  {
    label: "Manual clinic onboarding",
    before: 100,
    after: 20,
    beforeText: "Baseline",
    afterText: "80% less effort",
    delta: "-80%",
    how: "LLM enrichment pipeline on AWS Lambda",
  },
] as const;

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  summary: string;
  bullets: string[];
  stack: string[];
  current?: boolean;
  caseStudy?: string;
};

export const experience: Role[] = [
  {
    company: "Xpectrum AI",
    title: "Full Stack Developer",
    period: "Mar 2025 to Present",
    location: "Remote",
    type: "Full-time",
    summary:
      "Own enterprise web products end to end: frontend, APIs, cloud infrastructure and AI services.",
    bullets: [
      "Architected **Opzig**, a healthcare ingestion platform handling **600K+ appointment records** across heterogeneous EHR systems.",
      "Shipped **4 production applications** for **6+ enterprise clients** and designed **15+ REST APIs** on Express.js and FastAPI.",
      "Split the product into **7 independently deployable services** behind a Go gateway, with Pulumi infrastructure and three environment CI/CD.",
      "Cut infrastructure cost **40%** with an AWS to DigitalOcean migration, and debugging time **50%** with OpenTelemetry, Tempo, Prometheus, Loki and Grafana.",
      "Built **10+ agentic AI workflows** that reduced manual healthcare onboarding effort by **80%**.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "Go", "Kubernetes", "Pulumi", "OpenTelemetry"],
    current: true,
    caseStudy: "opzig",
  },
  {
    company: "KraftNex",
    title: "Full Stack Developer, Freelance",
    period: "2026",
    location: "Remote",
    type: "Contract",
    summary:
      "An AI voice agent that answers customer support on a live Indian phone number.",
    bullets: [
      "Built a full duplex **voice agent over the phone network**, wiring Plivo telephony to streaming speech to text, a retrieval grounded LLM and speech synthesis back out.",
      "Tuned the interruption model against real calls: **20ms audio framing** for instant barge-in, backchannel and line echo filtering, and bounded silence check-ins.",
      "Grounded answers on a **chunked and embedded knowledge base** with a relevance floor, so the agent offers a callback instead of guessing a price.",
      "Added **per call cost accounting in INR** across telephony, speech and model usage for the admin dashboard.",
    ],
    stack: ["Node.js", "Plivo", "Deepgram", "GPT-4o mini", "MongoDB", "WebSockets"],
    caseStudy: "voice",
  },
  {
    company: "BrainWaveWorld",
    title: "Full Stack Developer, Freelance",
    period: "Apr 2026 to Sep 2026",
    location: "Remote",
    type: "Contract",
    summary:
      "Built a multi-tenant financial payments platform covering KYC, payments, payouts and org management.",
    bullets: [
      "Delivered the platform end to end with **per-tenant configuration and isolated data**.",
      "Integrated **5 financial and identity providers** into a single onboarding and payments flow.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "PropelAuth", "Elavon", "Airwallex"],
    caseStudy: "payments",
  },
  {
    company: "CAPTN",
    title: "Full Stack Developer Intern",
    period: "Jan 2025 to Feb 2025",
    location: "Hyderabad, India",
    type: "Internship",
    summary: "A WhatsApp native AI assistant for nutrition and protein tracking.",
    bullets: [
      "Built a **WhatsApp AI chatbot** on Node.js, Express.js and MongoDB using Meta WhatsApp JSON Flows.",
      "Designed **15+ interactive menu flows** serving 500+ user interactions.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "WhatsApp Flows"],
  },
  {
    company: "Voola Software Solutions",
    title: "Full Stack Developer Intern",
    period: "Jan 2024 to Dec 2024",
    location: "Remote",
    type: "Internship",
    summary: "Secure web modules and a chit fund management platform.",
    bullets: [
      "Built secure React, Node and Supabase modules with **role based access across 3 roles**.",
      "Shipped a **Chit Fund platform** on FlutterFlow and Firebase for 100+ member accounts.",
    ],
    stack: ["React.js", "Node.js", "Supabase", "FlutterFlow", "Firebase"],
  },
];

/* ------------------------------------------------------------------ */
/* Case studies: the visual centrepiece of the page                    */
/* ------------------------------------------------------------------ */

export type PipelineStage = {
  id: string;
  label: string;
  detail: string;
  tech: string;
};

export type CaseStudy = {
  slug: string;
  name: string;
  org: string;
  period: string;
  accent: "jade" | "sky" | "violet" | "amber";
  kicker: string;
  problem: string;
  approach: string;
  metrics: { value: string; label: string }[];
  stages: PipelineStage[];
  highlights: { title: string; body: string }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "opzig",
    name: "Opzig",
    org: "Xpectrum AI",
    period: "2025 to present",
    accent: "jade",
    kicker: "Healthcare data platform",
    problem:
      "Every clinic exported appointment data in its own shape. Onboarding one meant a developer hand mapping columns, then babysitting the import.",
    approach:
      "A configurable ingestion pipeline where each EHR source is a config row, not a code change, with an LLM enrichment stage that fills the gaps humans used to fill by hand.",
    metrics: [
      { value: "600K+", label: "appointment records" },
      { value: "80%", label: "less manual onboarding" },
      { value: "10+", label: "agentic AI workflows" },
    ],
    stages: [
      {
        id: "ingest",
        label: "Ingest",
        detail: "CSV drops from heterogeneous EHR systems land in object storage",
        tech: "S3",
      },
      {
        id: "map",
        label: "Schema map",
        detail: "Per source column mapping resolved from config, so onboarding a clinic needs no code change",
        tech: "Config",
      },
      {
        id: "validate",
        label: "Validate",
        detail: "Type, format and business rule checks. Bad rows quarantine instead of failing the batch",
        tech: "Pydantic",
      },
      {
        id: "enrich",
        label: "AI enrich",
        detail: "LLMs classify clinic locations and generate department mappings",
        tech: "Lambda",
      },
      {
        id: "upsert",
        label: "Upsert",
        detail: "Transactional upserts keep a re-run idempotent, so retries are safe by construction",
        tech: "PostgreSQL",
      },
      {
        id: "serve",
        label: "Serve",
        detail: "Redis caches the hot read paths behind the appointment APIs",
        tech: "Redis",
      },
    ],
    highlights: [
      {
        title: "Idempotent by design",
        body: "Transactional upserts mean a failed batch can simply be replayed. No dedupe scripts, no manual cleanup.",
      },
      {
        title: "Fault tolerant retries",
        body: "Transient EHR and network failures back off and retry. Permanent failures quarantine with the row and the reason attached.",
      },
      {
        title: "Onboarding as config",
        body: "A new clinic is a mapping record. What used to be a developer task became an operations one.",
      },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "AWS Lambda", "S3", "LLMs"],
  },
  {
    slug: "voice",
    name: "KraftNex Voice Agent",
    org: "KraftNex, freelance",
    period: "2026",
    accent: "sky",
    kicker: "AI support agent on a real phone line",
    problem:
      "KraftNex wanted customer support answered on an Indian phone number without staffing a call desk. A bot that talks over people, pauses awkwardly or invents a price is worse than no bot at all.",
    approach:
      "A full duplex voice pipeline from the phone network to an LLM and back, held on a single codec the whole way, with retrieval grounded strictly on an uploaded knowledge base and an interruption model tuned against real test calls.",
    metrics: [
      { value: "~20ms", label: "barge-in cutoff" },
      { value: "1.4s", label: "per-turn latency removed" },
      { value: "0", label: "audio transcodes end to end" },
    ],
    stages: [
      {
        id: "call",
        label: "Call",
        detail: "A signature verified Plivo webhook answers the Indian support number and returns XML opening a bidirectional audio stream",
        tech: "Plivo",
      },
      {
        id: "listen",
        label: "Listen",
        detail: "Streaming speech to text over WebSocket with interim results, 100ms endpointing and a 1s utterance end signal",
        tech: "Deepgram Nova-2",
      },
      {
        id: "retrieve",
        label: "Retrieve",
        detail: "The question is embedded and cosine matched against cached KB chunks, taking the top 3 above a 0.25 relevance floor",
        tech: "text-embedding-3-small",
      },
      {
        id: "answer",
        label: "Answer",
        detail: "An LLM answers in 1 to 3 spoken sentences, grounded on the retrieved chunks and forbidden from guessing a price or policy",
        tech: "GPT-4o mini",
      },
      {
        id: "speak",
        label: "Speak",
        detail: "Each sentence is synthesized as it is ready and streamed back as 20ms mulaw frames, so the caller hears the answer before it finishes generating",
        tech: "Deepgram Aura",
      },
      {
        id: "account",
        label: "Account",
        detail: "Every call totals its real provider usage into a per call cost in INR, with the exchange rate stored so a past number can be explained",
        tech: "Cost ledger",
      },
    ],
    highlights: [
      {
        title: "Interruptible mid-word",
        body: "Audio goes out in 20ms frames rather than whole sentences, so a barge-in cuts the agent off almost instantly instead of after a multi second sentence already handed to the carrier.",
      },
      {
        title: "Knows what is not an interruption",
        body: "A bare \"mhm\" or \"yeah\" is a listener signal, not a request for the floor. Short fragments arriving exactly as the agent stops talking are treated as line echo rather than a new turn.",
      },
      {
        title: "Silence is handled, not ignored",
        body: "The agent greets first so callers know it is live, then sends a bounded number of spaced check-ins if they go quiet, instead of nagging or going dead.",
      },
      {
        title: "Chunking tuned for retrieval",
        body: "Chunks follow paragraph boundaries at roughly 500 tokens. Packing unrelated topics together measurably diluted the embedding and pushed real questions below the relevance floor.",
      },
      {
        title: "Latency paid once, not per turn",
        body: "Greeting, filler and check-in phrases are synthesized once at startup and reused. A per turn classification call costing 1.4s was replaced with an instant vocabulary check.",
      },
      {
        title: "Refuses to invent an answer",
        body: "Below the relevance floor the agent says it does not have that detail and offers a callback. A wrong price quoted out loud on a support line is a real liability.",
      },
    ],
    stack: ["Node.js", "Plivo", "Deepgram STT/TTS", "GPT-4o mini", "MongoDB", "WebSockets", "mulaw 8kHz"],
  },
  {
    slug: "payments",
    name: "Multi-tenant Payments Platform",
    org: "BrainWaveWorld",
    period: "Apr 2026 to Sep 2026",
    accent: "violet",
    kicker: "Fintech infrastructure",
    problem:
      "Five separate vendors for identity, card processing and payouts, each with its own model, webhooks and failure modes, all needing to feel like one product to the tenant.",
    approach:
      "A single tenant aware core that owns the money lifecycle, with every provider behind an adapter so the platform keeps one internal contract regardless of who moves the funds.",
    metrics: [
      { value: "5", label: "providers integrated" },
      { value: "1", label: "unified money lifecycle" },
      { value: "Per tenant", label: "isolated data & config" },
    ],
    stages: [
      {
        id: "onboard",
        label: "Onboard",
        detail: "Organisation signs up, gets its own configuration namespace and isolated data",
        tech: "Multi-tenant",
      },
      {
        id: "auth",
        label: "Authenticate",
        detail: "OAuth login plus org and user management, roles resolved per tenant",
        tech: "PropelAuth",
      },
      {
        id: "kyc",
        label: "Verify",
        detail: "Identity and document verification gates a tenant before any money moves",
        tech: "Didit",
      },
      {
        id: "collect",
        label: "Collect",
        detail: "Card processing and payment capture against the verified tenant",
        tech: "Elavon",
      },
      {
        id: "payout",
        label: "Pay out",
        detail: "Disbursement routed across two rails depending on corridor and settlement speed",
        tech: "Airwallex + ZumRails",
      },
      {
        id: "reconcile",
        label: "Reconcile",
        detail: "Provider webhooks normalise into one internal ledger event shape",
        tech: "Webhooks",
      },
    ],
    highlights: [
      {
        title: "One contract, five vendors",
        body: "Each provider sits behind an adapter. Swapping a payout rail is an adapter change, not a rewrite of the payments core.",
      },
      {
        title: "Verification gates money",
        body: "KYC state is a precondition on every money movement, so an unverified tenant cannot transact by construction.",
      },
      {
        title: "Tenant isolation",
        body: "Configuration and data are scoped per organisation, so one tenant's provider setup never leaks into another's.",
      },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Didit", "Elavon", "Airwallex", "ZumRails", "PropelAuth"],
  },
  {
    slug: "platform",
    name: "Platform & Infrastructure",
    org: "Xpectrum AI",
    period: "2025 to present",
    accent: "amber",
    kicker: "7 services, one Kubernetes platform",
    problem:
      "A single application repo had grown into the whole product. Everything deployed together, contracts between services lived in nobody's repo, deploys took half an hour, and a production issue meant reading logs service by service with no shared trace.",
    approach:
      "Split it into seven independently deployable services behind one Go gateway, move the contracts into a versioned protobuf repo, describe every environment as Pulumi code, and thread OpenTelemetry through the whole estate so one request tells its entire story.",
    metrics: [
      { value: "40%", label: "infrastructure cost cut" },
      { value: "30 min to 5", label: "deploy time" },
      { value: "50%", label: "faster debugging" },
    ],
    stages: [
      {
        id: "contracts",
        label: "Contracts",
        detail: "14 protobuf service definitions in one versioned repo, generating typed clients with buf so no service invents its own shape",
        tech: "Protobuf + buf",
      },
      {
        id: "services",
        label: "Services",
        detail: "Seven independently deployable repos: Go gateway, Node and Python APIs, a voice agent orchestrator and the observability stack",
        tech: "Go, Node, Python",
      },
      {
        id: "gateway",
        label: "Gateway",
        detail: "A single Go entry point doing bin packing and routing across pods, treating an unreachable pod as full rather than routing into it",
        tech: "Go",
      },
      {
        id: "build",
        label: "Build",
        detail: "Every service builds to a container image, with Trivy scanning each pull request and a scheduled sweep for new CVEs",
        tech: "Docker + Trivy",
      },
      {
        id: "ship",
        label: "Ship",
        detail: "Infrastructure is Pulumi code per service across dev, release and prod, with release branches cut automatically each week",
        tech: "Pulumi + Actions",
      },
      {
        id: "observe",
        label: "Observe",
        detail: "An OpenTelemetry collector fans traces to Tempo, metrics to Prometheus and logs to Loki, all read through Grafana dashboards",
        tech: "OTel + Grafana",
      },
    ],
    highlights: [
      {
        title: "Kubernetes, described in code",
        body: "Every environment is a Pulumi program rather than a console click, so dev, release and prod stay the same shape and a rebuild is reproducible.",
      },
      {
        title: "Contracts live outside the services",
        body: "Fourteen protobuf definitions in a versioned repo mean a breaking change is a release decision that consumers pin to, not a surprise at runtime.",
      },
      {
        title: "Security in the pipeline",
        body: "Trivy runs on every pull request and on a schedule, so a vulnerable dependency is caught at review time rather than found in production.",
      },
      {
        title: "Traces, metrics and logs together",
        body: "Tempo, Prometheus and Loki behind one Grafana instance turned debugging from reading logs per service into following a single request across all of them.",
      },
      {
        title: "Cost as an engineering metric",
        body: "The migration from AWS to DigitalOcean was scoped against a bill, not a preference. 40% off the monthly spend, same workloads running.",
      },
      {
        title: "Releases stopped being events",
        body: "Under five minutes from merge to production, across three environments, means shipping several times a day is unremarkable.",
      },
    ],
    stack: ["Go", "Kubernetes", "Pulumi", "Docker", "gRPC", "Protobuf", "GitHub Actions", "DigitalOcean", "AWS", "OpenTelemetry", "Grafana", "Tempo", "Prometheus", "Loki"],
  },
];

export type Project = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  href?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    name: "PG Management System",
    tag: "Owner & tenant apps",
    blurb:
      "Role based multi-property management with separate owner and tenant mobile apps on one Node.js backend. Occupancy, payment verification, food subscriptions, complaints and announcements, plus analytics dashboards.",
    stack: ["React Native", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
  },
  {
    name: "FYPHire",
    tag: "Job search social platform",
    blurb:
      "LinkedIn style profiles with Twitter style engagement. Real time job feed, one click apply, and a normalized MongoDB schema behind paginated REST APIs with PropelAuth secured recruiter verification.",
    stack: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "PropelAuth"],
    href: "https://github.com/FypHire/gig",
  },
  {
    name: "QuickCrave",
    tag: "Food delivery platform",
    blurb:
      "Full stack ordering with real time tracking, an admin dashboard for menu and orders, Stripe payments, and geolocation based delivery estimates with email and in app notifications.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe"],
    href: "https://github.com/tirumala-karthikeya/Food-Del",
    image: "/images/project7.png",
  },
  {
    name: "Doctor Appointment Booking",
    tag: "Healthcare scheduling",
    blurb:
      "Patient and doctor dashboards for booking across hospitals, modelling many to many doctor and hospital relationships, with secure auth over sensitive healthcare data.",
    stack: ["Django", "MySQL", "JavaScript", "Bootstrap"],
    href: "https://github.com/tirumala-karthikeya/Doctor-Appointment",
    image: "/images/project1.jpg",
  },
];

/** `level` drives the proficiency meter, 0 to 100. */
export const skills = [
  {
    group: "Languages",
    level: 90,
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL", "C", "C++", "HTML5", "CSS3"],
  },
  {
    group: "Frontend",
    level: 92,
    items: ["React.js", "Next.js", "Redux", "React Hooks", "Context API", "React Native", "Tailwind CSS"],
  },
  {
    group: "Backend",
    level: 90,
    items: ["Node.js", "Express.js", "FastAPI", "Django", "Go", "REST APIs", "gRPC & Protobuf", "JWT Auth", "OAuth", "RBAC", "Microservices"],
  },
  {
    group: "Databases",
    level: 88,
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose", "Firebase", "Schema Design", "Indexing", "Aggregations"],
  },
  {
    group: "Cloud & Deployments",
    level: 88,
    items: ["AWS (EC2, S3, Lambda, Fargate, ALB)", "DigitalOcean (Kubernetes, Registry, Spaces)", "Docker", "Kubernetes", "Pulumi", "GitHub Actions", "Nginx", "Vercel", "Cloudflare"],
  },
  {
    group: "Observability & Practices",
    level: 84,
    items: ["OpenTelemetry", "Grafana", "Tempo", "Prometheus", "Loki", "Trivy", "Unit Testing", "Code Review", "Agile/Scrum"],
  },
] as const;

export const education = {
  school: "Indian Institute of Information Technology Kottayam",
  degree: "B.Tech, Computer Science and Engineering",
  period: "2022 to 2025",
  score: "CGPA 8.80 / 10",
} as const;

export const achievements = [
  {
    title: "Letter of Appreciation",
    org: "IIIT Kottayam",
    blurb:
      "For building and maintaining the official site for the BDA 2025 Workshop at the 13th International Conference on Big Data & AI. The committee cited creativity, timely delivery and quality.",
    href: "https://drive.google.com/file/d/1xs37IoF2BxzkTM076_Qoe8xF3CTB4Ot3/view?usp=sharing",
  },
  {
    title: "98.51 percentile nationally",
    org: "Naukri Young Turks",
    blurb:
      "Scored in the 98.51st percentile nationally on problem solving and analytical reasoning.",
    href: "https://drive.google.com/file/d/1ECq9ncYLbou5VDx5jyS9uHxShdCcJKZ-/view?usp=sharing",
  },
  {
    title: "250+ problems solved",
    org: "LeetCode & GFG",
    blurb:
      "Consistent algorithmic practice across data structures, graphs and dynamic programming.",
    href: "https://leetcode.com/u/jtkarthikeya_2004/",
  },
] as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Case studies" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
