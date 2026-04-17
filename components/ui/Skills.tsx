"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ── Master skill list with brand colors ──────────────────────────────
const allSkills = [
  { name: "React", slug: "react", color: "#61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "#000000" },
  { name: "TypeScript", slug: "typescript", color: "#3178C6" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "#06B6D4" },
  { name: "HTML5", slug: "html5", color: "#E34F26" },
  { name: "CSS3", slug: "css3", color: "#1572B6" },
  { name: "Git", slug: "git", color: "#F05032" },
  { name: "GitHub", slug: "github", color: "#181717" },
  { name: "VS Code", slug: "visualstudiocode", color: "#007ACC" },
  { name: "Vercel", slug: "vercel", color: "#000000" },
  { name: "ChatGPT", slug: "openai", color: "#412991" },
  { name: "GitHub Copilot", slug: "githubcopilot", color: "#000000" },
  { name: "Cursor", slug: "cursor", color: "#000000" },
  { name: "Claude", slug: "anthropic", color: "#D97757" },
];

// ── Marquee rows derived from master list ────────────────────────────
const marqueeRow1 = allSkills.slice(0, 11);
const marqueeRow2 = [...allSkills.slice(11), ...allSkills.slice(0, 7)];

// ── Skill Card with dedicated icon area & brand-color hover glow ─────
function SkillCard({
  skill,
  index,
}: {
  skill: (typeof allSkills)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hex = skill.color.replace("#", "");
  const isVeryDark = parseInt(hex, 16) < 0x333333;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center gap-2
        p-3 sm:p-5 md:p-6 rounded-2xl bg-white border border-gray-100 cursor-default
        hover:-translate-y-1.5 transition-all duration-300"
      style={{
        boxShadow: isHovered
          ? isVeryDark
            ? "0 14px 44px rgba(0,0,0,0.13)"
            : `0 14px 44px ${skill.color}22`
          : "0 1px 4px rgba(0,0,0,0.04)",
        borderColor: isHovered
          ? isVeryDark
            ? "rgba(0,0,0,0.15)"
            : `${skill.color}40`
          : undefined,
      }}
    >
      {/* ── Dedicated Skill Icon Area ── */}
      <div
        className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl
          transition-all duration-300"
        style={{
          backgroundColor: isHovered
            ? isVeryDark
              ? "rgba(0,0,0,0.05)"
              : `${skill.color}0D`
            : "rgba(0,0,0,0.02)",
          border: `1px solid ${isHovered
              ? isVeryDark
                ? "rgba(0,0,0,0.08)"
                : `${skill.color}20`
              : "rgba(0,0,0,0.04)"
            }`,
        }}
      >
        <Image
          src={`https://cdn.simpleicons.org/${skill.slug}/${hex}`}
          alt={skill.name}
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:scale-110"
          width={24}
          height={24}
          unoptimized
        />
      </div>
      <span className="text-[11px] sm:text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors duration-300 text-center leading-tight">
        {skill.name}
      </span>
    </motion.div>
  );
}

// ── Main Skills Section ──────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 bg-white overflow-hidden selection:bg-yellow-500/30"
    >
      {/* Background Effects – matching other light sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-yellow-400/[0.04] rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-700 font-semibold text-xs uppercase tracking-widest">
              My Toolkit
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
            Skills &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Technologies
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </h2>

          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            The specialized tools and frameworks I use to bring outstanding
            ideas to life — from core web technologies to cutting-edge AI
            integrations.
          </p>
        </motion.div>

        {/* ── Skill Icon Grid (Filtered for main tech) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-1 mb-4 max-w-4xl mx-auto justify-center">
          {allSkills
            .filter((skill) =>
              [
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Vercel",
                "Git",
                "GitHub",
                "GitHub Copilot",
                "Cursor",
                "Claude"
              ].includes(skill.name)
            )
            .map((skill, i) => (
              <SkillCard key={skill.slug} skill={skill} index={i} />
            ))}
        </div>

        {/* ── Dual Marquee Logo Strips ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative pt-10 border-t border-gray-200"
        >
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Row 1 – scrolls left */}
          <div className="overflow-hidden py-3">
            <div className="flex animate-marquee gap-12 w-max">
              {[...marqueeRow1, ...marqueeRow1, ...marqueeRow1].map(
                (logo, i) => (
                  <div
                    key={`r1-${logo.slug}-${i}`}
                    className="flex items-center gap-3 shrink-0 group/logo cursor-default"
                  >
                    <Image
                      src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color.replace("#", "")}`}
                      alt={logo.name}
                      className="w-6 h-6 grayscale opacity-40
                        group-hover/logo:grayscale-0 group-hover/logo:opacity-100
                        group-hover/logo:scale-110 transition-all duration-300"
                      width={24}
                      height={24}
                      unoptimized
                    />
                    <span className="text-sm font-medium text-gray-400 group-hover/logo:text-gray-800 transition-colors duration-300 whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Row 2 – scrolls right (reverse) */}
          <div className="overflow-hidden py-3">
            <div className="flex animate-marquee-reverse gap-12 w-max">
              {[...marqueeRow2, ...marqueeRow2, ...marqueeRow2].map(
                (logo, i) => (
                  <div
                    key={`r2-${logo.slug}-${i}`}
                    className="flex items-center gap-3 shrink-0 group/logo cursor-default"
                  >
                    <Image
                      src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color.replace("#", "")}`}
                      alt={logo.name}
                      className="w-6 h-6 grayscale opacity-40
                        group-hover/logo:grayscale-0 group-hover/logo:opacity-100
                        group-hover/logo:scale-110 transition-all duration-300"
                      width={24}
                      height={24}
                      unoptimized
                    />
                    <span className="text-sm font-medium text-gray-400 group-hover/logo:text-gray-800 transition-colors duration-300 whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 28s linear infinite;
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
