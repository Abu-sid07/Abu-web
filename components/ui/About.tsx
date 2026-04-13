"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface AnimatedTilesProps {
  rows?: number
  cols?: number
  tileSize?: number
  imageUrl?: string
  backgroundColor?: string
}

export function AnimatedTiles({
  rows = 12,
  cols = 8,
  tileSize = 50,
  imageUrl = "/about-img.png",
  backgroundColor = "transparent",
}: AnimatedTilesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tilesRef = useRef<HTMLDivElement | null>(null)

  // Template opacity map (rows x cols). If grid is different size,
  // we fall back to 0 for missing entries.
  const maxOpacities: number[][] = [
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
  ]

  useEffect(() => {
    if (!tilesRef.current) return

    const tiles: HTMLDivElement[] = []
    tilesRef.current.innerHTML = ""

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = document.createElement("div")
        tile.className = "tile"
        tile.style.width = `${tileSize}px`
        tile.style.height = `${tileSize}px`
        tile.style.backgroundImage = `url(${imageUrl})`
        tile.style.backgroundPosition = `${-col * tileSize}px ${-row * tileSize}px`
        tile.style.backgroundSize = `${cols * tileSize}px ${rows * tileSize}px`
        tile.style.float = "left"
  // ensure no visible borders or outlines from tiles
  tile.style.border = 'none'
  tile.style.boxSizing = 'border-box'
  tile.style.backgroundRepeat = 'no-repeat'
        tile.style.opacity = "0"
        tiles.push(tile)
        tilesRef.current!.appendChild(tile)
      }
    }

    const animationFrames: number[] = []
    const startTimes: number[] = []

    tiles.forEach((tile, i) => {
      const row = Math.floor(i / cols)
      const col = i % cols
      const variance = 0.4
      const maxOpacity = maxOpacities[row]?.[col] ?? 0
      const minOpacity = Math.max(0, maxOpacity - variance)
      const duration = Math.random() * 0.25 + 0.75 // 0.75 to 1 second

      if (maxOpacity === 0) {
        tile.style.opacity = "0"
        return
      }

      startTimes[i] = Math.random() * duration
      let startTime: number | null = null

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = (currentTime - startTime) / 1000
        const progress = (elapsed + startTimes[i]) % (duration * 2)
        const normalizedProgress = progress < duration ? progress / duration : (duration * 2 - progress) / duration

        const opacity = minOpacity + (maxOpacity - minOpacity) * normalizedProgress
        tile.style.opacity = Math.max(minOpacity, Math.min(maxOpacity, opacity)).toString()

        animationFrames[i] = requestAnimationFrame(animate)
      }

      animationFrames[i] = requestAnimationFrame(animate)
    })

    return () => {
      animationFrames.forEach((frameId) => cancelAnimationFrame(frameId))
    }
  }, [rows, cols, tileSize, imageUrl])

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // don't force full viewport height inside the About card
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
  )
}

export default function About() {
  
  // Define image paths
  const defaultImagePath = "/about-img.png"; 
  const fallbackImagePath = "https://placehold.co/320x320/cccccc/333333?text=Image+Missing";
  
  // State to manage the image source (preloaded). We preload the default and
  // fall back to the placeholder if it fails to load. This value is passed to
  // the AnimatedTiles component below.
  const [currentImagePath, setCurrentImagePath] = useState<string>(defaultImagePath);

  // Preload the image and switch to fallback on error. Runs once on mount.
  useEffect(() => {
    const img = new Image();
    img.src = defaultImagePath;
    img.onload = () => setCurrentImagePath(defaultImagePath);
    img.onerror = () => setCurrentImagePath(fallbackImagePath);
  }, []);

  // Define a base animation for text elements (fade in and slide up slightly)
  const textAnimation = {
    initial: { opacity: 0, y: 30 },
  };

  // Define the base delay for the whole right content block
  const baseDelay = 0.2; 

  return (
    <section id="about" className="relative py-28 bg-white overflow-hidden">
      {/* Background decoration matching other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-yellow-400/[0.03] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Image (ENHANCED animation) */}
        <motion.div
          // 1. Initial state (hidden)
          initial={{ opacity: 0, x: -50, scale: 0.8 }} 
          // 2. Animated state when section is in view
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          // 3. Define the trigger point (when 40% of the element is visible)
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center"
        >
          {/* CHANGE: Set border radius to rounded-lg (smaller than rounded-xl) and ensured no border is present. */}
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-lg overflow-hidden flex items-center justify-center" style={{ boxShadow: 'none', border: 'none' }}>
            {/* Animated tile-based image replacement */}
            <AnimatedTiles
              imageUrl={currentImagePath}
              rows={12}
              cols={8}
              tileSize={Math.floor((72 / 4) * (16 / 12)) || 40}
              backgroundColor="transparent"
            />
          </div>
        </motion.div>

        {/* Right Side: Content Container (Uses staggered motion on children) */}
        <div className="text-center lg:text-left">
          
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-6 shadow-sm mx-auto lg:mx-0"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-700 font-semibold text-xs uppercase tracking-widest">
              My Story
            </span>
          </motion.div>

          {/* Title: Appears first */}
          <motion.h2
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight"
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

          {/* First Paragraph: Appears second */}
          <motion.p
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.25 }}
            className="text-lg text-gray-700 leading-relaxed mb-6"
          >
            Hi! I’m <span className="font-bold">Abu</span>, a passionate frontend
            developer specializing in creating modern, responsive, and
            user-friendly web experiences. I love turning ideas into interactive
            digital products and continuously learning the latest web
            technologies.
          </motion.p>

          {/* Second Paragraph: Appears third */}
          <motion.p
            {...textAnimation}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: baseDelay + 0.4 }}
            className="text-lg text-gray-700 leading-relaxed mb-6"
          >
            My focus is on building scalable and clean user interfaces with{" "}
            <span className="font-semibold text-gray-900 border-b border-yellow-400/30">
              React, Next.js, Tailwind CSS, and modern UI libraries
            </span>
            . I enjoy crafting smooth animations and delightful user
            experiences.
          </motion.p>

          {/* Button: Appears last */}
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
