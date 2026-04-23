// components/ui/Skills.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Code2, Wrench, Bot } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// FIX 4.2 & 4.5: Skills now grouped into categories with primary/secondary distinction
// ─────────────────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  slug: string;
  color: string;
  darkColor: string;
  isPrimary?: boolean; // FIX 4.5: Primary skills get more visual weight
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    description: "Core technologies I use daily",
    skills: [
      { name: "React", slug: "react", color: "#61DAFB", darkColor: "#61DAFB", isPrimary: true },
      { name: "Next.js", slug: "nextdotjs", color: "#000000", darkColor: "#FFFFFF", isPrimary: true },
      { name: "TypeScript", slug: "typescript", color: "#3178C6", darkColor: "#3178C6", isPrimary: true },
      { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4", darkColor: "#06B6D4", isPrimary: true },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools",
    icon: Wrench,
    description: "Tools that power my workflow",
    skills: [
      { name: "Git", slug: "git", color: "#F05032", darkColor: "#F05032" },
      { name: "GitHub", slug: "github", color: "#181717", darkColor: "#FFFFFF" },
      { name: "VS Code", slug: "visualstudiocode", color: "#007ACC", darkColor: "#007ACC" },
      { name: "Vercel", slug: "vercel", color: "#000000", darkColor: "#FFFFFF" },
    ],
  },
  {
    id: "ai",
    title: "AI-Powered",
    icon: Bot,
    description: "AI tools I leverage for productivity",
    skills: [
      { name: "ChatGPT", slug: "openai", color: "#10A37F", darkColor: "#10A37F" },
      { name: "GitHub Copilot", slug: "githubcopilot", color: "#000000", darkColor: "#FFFFFF" },
      { name: "Cursor", slug: "cursor", color: "#000000", darkColor: "#FFFFFF" },
      { name: "Claude", slug: "anthropic", color: "#D97757", darkColor: "#D97757" },
    ],
  },
];

// All skills flattened for marquee
const allSkills = skillCategories.flatMap((cat) => cat.skills);

function getIconSrc(slug: string, hex: string): string {
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX 4.1 & 4.5: Skill Pill with larger tap targets and visual hierarchy
// ─────────────────────────────────────────────────────────────────────────────

function SkillPill({
  skill,
  index,
  isDark,
}: {
  skill: Skill;
  index: number;
  isDark: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const currentColor = isDark ? skill.darkColor : skill.color;
  const hex = currentColor.replace("#", "");
  const src = getIconSrc(skill.slug, hex);

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      // FIX 4.3: Better viewport threshold — triggers when 20% visible
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.4,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -3 }}
      className={[
        "inline-flex items-center gap-3 rounded-full",
        "border cursor-default select-none",
        "transition-all duration-200",
        // FIX 4.1: Larger padding for better tap targets (min 44px height)
        // FIX 4.5: Primary skills get extra visual weight
        skill.isPrimary
          ? "px-5 py-3 min-h-[48px]" // Primary: larger
          : "px-4 py-2.5 min-h-[44px]", // Secondary: still meets 44px minimum
        isDark
          ? [
              "bg-gray-800/70 border-gray-700",
              "hover:border-yellow-500/50 hover:bg-gray-700/90",
              skill.isPrimary && "ring-1 ring-yellow-500/20",
            ].join(" ")
          : [
              "bg-white border-gray-200",
              "hover:border-yellow-400 hover:bg-yellow-50/50",
              skill.isPrimary && "ring-1 ring-yellow-400/30",
            ].join(" "),
      ].join(" ")}
      style={{
        boxShadow: skill.isPrimary
          ? isDark
            ? "0 2px 8px rgba(234, 179, 8, 0.15)"
            : "0 2px 8px rgba(234, 179, 8, 0.12)"
          : isDark
            ? "0 1px 4px rgba(0,0,0,0.3)"
            : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* FIX 4.6: Larger, more prominent icons */}
      <span
        className={[
          "flex-shrink-0 flex items-center justify-center",
          skill.isPrimary ? "w-6 h-6" : "w-5 h-5",
        ].join(" ")}
      >
        {imgError ? (
          <span
            className="text-xs font-bold"
            style={{ color: currentColor }}
          >
            {skill.name.slice(0, 2)}
          </span>
        ) : (
          <Image
            src={src}
            alt=""
            aria-hidden="true"
            width={skill.isPrimary ? 24 : 20}
            height={skill.isPrimary ? 24 : 20}
            unoptimized
            className="object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </span>

      {/* FIX 4.1: Larger, more readable text */}
      <span
        className={[
          "font-medium leading-none whitespace-nowrap",
          // Primary skills get bolder text
          skill.isPrimary ? "text-base font-semibold" : "text-sm",
          isDark ? "text-gray-100" : "text-gray-800",
        ].join(" ")}
      >
        {skill.name}
      </span>

      {/* FIX 4.5: Visual indicator for primary skills */}
      {skill.isPrimary && (
        <span
          className={[
            "ml-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded",
            isDark
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-yellow-100 text-yellow-700",
          ].join(" ")}
        >
          Core
        </span>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FIX 4.2: Category Card Component
// ─────────────────────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  isDark,
  index,
}: {
  category: SkillCategory;
  isDark: boolean;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = category.icon;

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // FIX 4.3: Proper viewport threshold
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        "relative p-6 sm:p-8 rounded-3xl border",
        "transition-colors duration-300",
        isDark
          ? "bg-gray-900/50 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={[
            "w-10 h-10 rounded-xl flex items-center justify-center",
            isDark ? "bg-yellow-500/15" : "bg-yellow-100",
          ].join(" ")}
        >
          <Icon
            className={[
              "w-5 h-5",
              isDark ? "text-yellow-400" : "text-yellow-600",
            ].join(" ")}
          />
        </div>
        <div>
          <h3
            className={[
              "font-bold text-lg",
              isDark ? "text-white" : "text-gray-900",
            ].join(" ")}
          >
            {category.title}
          </h3>
          <p
            className={[
              "text-xs",
              isDark ? "text-gray-500" : "text-gray-500",
            ].join(" ")}
          >
            {category.description}
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, skillIndex) => (
          <SkillPill
            key={skill.slug}
            skill={skill}
            index={skillIndex}
            isDark={isDark}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Marquee Row (kept but with accessibility improvements)
// ─────────────────────────────────────────────────────────────────────────────

function MarqueeRow({
  reverse,
  isDark,
}: {
  reverse: boolean;
  isDark: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const items = [...allSkills, ...allSkills];

  // FIX: If user prefers reduced motion, show static row instead
  if (prefersReducedMotion) {
    return (
      <div className="flex gap-3 py-2 overflow-hidden justify-center flex-wrap">
        {allSkills.slice(0, 6).map((logo) => {
          const currentColor = isDark ? logo.darkColor : logo.color;
          const hex = currentColor.replace("#", "");
          const src = getIconSrc(logo.slug, hex);
          return (
            <div
              key={logo.slug}
              className={[
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border",
                isDark
                  ? "bg-gray-800/60 border-gray-700"
                  : "bg-white border-gray-200",
              ].join(" ")}
            >
              <Image
                src={src}
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
                unoptimized
                className="w-[18px] h-[18px] object-contain opacity-80"
              />
              <span
                className={[
                  "text-sm font-medium whitespace-nowrap",
                  isDark ? "text-gray-400" : "text-gray-500",
                ].join(" ")}
              >
                {logo.name}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden py-2"
      // Accessibility: hide decorative marquee from screen readers
      aria-hidden="true"
    >
      <div
        className={[
          "flex gap-3 w-max",
          reverse ? "skills-marquee-reverse" : "skills-marquee",
        ].join(" ")}
      >
        {items.map((logo, i) => {
          const currentColor = isDark ? logo.darkColor : logo.color;
          const hex = currentColor.replace("#", "");
          const src = getIconSrc(logo.slug, hex);
          return (
            <div
              key={`${reverse ? "r" : "f"}-${logo.slug}-${i}`}
              className={[
                // FIX 4.1: Slightly larger marquee pills too
                "inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border shrink-0",
                "min-h-[40px]", // Ensures decent size
                isDark
                  ? "bg-gray-800/60 border-gray-700"
                  : "bg-white border-gray-200",
              ].join(" ")}
              style={{
                boxShadow: isDark
                  ? "0 1px 3px rgba(0,0,0,0.3)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Image
                src={src}
                alt=""
                width={18}
                height={18}
                unoptimized
                className="w-[18px] h-[18px] object-contain opacity-70"
              />
              <span
                className={[
                  "text-sm font-medium whitespace-nowrap",
                  isDark ? "text-gray-400" : "text-gray-500",
                ].join(" ")}
              >
                {logo.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Skills Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Skills() {
  const [isDark, setIsDark] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="relative py-20 md:py-28 overflow-hidden bg-background"
      aria-labelledby="skills-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className={[
            "absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl",
            "-translate-y-1/4 translate-x-1/4",
            isDark ? "bg-yellow-500/[0.06]" : "bg-yellow-400/[0.07]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl",
            "translate-y-1/3 -translate-x-1/4",
            isDark ? "bg-amber-500/[0.05]" : "bg-amber-300/[0.08]",
          ].join(" ")}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">

        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <div
            className={[
              "inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6",
              isDark
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-yellow-50 border-yellow-200",
            ].join(" ")}
          >
            <Sparkles
              className={[
                "w-4 h-4",
                isDark ? "text-yellow-400" : "text-yellow-600",
              ].join(" ")}
            />
            <span
              className={[
                "font-semibold text-xs uppercase tracking-widest",
                isDark ? "text-yellow-400" : "text-yellow-700",
              ].join(" ")}
            >
              My Toolkit
            </span>
          </div>

          {/* Heading - FIX 4.5: Strong visual hierarchy */}
          <h2
            id="skills-heading"
            className={[
              "text-4xl sm:text-5xl font-bold tracking-tight mb-4",
              isDark ? "text-white" : "text-gray-900",
            ].join(" ")}
          >
            Skills &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
              Technologies
            </span>
          </h2>

          <p
            className={[
              "max-w-lg mx-auto text-base leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-600",
            ].join(" ")}
          >
            Technologies I use to build fast, accessible, and delightful web experiences.
          </p>
        </motion.header>

        {/* FIX 4.2: Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isDark={isDark}
              index={index}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          className={[
            "w-full h-px mb-8",
            isDark ? "bg-gray-800" : "bg-gray-200",
          ].join(" ")}
          aria-hidden="true"
        />

        {/* Marquee section - decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to right, hsl(var(--background)), transparent)"
                : "linear-gradient(to right, hsl(var(--background)), transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to left, hsl(var(--background)), transparent)"
                : "linear-gradient(to left, hsl(var(--background)), transparent)",
            }}
            aria-hidden="true"
          />

          <MarqueeRow reverse={false} isDark={isDark} />
          <MarqueeRow reverse={true} isDark={isDark} />
        </motion.div>
      </div>

      {/* Marquee CSS - only if user allows motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (prefers-reduced-motion: no-preference) {
              @keyframes skills-marquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @keyframes skills-marquee-reverse {
                0%   { transform: translateX(-50%); }
                100% { transform: translateX(0); }
              }
              .skills-marquee {
                animation: skills-marquee 40s linear infinite;
              }
              .skills-marquee:hover { 
                animation-play-state: paused; 
              }
              .skills-marquee-reverse {
                animation: skills-marquee-reverse 38s linear infinite;
              }
              .skills-marquee-reverse:hover { 
                animation-play-state: paused; 
              }
            }
            @media (prefers-reduced-motion: reduce) {
              .skills-marquee,
              .skills-marquee-reverse {
                animation: none !important;
              }
            }
          `,
        }}
      />
    </section>
  );
}