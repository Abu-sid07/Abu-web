// components/projects-section.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  images: string[];
  link: string;
  github: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "Pump Management & AI-Based Recommendation Dashboard",
    description:
      "Interactive dashboard for pump inventory management with AI-driven recommendation workflows and chat UI.",
    tags: ["Next.js", "React", "Tailwind CSS", "AI"],
    category: "Dashboard",
    images: [
      "/pump1/pump%201.png",
      "/pump1/pump2.png",
      "/pump1/pump%203.png",
      "/pump1/pump%204.png",
      "/pump1/pump%205.png",
    ],
    link: "#",
    github: "#",
  },
  {
    id: "02",
    title: "Vishwa Sangam — Astrology & Matchmaking App",
    description:
      "Horoscope matching and compatibility analysis platform with optimized components and clean UI.",
    tags: ["React", "TypeScript", "Vercel"],
    category: "Web App",
    images: ["/asto img.png"],
    link: "https://vishwasangam.vercel.app/",
    github: "#",
  },
  {
    id: "03",
    title: "Aero — AI Chatbot Landing Page",
    description:
      "Visually appealing and responsive landing page for an AI chatbot platform focused on UX.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    category: "Landing Page",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    ],
    link: "#",
    github: "#",
  },
];

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M2 5.5H9M9 5.5L6 2.5M9 5.5L6 8.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="text-center"
    >
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        <span className="text-black dark:text-white">Featured </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
          Projects
        </span>
      </h2>

      <p className="max-w-2xl mx-auto text-base leading-relaxed text-black/60 dark:text-white/50">
        A selection of production-grade web applications I&apos;ve built.
      </p>
    </motion.div>
  );
}

function CyclingImage({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black/[0.03] dark:bg-white/[0.03]">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent dark:from-black" />

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className="block h-[3px] rounded-full transition-all duration-300"
              style={{
                width: i === index ? 16 : 6,
                background:
                  i === index ? "#eab308" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className="
        snap-start shrink-0
        w-[86vw] sm:w-[420px] lg:w-[460px]
        overflow-hidden rounded-2xl
        border border-black/10 bg-white
        dark:border-white/10 dark:bg-black
        transition-all duration-300
      "
    >
      <div className="relative h-[220px] sm:h-[250px] overflow-hidden">
        <CyclingImage images={project.images} alt={project.title} />
      </div>

      <div className="flex min-h-[270px] flex-col p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/30">
            {project.id} / {String(projects.length).padStart(2, "0")}
          </span>

          <span
            className="
              rounded-full px-2.5 py-1 text-[10px] font-medium
              border border-yellow-500/25 bg-yellow-500/10 text-yellow-700
              dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-400
            "
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-[18px] font-medium leading-snug text-black dark:text-white">
          {project.title}
        </h3>

        <p className="mt-3 text-[13px] leading-7 text-black/55 dark:text-white/50">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full px-2.5 py-1 text-[10px] font-medium
                border border-black/10 bg-black/[0.04] text-black/60
                dark:border-white/10 dark:bg-white/[0.06] dark:text-white/60
              "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-5 flex-wrap">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-lg px-4 py-2
              text-[12px] font-medium text-black
              bg-gradient-to-r from-yellow-400 to-amber-500
              transition-all duration-200
              hover:brightness-105
              active:scale-[0.97]
            "
          >
            View Project
            <ArrowIcon />
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 rounded-lg px-4 py-2
              text-[12px] font-medium
              border border-black/15 text-black/60
              dark:border-white/15 dark:text-white/50
              transition-all duration-200
              hover:bg-black/[0.04] dark:hover:bg-white/[0.06]
              active:scale-[0.97]
            "
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function EndCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="
        snap-start shrink-0
        flex w-[86vw] sm:w-[280px] items-center justify-center
        rounded-2xl border border-dashed p-8 text-center
        border-black/10 bg-black/[0.02]
        dark:border-white/10 dark:bg-white/[0.02]
      "
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="
            flex h-12 w-12 items-center justify-center rounded-full
            border border-yellow-500/25 bg-yellow-500/10
          "
        >
          <span className="text-lg text-yellow-500">✦</span>
        </div>

        <div>
          <p className="text-sm font-medium text-black dark:text-white">
            You&apos;ve seen all projects
          </p>
          <p className="mt-1 text-xs text-black/40 dark:text-white/40">
            More work coming soon
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-black/25 dark:text-white/25"
          >
            <path
              d="M8 3V13M8 13L3.5 8.5M8 13L12.5 8.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 md:py-24 bg-white dark:bg-black"
    >
      {/* Dot grid background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.04] dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 flex justify-center">
          <ProjectsHeader />
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max snap-x snap-mandatory gap-6 pb-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            <EndCard />
          </div>
          <ScrollBar
            orientation="horizontal"
            className="
              h-[6px]
              [&>div]:bg-yellow-500/40
              [&>div]:hover:bg-yellow-500/60
              [&>div]:rounded-full
            "
          />
        </ScrollArea>
      </div>
    </section>
  );
}