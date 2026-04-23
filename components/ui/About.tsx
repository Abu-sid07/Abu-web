// components/ui/About.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { MapPin, Calendar, Code2, Sparkles, ArrowRight } from "lucide-react";

// ── AnimatedTiles with Reduced Motion Support ─────────────────────────────
interface AnimatedTilesProps {
  rows?: number;
  cols?: number;
  tileSize?: number;
  imageUrl?: string;
  backgroundColor?: string;
}

export function AnimatedTiles({
  rows = 12,
  cols = 8,
  tileSize = 50,
  imageUrl = "/about-img.png",
  backgroundColor = "transparent",
}: AnimatedTilesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tilesRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // FIX 3.3: When user prefers reduced motion, we skip the heavy tile animation
  // and show a clean, single static image with proper alt text instead.
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
        <img
          src={imageUrl}
          alt="Abu Siddique - Frontend Developer portrait"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-2xl" />
      </div>
    );
  }

  // Original animated tiles (kept for users who enjoy the effect)
  const maxOpacities = useMemo(
    () => [
      [0.0, 0.3, 0.5, 0.7, 0.7, 0.5, 0.3, 0.0],
      [0.3, 0.5, 0.9, 1.0, 1.0, 0.7, 0.5, 0.3],
      [0.3, 0.5, 1.0, 1.0, 1.0, 0.9, 0.7, 0.3],
      [0.3, 0.7, 1.0, 1.0, 1.0, 1.0, 0.7, 0.3],
      [0.3, 0.7, 1.0, 1.0, 1.0, 1.0, 0.7, 0.3],
      [0.3, 0.7, 1.0, 1.0, 1.0, 1.0, 0.7, 0.3],
      [0.3, 0.5, 0.9, 1.0, 1.0, 0.9, 0.7, 0.3],
      [0.3, 0.5, 0.7, 0.9, 0.9, 0.7, 0.5, 0.2],
      [0.2, 0.3, 0.5, 0.5, 0.5, 0.5, 0.3, 0.2],
      [0.0, 0.3, 0.3, 0.3, 0.3, 0.3, 0.2, 0.2],
      [0.0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    ],
    []
  );

  useEffect(() => {
    if (!tilesRef.current) return;

    const tiles: HTMLDivElement[] = [];
    tilesRef.current.innerHTML = "";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`;
        tile.style.backgroundSize = `${cols * tileSize}px ${rows * tileSize}px`;
        tile.style.float = "left";
        tile.style.border = "none";
        tile.style.boxSizing = "border-box";
        tile.style.backgroundRepeat = "no-repeat";
        tile.style.opacity = "0";
        tiles.push(tile);
        tilesRef.current!.appendChild(tile);
      }
    }

    const animationFrames: number[] = [];
    const startTimes: number[] = [];

    tiles.forEach((tile, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const variance = 0.4;
      const maxOpacity = maxOpacities[row]?.[col] ?? 0;
      const minOpacity = Math.max(0, maxOpacity - variance);
      const duration = Math.random() * 0.25 + 0.75;

      if (maxOpacity === 0) {
        tile.style.opacity = "0";
        return;
      }

      startTimes[i] = Math.random() * duration;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const elapsed = (currentTime - startTime) / 1000;
        const progress = (elapsed + startTimes[i]) % (duration * 2);
        const normalizedProgress =
          progress < duration
            ? progress / duration
            : (duration * 2 - progress) / duration;

        const opacity =
          minOpacity + (maxOpacity - minOpacity) * normalizedProgress;
        tile.style.opacity = Math.max(
          minOpacity,
          Math.min(maxOpacity, opacity)
        ).toString();

        animationFrames[i] = requestAnimationFrame(animate);
      };

      animationFrames[i] = requestAnimationFrame(animate);
    });

    return () => {
      animationFrames.forEach((frameId) => cancelAnimationFrame(frameId));
    };
  }, [rows, cols, tileSize, imageUrl, maxOpacities]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        ref={tilesRef}
        style={{
          width: `${cols * tileSize}px`,
          height: `${rows * tileSize}px`,
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      />
    </div>
  );
}

// ── Main About Component ───────────────────────────────────────────────────
export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const defaultImagePath = "/about-img.png";
  const fallbackImagePath =
    "https://placehold.co/320x320/cccccc/333333?text=Abu";

  const [currentImagePath, setCurrentImagePath] =
    useState<string>(defaultImagePath);
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

  useEffect(() => {
    const img = new Image();
    img.src = defaultImagePath;
    img.onload = () => setCurrentImagePath(defaultImagePath);
    img.onerror = () => setCurrentImagePath(fallbackImagePath);
  }, []);

  const highlights = [
    {
      icon: MapPin,
      label: "Based in",
      value: "Tamil Nadu, India",
    },
    {
      icon: Calendar,
      label: "Experience",
      value: "4+ Years",
    },
    {
      icon: Code2,
      label: "Specialty",
      value: "React & Next.js",
    },
    {
      icon: Sparkles,
      label: "Focus",
      value: "Delightful UX",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 overflow-hidden bg-background"
    >
      {/* Background decoration - subtle and consistent with hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 bg-yellow-400/5"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Visual Element - FIX 3.3 */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 lg:w-[380px] lg:h-[380px]">
              <AnimatedTiles
                imageUrl={currentImagePath}
                rows={12}
                cols={8}
                tileSize={42}
              />
              {/* Subtle ring for polish */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>

          {/* Right: Content - All fixes applied here */}
          <div className="lg:col-span-7">
            {/* FIX 3.5 — Strong visual hierarchy */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="uppercase text-xs font-semibold tracking-[2px] text-yellow-600 dark:text-yellow-400">
                  My Story
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[2.75rem] md:text-6xl font-bold tracking-tighter leading-none mb-6"
              >
                About <span className="text-yellow-500">Me</span>
              </motion.h2>
            </div>

            {/* FIX 3.2 — Line length constrained to ~65 characters */}
            <div className="max-w-prose text-lg leading-relaxed text-foreground/80 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Hi, I&apos;m Abu — a frontend developer who loves turning
                complex ideas into clean, responsive, and delightful digital
                experiences.
              </motion.p>
            </div>

            {/* FIX 3.1 & 3.4 — Scannable structure with highlights grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-6 mb-12"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-2xl p-6 hover:border-yellow-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-400/10 flex items-center justify-center text-yellow-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-semibold text-lg text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Second paragraph - kept short */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-prose text-lg leading-relaxed text-foreground/80 mb-10"
            >
              My focus is on building fast, accessible interfaces using React,
              Next.js, Tailwind, and Framer Motion. I believe great products
              are not just functional — they should feel good to use.
            </motion.p>

            {/* CTA - matches hero styling */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 h-12 rounded-2xl bg-yellow-500 px-8 font-semibold text-yellow-950 hover:bg-yellow-600 transition-all"
            >
              Explore My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}