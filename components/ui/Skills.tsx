"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const allSkills = [
  { name: "React",          slug: "react",             color: "#61DAFB", darkColor: "#61DAFB" },
  { name: "Next.js",        slug: "nextdotjs",         color: "#000000", darkColor: "#FFFFFF" },
  { name: "TypeScript",     slug: "typescript",        color: "#3178C6", darkColor: "#3178C6" },
  { name: "Tailwind CSS",   slug: "tailwindcss",       color: "#06B6D4", darkColor: "#06B6D4" },
  { name: "Git",            slug: "git",               color: "#F05032", darkColor: "#F05032" },
  { name: "GitHub",         slug: "github",            color: "#181717", darkColor: "#FFFFFF" },
  { name: "VS Code",        slug: "visualstudiocode",  color: "#007ACC", darkColor: "#007ACC" },
  { name: "Vercel",         slug: "vercel",            color: "#000000", darkColor: "#FFFFFF" },
  { name: "ChatGPT",        slug: "openai",            color: "#10A37F", darkColor: "#10A37F" },
  { name: "GitHub Copilot", slug: "githubcopilot",     color: "#000000", darkColor: "#FFFFFF" },
  { name: "Cursor",         slug: "cursor",            color: "#000000", darkColor: "#FFFFFF" },
  { name: "Claude",         slug: "anthropic",         color: "#D97757", darkColor: "#D97757" },
];

function getIconSrc(slug: string, hex: string): string {
  return `https://cdn.simpleicons.org/${slug}/${hex}`;
}

function SkillPill({
  skill,
  index,
  isDark,
}: {
  skill: (typeof allSkills)[0];
  index: number;
  isDark: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const currentColor = isDark ? skill.darkColor : skill.color;
  const hex = currentColor.replace("#", "");
  const src = getIconSrc(skill.slug, hex);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, y: -2 }}
      className={[
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "border cursor-default select-none",
        "transition-colors duration-200",
        isDark
          ? "bg-gray-800/60 border-gray-700 hover:border-gray-500 hover:bg-gray-700/80"
          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50",
      ].join(" ")}
      style={{
        boxShadow: isDark
          ? "0 1px 3px rgba(0,0,0,0.3)"
          : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
        {imgError ? (
          <span className="text-[10px] font-bold" style={{ color: currentColor }}>
            {skill.name.slice(0, 2)}
          </span>
        ) : (
          <Image
            src={src}
            alt={skill.name}
            width={20}
            height={20}
            unoptimized
            className="w-5 h-5 object-contain"
            onError={() => setImgError(true)}
          />
        )}
      </span>
      <span
        className={[
          "text-sm font-medium leading-none whitespace-nowrap",
          isDark ? "text-gray-200" : "text-gray-700",
        ].join(" ")}
      >
        {skill.name}
      </span>
    </motion.div>
  );
}

function MarqueeRow({ reverse, isDark }: { reverse: boolean; isDark: boolean }) {
  const items = [...allSkills, ...allSkills];

  return (
    <div className="overflow-hidden py-2">
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
                "inline-flex items-center gap-2 px-4 py-2 rounded-full border shrink-0",
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
                alt={logo.name}
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

export default function Skills() {
  const [isDark, setIsDark] = useState(false);

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
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden transition-colors duration-300"
      // ── CHANGED: dark mode now uses the same --background token as hero & about
      // light mode keeps the original bg-gray-50/60 look
      style={
        isDark
          ? { background: "hsl(var(--background))" }
          : { background: "rgba(249,250,251,0.6)" }
      }
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={[
            "absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/4 translate-x-1/4",
            isDark ? "bg-yellow-500/[0.06]" : "bg-yellow-400/[0.07]",
          ].join(" ")}
        />
        <div
          className={[
            "absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4",
            isDark ? "bg-amber-500/[0.05]" : "bg-amber-300/[0.08]",
          ].join(" ")}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 max-w-5xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-6 shadow-sm",
              isDark
                ? "bg-yellow-500/10 border-yellow-500/30"
                : "bg-yellow-50 border-yellow-200",
            ].join(" ")}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span
              className={[
                "font-semibold text-xs uppercase tracking-widest",
                isDark ? "text-yellow-400" : "text-yellow-700",
              ].join(" ")}
            >
              My Toolkit
            </span>
          </motion.div>

          <h2
            className={[
              "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4",
              isDark ? "text-white" : "text-gray-900",
            ].join(" ")}
          >
            Skills &amp;{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Technologies
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </h2>

          <p
            className={[
              "mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed",
              isDark ? "text-gray-400" : "text-gray-500",
            ].join(" ")}
          >
            Tools and frameworks I use to build modern, responsive web experiences.
          </p>
        </motion.div>

        {/* Pill grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16"
        >
          {allSkills.map((skill, i) => (
            <SkillPill key={skill.slug} skill={skill} index={i} isDark={isDark} />
          ))}
        </motion.div>

        {/* Marquee strips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={[
            "relative pt-8 border-t",
            isDark ? "border-gray-800" : "border-gray-200",
          ].join(" ")}
        >
          {/* Edge fades — match the section background exactly */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to right, hsl(var(--background)), transparent)"
                : "linear-gradient(to right, rgba(249,250,251,0.6), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
            style={{
              background: isDark
                ? "linear-gradient(to left, hsl(var(--background)), transparent)"
                : "linear-gradient(to left, rgba(249,250,251,0.6), transparent)",
            }}
          />

          <MarqueeRow reverse={false} isDark={isDark} />
          <MarqueeRow reverse={true}  isDark={isDark} />
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes skills-marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes skills-marquee-reverse {
              0%   { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .skills-marquee {
              animation: skills-marquee 38s linear infinite;
            }
            .skills-marquee:hover { animation-play-state: paused; }
            .skills-marquee-reverse {
              animation: skills-marquee-reverse 36s linear infinite;
            }
            .skills-marquee-reverse:hover { animation-play-state: paused; }
          `,
        }}
      />
    </section>
  );
}