"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

// ── AnimatedTiles — UNCHANGED ─────────────────────────────────────────
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
        minHeight: "auto",
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
        }}
      />
    </div>
  );
}

// ── About Section ─────────────────────────────────────────────────────
export default function About() {
  const defaultImagePath = "/about-img.png";
  const fallbackImagePath =
    "https://placehold.co/320x320/cccccc/333333?text=Image+Missing";

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

  const textAnimation = { initial: { opacity: 0, y: 30 } };
  const baseDelay = 0.2;

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-28 overflow-hidden transition-colors duration-300"
      /*
        FIX: Use `bg-background` Tailwind token so this section uses the
        exact same background variable as the hero (<MinimalistHero> root div).
        In dark mode `bg-background` resolves to whatever --background CSS var
        your theme defines (typically #0a0a0a from shadcn), so it is pixel-perfect
        with the hero. In light mode it resolves to white — same as before.
        We no longer hardcode #111111 which was causing the visible seam.
      */
      style={
        isDark
          ? { background: "hsl(var(--background))" }
          : { background: "#ffffff" }
      }
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={[
            "absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2",
            isDark ? "bg-yellow-400/[0.06]" : "bg-yellow-400/[0.03]",
          ].join(" ")}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${
              isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,1)"
            } 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            opacity: 0.03,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10 max-w-7xl">

        {/* ── Left: Image — SIZE & POSITION UNCHANGED ── */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.8 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div
            className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-lg overflow-hidden flex items-center justify-center"
            style={{ boxShadow: "none", border: "none" }}
          >
            <AnimatedTiles
              imageUrl={currentImagePath}
              rows={12}
              cols={8}
              tileSize={Math.floor((72 / 4) * (16 / 12)) || 40}
              backgroundColor="transparent"
            />
          </div>
        </motion.div>

        {/* ── Right: Content ── */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={[
              "inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 border rounded-full mb-6 shadow-sm mx-auto lg:mx-0",
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
              My Story
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.1 }}
            className={[
              "text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 tracking-tight",
              isDark ? "text-white" : "text-gray-900",
            ].join(" ")}
          >
            About{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Me
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: baseDelay + 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </motion.h2>

          {/* Para 1 */}
          <motion.p
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.25 }}
            className={[
              "text-lg leading-relaxed mb-6",
              isDark ? "text-gray-300" : "text-gray-700",
            ].join(" ")}
          >
            Hi! I&apos;m{" "}
            <span className={["font-bold", isDark ? "text-white" : ""].join(" ")}>
              Abu
            </span>
            , a passionate frontend developer specializing in creating modern,
            responsive, and user-friendly web experiences. I love turning ideas
            into interactive digital products and continuously learning the
            latest web technologies.
          </motion.p>

          {/* Para 2 */}
          <motion.p
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.4 }}
            className={[
              "text-lg leading-relaxed mb-6",
              isDark ? "text-gray-300" : "text-gray-700",
            ].join(" ")}
          >
            My focus is on building scalable and clean user interfaces with{" "}
            <span
              className={[
                "font-semibold border-b border-yellow-400/30",
                isDark ? "text-white" : "text-gray-900",
              ].join(" ")}
            >
              React, Next.js, Tailwind CSS, and modern UI libraries
            </span>
            . I enjoy crafting smooth animations and delightful user experiences.
          </motion.p>

          {/* CTA */}
          <motion.a
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.55 }}
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-yellow-500 px-8 text-sm font-bold text-white shadow-lg shadow-yellow-500/25 transition-all hover:-translate-y-0.5 hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-500/30"
          >
            Explore My Work
          </motion.a>
        </div>
      </div>
    </section>
  );
}