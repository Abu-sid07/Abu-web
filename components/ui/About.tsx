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
      value: "1 Years",
    },
    {
      icon: Code2,
      label: "Specialty",
      value: "React & Next.js",
    },
    {
      icon: Sparkles,
      label: "Focus",
      value: "UI/UX",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-[80px] md:py-[40px] overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left: Visual Element */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -40 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96">
              <AnimatedTiles
                imageUrl={currentImagePath}
                rows={12}
                cols={8}
                tileSize={30}
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="lg:col-span-7">
            <div className="mb-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4"
              >
                About <span className="text-yellow-500">Me</span>
              </motion.h2>
            </div>

            <div className="max-w-prose text-base sm:text-lg leading-relaxed text-foreground/80 mb-8">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3 sm:gap-4 mb-8"
            >
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group bg-card border border-border rounded-lg sm:rounded-2xl p-3 sm:p-6 hover:border-yellow-400/30 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-2 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-yellow-400/10 flex-shrink-0 flex items-center justify-center text-yellow-500">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-semibold text-sm sm:text-lg text-foreground leading-tight">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="max-w-prose text-base sm:text-lg leading-relaxed text-foreground/80 mb-8"
            >
              My focus is on building fast, accessible interfaces using React,
              Next.js, Tailwind, and Framer Motion. I believe great products
              are not just functional — they should feel good to use.
            </motion.p>

            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 sm:gap-3 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-yellow-500 px-5 sm:px-8 font-semibold text-yellow-950 hover:bg-yellow-600 transition-all text-sm sm:text-base"
            >
              Explore My Work
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}