// components/ui/Skills.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Code2, Wrench, Bot } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  slug: string;
  color: string;
  darkColor: string;
  isPrimary?: boolean;
  svgContent?: string;  // inline SVG string — zero network cost
  customIcon?: string;  // path from /public e.g. "/icons/shadcn.png"
}

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  skills: Skill[];
}

// ─── Inline SVG Strings ───────────────────────────────────────────────────────

const MUI_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#1FA6CA" d="M.2 68.6V13.4L48 41v18.4L16.1 41v36.8L.2 68.6z"/><path fill="#1C7FB6" d="M48 41l47.9-27.6v55.3L64 87l-16-9.2 32-18.4V41L48 59.4V41z"/><path fill="#1FA6CA" d="M48 77.8v18.4l32 18.4V96.2L48 77.8z"/><path fill="#1C7FB6" d="M80 114.6L127.8 87V50.2l-16 9.2v18.4L80 96.2v18.4zM111.9 41V22.6l16-9.2v18.4l-16 9.2z"/></svg>`;

const VSCODE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><mask id="vsc-a" width="128" height="128" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#fff" fill-rule="evenodd" d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z" clip-rule="evenodd"/></mask><g mask="url(#vsc-a)"><path fill="#0065A9" d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z"/><path fill="#007ACC" d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z"/><path fill="#1F9CF0" d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z"/></g></svg>`;

// ─── Skill Categories ─────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    description: "Core technologies I use daily",
    skills: [
      {
        name: "React",
        slug: "react",
        color: "#61DAFB",
        darkColor: "#61DAFB",
        isPrimary: true,
      },
      {
        name: "Next.js",
        slug: "nextdotjs",
        color: "#000000",
        darkColor: "#FFFFFF",
        isPrimary: true,
      },
      {
        name: "TypeScript",
        slug: "typescript",
        color: "#3178C6",
        darkColor: "#3178C6",
        isPrimary: true,
      },
      {
        name: "Tailwind CSS",
        slug: "tailwindcss",
        color: "#06B6D4",
        darkColor: "#06B6D4",
        isPrimary: true,
      },
      // ── UI Libraries ──
      {
        name: "Material UI",
        slug: "mui",
        color: "#007FFF",
        darkColor: "#007FFF",
        svgContent: MUI_SVG,
      },
      {
        name: "Shadcn Ui",
        slug: "shadcnui",
        color: "#000000",
        darkColor: "#FFFFFF",
        customIcon: "/icons/shadcn.png",
      },
    ],
  },
  {
    id: "tools",
    title: "Dev Tools",
    icon: Wrench,
    description: "Tools that power my workflow",
    skills: [
      {
        name: "Git",
        slug: "git",
        color: "#F05032",
        darkColor: "#F05032",
      },
      {
        name: "GitHub",
        slug: "github",
        color: "#181717",
        darkColor: "#FFFFFF",
      },
      {
        name: "VS Code",
        slug: "visualstudiocode",
        color: "#007ACC",
        darkColor: "#007ACC",
        svgContent: VSCODE_SVG,
      },
      {
        name: "Vercel",
        slug: "vercel",
        color: "#000000",
        darkColor: "#FFFFFF",
      },
    ],
  },
  {
    id: "ai",
    title: "AI-Powered",
    icon: Bot,
    description: "AI tools I leverage for productivity",
    skills: [
      {
        name: "GitHub Copilot",
        slug: "githubcopilot",
        color: "#000000",
        darkColor: "#FFFFFF",
      },
      {
        name: "Cursor",
        slug: "cursor",
        color: "#000000",
        darkColor: "#FFFFFF",
      },
      {
        name: "Claude Code",
        slug: "anthropic",
        color: "#CC785C",
        darkColor: "#CC785C",
      },
      {
        name: "v0 by Vercel",
        slug: "vercel",
        color: "#000000",
        darkColor: "#FFFFFF",
      },
      {
        name: "Gemini Code Assist",
        slug: "googlegemini",
        color: "#8E75B2",
        darkColor: "#8E75B2",
      },
    ],
  },
];

// ─── Flatten for marquee ──────────────────────────────────────────────────────

const allSkills = skillCategories.flatMap((cat) => cat.skills);

function getIconSrc(slug: string, hex: string): string {
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

// ─── SkillIcon — handles all 4 icon sources ───────────────────────────────────

function SkillIcon({
  skill,
  size,
  isDark,
}: {
  skill: Skill;
  size: number;
  isDark: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const currentColor = isDark ? skill.darkColor : skill.color;
  const hex = currentColor.replace("#", "");

  // 1. Inline SVG string — highest priority, zero network cost
  if (skill.svgContent) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size, display: "flex", flexShrink: 0 }}
        dangerouslySetInnerHTML={{ __html: skill.svgContent }}
      />
    );
  }

  // 2. Custom local image from /public
  if (skill.customIcon) {
    const needsInvert = skill.slug === "shadcnui" && isDark;
    return (
      <Image
        src={skill.customIcon}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        unoptimized
        className="object-contain flex-shrink-0"
        style={needsInvert ? { filter: "invert(1)" } : undefined}
      />
    );
  }

  // 3. SimpleIcons CDN
  if (!imgError) {
    return (
      <Image
        src={getIconSrc(skill.slug, hex)}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        unoptimized
        className="object-contain flex-shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }

  // 4. Text initials fallback
  return (
    <span className="text-xs font-bold flex-shrink-0" style={{ color: currentColor }}>
      {skill.name.slice(0, 2)}
    </span>
  );
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────

function SkillPill({
  skill,
  index,
  isDark,
}: {
  skill: Skill;
  index: number;
  isDark: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
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
        skill.isPrimary
          ? "px-5 py-3 min-h-[48px]"
          : "px-4 py-2.5 min-h-[44px]",
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
      {/* Icon */}
      <span
        className={[
          "flex-shrink-0 flex items-center justify-center",
          skill.isPrimary ? "w-6 h-6" : "w-5 h-5",
        ].join(" ")}
      >
        <SkillIcon skill={skill} size={skill.isPrimary ? 24 : 20} isDark={isDark} />
      </span>

      {/* Label */}
      <span
        className={[
          "font-medium leading-none whitespace-nowrap",
          skill.isPrimary ? "text-base font-semibold" : "text-sm",
          isDark ? "text-gray-100" : "text-gray-800",
        ].join(" ")}
      >
        {skill.name}
      </span>

      {/* Core badge — primary skills only */}
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

// ─── Category Card ────────────────────────────────────────────────────────────

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

  const primarySkills = category.skills.filter((s) => s.isPrimary);
  const secondarySkills = category.skills.filter((s) => !s.isPrimary);

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        // ✅ h-full — card stretches to fill the grid cell so all cards are the same height
        "relative p-6 sm:p-8 rounded-3xl border h-full",
        "transition-colors duration-300",
        isDark
          ? "bg-gray-900/50 border-gray-800 hover:border-gray-700"
          : "bg-white border-gray-200 hover:border-gray-300",
      ].join(" ")}
    >
      {/* Card Header */}
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
          <p className="text-xs text-gray-500">{category.description}</p>
        </div>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-3">
        {primarySkills.length > 0 ? (
          <>
            {/* Primary pills — wrap freely */}
            {primarySkills.map((skill, skillIndex) => (
              <SkillPill
                key={`${skill.slug}-${skill.name}`}
                skill={skill}
                index={skillIndex}
                isDark={isDark}
              />
            ))}

            {/* ✅ Secondary pills (e.g. MUI + Shadcn in Frontend card only) —
                nowrap so they always stay on the same line together */}
            {secondarySkills.length > 0 && (
              <div className="flex gap-3 flex-nowrap">
                {secondarySkills.map((skill, skillIndex) => (
                  <SkillPill
                    key={`${skill.slug}-${skill.name}`}
                    skill={skill}
                    index={primarySkills.length + skillIndex}
                    isDark={isDark}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* No primary skills (Dev Tools, AI-Powered) — all pills wrap normally as before */
          category.skills.map((skill, skillIndex) => (
            <SkillPill
              key={`${skill.slug}-${skill.name}`}
              skill={skill}
              index={skillIndex}
              isDark={isDark}
            />
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── Marquee Row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  reverse,
  isDark,
}: {
  reverse: boolean;
  isDark: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const items = [...allSkills, ...allSkills];

  const MarqueePill = ({ logo, id }: { logo: Skill; id: string }) => (
    <div
      key={id}
      className={[
        "inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border shrink-0 min-h-[40px]",
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
      <span className="flex items-center justify-center w-[18px] h-[18px] flex-shrink-0 opacity-70">
        <SkillIcon skill={logo} size={18} isDark={isDark} />
      </span>
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

  // Reduced-motion: static row
  if (prefersReducedMotion) {
    return (
      <div className="flex gap-3 py-2 overflow-hidden justify-center flex-wrap">
        {allSkills.slice(0, 6).map((logo) => (
          <MarqueePill key={logo.slug} logo={logo} id={logo.slug} />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden py-2" aria-hidden="true">
      <div
        className={[
          "flex gap-3 w-max",
          reverse ? "skills-marquee-reverse" : "skills-marquee",
        ].join(" ")}
      >
        {items.map((logo, i) => (
          <MarqueePill
            key={`${reverse ? "r" : "f"}-${logo.slug}-${i}`}
            logo={logo}
            id={`${reverse ? "r" : "f"}-${logo.slug}-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

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
      className="relative py-[80px] md:py-[40px] overflow-hidden bg-background"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">

        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          className="text-center mb-14"
        >
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
            Technologies I use to build fast, accessible, and delightful web
            experiences.
          </p>
        </motion.header>

        {/* ✅ items-stretch ensures all cards in each row match the tallest card's height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 items-stretch">
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

        {/* Marquee — decorative */}
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
              background:
                "linear-gradient(to right, hsl(var(--background)), transparent)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, hsl(var(--background)), transparent)",
            }}
            aria-hidden="true"
          />
          <MarqueeRow reverse={false} isDark={isDark} />
          <MarqueeRow reverse={true} isDark={isDark} />
        </motion.div>
      </div>

      {/* Marquee animation CSS */}
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