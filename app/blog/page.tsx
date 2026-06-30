"use client"

// path: app/blog/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW BLOG POST
// ─────────────────────────────────────────────────────────────────────────────
//  1. Create  app/blog/posts/YourBlog.tsx  (copy any existing post as template)
//  2. Export  YOUR_CARD  and  YourBlog  from that file
//  3. Import them here (see "① IMPORT" below)
//  4. Add YOUR_CARD to CARDS array (see "② CARDS" below)
//  5. Add useViewCounter for your blog (see "③ VIEW COUNTERS" below)
//  6. Pass the view count to BlogList via viewCounts (see "④ VIEW COUNTS" below)
//  7. Add <YourBlog /> to the view switch (see "⑤ VIEW SWITCH" below)
//  Done ✓ — no other files need to change.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes"
import {
  HomeIcon, PenLineIcon, LinkedinIcon,
  FileTextIcon, GithubIcon, MailIcon,
  SunIcon, MoonIcon,
  ClockIcon, EyeIcon, BookOpenIcon,
} from "lucide-react"

// ① IMPORT — add your blog import here
import { CollegeBlog,  COLLEGE_CARD  } from "./Posts/CollegeBlog"
import { TeachingBlog, TEACHING_CARD } from "./Posts/TeachingBlog"
import { ChennaiBlog,  CHENNAI_CARD  } from "./Posts/ChennaiBlog"
import { KosalBlog,    KOSAL_CARD    } from "./Posts/KosalBlog"

// ─────────────────────────────────────────────────────────────────────────────
// ② CARDS — add your card here (order = display order on listing page)
// ─────────────────────────────────────────────────────────────────────────────

const CARDS = [
  COLLEGE_CARD,   // Blog 1 — College years
  CHENNAI_CARD,   // Blog 2 — Chennai origin story
  KOSAL_CARD,     // Blog 3 — Getting the Kosal.io job
  TEACHING_CARD,  // Blog 4 — 6 AM classroom
]

// Derive the ViewMode union type automatically from CARDS
type ViewMode = "list" | (typeof CARDS)[number]["id"]

// ─────────────────────────────────────────────────────────────────────────────
// NOISE LAYER
// ─────────────────────────────────────────────────────────────────────────────

function Noise({
  patternSize = 100, patternScaleX = 1, patternScaleY = 1,
  patternRefreshInterval = 1, patternAlpha = 38, intensity = 0.85,
}: {
  patternSize?: number; patternScaleX?: number; patternScaleY?: number
  patternRefreshInterval?: number; patternAlpha?: number; intensity?: number
}) {
  const [mounted, setMounted] = useState(false)
  const grainRef = useRef<HTMLCanvasElement>(null)
  const cssSizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = grainRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const patCanvas = document.createElement("canvas")
    patCanvas.width = patternSize; patCanvas.height = patternSize
    const patCtx = patCanvas.getContext("2d")!
    const patData = patCtx.createImageData(patternSize, patternSize)
    const pLen = patternSize * patternSize * 4

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const p = canvas.parentElement?.getBoundingClientRect()
      const w = p?.width ?? window.innerWidth
      const h = p?.height ?? window.innerHeight
      cssSizeRef.current = { width: w, height: h }
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let raf: number, frame = 0
    const loop = () => {
      const { width: cw, height: ch } = cssSizeRef.current
      if (cw > 0 && ch > 0 && frame % patternRefreshInterval === 0) {
        for (let i = 0; i < pLen; i += 4) {
          const v = Math.random() * 255 * intensity
          patData.data[i] = patData.data[i+1] = patData.data[i+2] = v
          patData.data[i+3] = patternAlpha
        }
        patCtx.putImageData(patData, 0, 0)
        const sx = Math.max(0.001, patternScaleX), sy = Math.max(0.001, patternScaleY)
        ctx.clearRect(0, 0, cw, ch)
        ctx.save(); ctx.scale(sx, sy)
        const fill = ctx.createPattern(patCanvas, "repeat")
        if (fill) { ctx.fillStyle = fill; ctx.fillRect(0, 0, cw/sx, ch/sy) }
        ctx.restore()
      }
      frame++; raf = requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize); resize(); loop()
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf) }
  }, [mounted, patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity])

  return <canvas ref={grainRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO BACKGROUNDS
// ─────────────────────────────────────────────────────────────────────────────

const LIGHT_COLORS = [
  { color: "rgba(245,87,2,1)",    stop: "10.5%" },
  { color: "rgba(245,120,2,1)",   stop: "16%"   },
  { color: "rgba(245,140,2,1)",   stop: "17.5%" },
  { color: "rgba(245,170,100,1)", stop: "25%"   },
  { color: "rgba(238,174,202,1)", stop: "40%"   },
  { color: "rgba(202,179,214,1)", stop: "65%"   },
  { color: "rgba(148,201,233,1)", stop: "100%"  },
]

function GradientBackground({ children }: { children?: React.ReactNode }) {
  const colorStops = LIGHT_COLORS.map(({ color, stop }) => `${color} ${stop}`).join(",")
  return (
    <div className="absolute inset-0 w-full h-full" style={{ background: `radial-gradient(125% 125% at 50% 101%, ${colorStops})` }}>
      <Noise patternSize={100} patternScaleX={1} patternScaleY={1} patternRefreshInterval={1} patternAlpha={38} intensity={0.85} />
      {children}
    </div>
  )
}

function SilkBackground() {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const noise = (x: number, y: number) => ((2.71828 * Math.sin(2.71828 * x)) * (2.71828 * Math.sin(2.71828 * y)) * (1 + x)) % 1

    const draw = () => {
      const { width, height } = canvas
      const img = ctx.createImageData(width, height)
      const d = img.data, t = 0.018 * time
      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * 2, v = (y / height) * 2
          const tx = u, ty = v + 0.03 * Math.sin(8 * tx - t)
          const pattern = 0.6 + 0.4 * Math.sin(5 * (tx + ty + Math.cos(3 * tx + 5 * ty) + 0.02 * t) + Math.sin(20 * (tx + ty - 0.1 * t)))
          const k = Math.max(0, pattern - noise(x, y) / 15)
          const idx = (y * width + x) * 4
          if (idx < d.length) { d[idx] = Math.floor(110 * k); d[idx+1] = Math.floor(100 * k); d[idx+2] = Math.floor(130 * k); d[idx+3] = 255 }
        }
      }
      ctx.putImageData(img, 0, 0)
      const vg = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width,height)/1.6)
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.55)")
      ctx.fillStyle = vg; ctx.fillRect(0, 0, width, height)
      time++; animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => { ro.disconnect(); if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [mounted])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
}

function HeroBackground({ isDark }: { isDark: boolean }) {
  return isDark ? <SilkBackground /> : <GradientBackground />
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCK
// ─────────────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: HomeIcon,     label: "Home",     href: "/",                                     external: false },
  { icon: PenLineIcon,  label: "Blog",     href: "/blog",                                 external: false, sep: true },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/abusid07",  external: true },
  { icon: FileTextIcon, label: "Resume",   href: "/resume.pdf",                           external: true },
  { icon: GithubIcon,   label: "GitHub",   href: "https://github.com/Abu-sid07",          external: true },
  { icon: MailIcon,     label: "Gmail",    href: "mailto:abubackersiddique311@gmail.com", external: false },
]

function Tooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <span
      className="absolute left-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg bg-zinc-900 dark:bg-zinc-100 px-2 py-1 text-[11px] font-medium text-white dark:text-zinc-900"
      style={{ bottom: "calc(100% + 10px)", transform: `translateX(-50%) translateY(${visible ? 0 : 6}px)`, opacity: visible ? 1 : 0, transition: "opacity .12s ease, transform .12s ease" }}
    >
      {label}
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
    </span>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [hov, setHov] = useState(false)
  const [ok, setOk] = useState(false)
  useEffect(() => setOk(true), [])
  if (!ok) return <div style={{ width: 38, height: 38 }} />

  const dark = theme === "dark"
  const sz = hov ? 52 : 38
  const tr = "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1),transform .2s cubic-bezier(.34,1.56,.64,1)"

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0 cursor-pointer"
      style={{ width: sz, height: sz, transform: `translateY(${hov ? -10 : 0}px)`, transition: tr }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <Tooltip label={dark ? "Light Mode" : "Dark Mode"} visible={hov} />
      <button aria-label="Toggle theme"
        className="flex items-center justify-center w-full h-full rounded-xl text-zinc-600 dark:text-zinc-300"
        style={{ background: hov ? "hsl(var(--muted))" : "transparent" }}
      >
        {dark
          ? <SunIcon  style={{ width: sz*.45, height: sz*.45, transition: "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }} />
          : <MoonIcon style={{ width: sz*.45, height: sz*.45, transition: "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }} />
        }
      </button>
    </div>
  )
}

function DockNav() {
  const [hov, setHov] = useState<number|null>(null)
  const sz = (i: number) => hov===null?38:Math.abs(i-hov)===0?52:Math.abs(i-hov)===1?45:38
  const ty = (i: number) => hov===null?0:Math.abs(i-hov)===0?-10:Math.abs(i-hov)===1?-5:0
  const tr = "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1),transform .2s cubic-bezier(.34,1.56,.64,1)"

  return (
    <div className="flex items-end gap-0.5 sm:gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-700/40 rounded-2xl px-2 sm:px-3 h-[50px] sm:h-[54px] shadow-lg shadow-black/5">
      {NAV_ITEMS.map((item, i) => {
        const size = sz(i), y = ty(i), isH = hov === i
        return (
          <React.Fragment key={item.label}>
            {item.sep && <div className="w-px h-5 sm:h-6 bg-zinc-200 dark:bg-zinc-700 mx-0.5 sm:mx-1 self-center flex-shrink-0"/>}
            <div
              className="relative flex items-center justify-center flex-shrink-0"
              style={{ width: size, height: size, transform: `translateY(${y}px)`, transition: tr }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            >
              <Tooltip label={item.label} visible={isH}/>
              <Link href={item.href} target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center w-full h-full rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                style={{ background: isH ? "hsl(var(--muted))" : "transparent" }}
              >
                <item.icon style={{ width: size*.45, height: size*.45, transition: "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }}/>
              </Link>
            </div>
          </React.Fragment>
        )
      })}
      <div className="w-px h-5 sm:h-6 bg-zinc-200 dark:bg-zinc-700 mx-0.5 sm:mx-1 self-center flex-shrink-0"/>
      <ThemeToggle/>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG LIST
// ─────────────────────────────────────────────────────────────────────────────

function BlogList({
  onSelect, viewCounts, animIn, isDark,
}: {
  onSelect: (v: ViewMode) => void
  viewCounts: Record<string, number>
  animIn: boolean
  isDark: boolean
}) {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-[38vh] sm:h-[45vh] md:h-[52vh] overflow-hidden">
        <HeroBackground isDark={isDark}/>
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#faf9f6] dark:from-stone-950 to-transparent z-10"/>
        <div
          className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
          style={{ opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(20px)", transition: "opacity .8s ease, transform .8s ease" }}
        >
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 font-sans"
            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)" }}>
            Abu's Writing
          </p>
          <h1 className="font-serif font-light tracking-[-0.04em] leading-none mb-4 sm:mb-5"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", color: isDark ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)", textShadow: isDark ? "0 0 40px rgba(255,255,255,0.1)" : "0 2px 20px rgba(0,0,0,0.18)" }}>
            Stories
          </h1>
          <p className="font-serif italic text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md"
            style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.75)" }}>
            Real moments — from college corridors to early morning classrooms.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-[740px] mx-auto px-4 sm:px-5 pb-32 pt-6 sm:pt-8">
        <div
          className="flex items-center gap-2 mb-6 sm:mb-8"
          style={{ opacity: animIn?1:0, transform: animIn?"none":"translateY(12px)", transition:"opacity .6s .3s ease, transform .6s .3s ease" }}
        >
          <BookOpenIcon className="w-4 h-4 text-stone-400 dark:text-stone-500"/>
          <span className="text-sm font-medium text-stone-400 dark:text-stone-500 font-sans tracking-wide">
            {CARDS.length} {CARDS.length === 1 ? "story" : "stories"}
          </span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {CARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => onSelect(card.id as ViewMode)}
              className={`group w-full text-left bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-black/20 active:scale-[0.99] ${card.border}`}
              style={{
                opacity: animIn ? 1 : 0,
                transform: animIn ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .5s ${0.35 + idx * 0.1}s ease, transform .5s ${0.35 + idx * 0.1}s ease, box-shadow .2s, border-color .2s`,
              }}
            >
              <div className={`h-[3px] w-full ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity`}/>
              <div className="p-4 sm:p-6 md:p-7">
                <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                  <span className={`text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-sans ${card.tagColor}`}>
                    {card.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500 font-sans shrink-0 mt-1">
                    <EyeIcon className="w-3 h-3"/>
                    {viewCounts[card.id] ?? card.initialViews}
                  </span>
                </div>
                <h2 className="font-serif text-[18px] sm:text-[21px] md:text-[23px] font-bold text-stone-900 dark:text-stone-50 leading-snug mb-1.5 sm:mb-2 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                  {card.title}
                </h2>
                <p className="text-[13px] sm:text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed mb-4 sm:mb-5 font-sans">
                  {card.summary}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-stone-400 dark:text-stone-500 font-sans">
                    <span>{card.date}</span>
                    <span className="text-stone-200 dark:text-stone-700">·</span>
                    <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3"/>{card.read_time}</span>
                  </div>
                  <span className="text-xs text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300 font-sans transition-colors">
                    Read →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// VIEW COUNTER
// ─────────────────────────────────────────────────────────────────────────────

function useViewCounter(blogId: string, init: number) {
  const [views, setViews] = useState(init)
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])
  useEffect(() => {
    if (!isMounted) return
    const key = `blog_views_${blogId}`
    const n = (parseInt(localStorage.getItem(key) ?? String(init)) || init) + 1
    localStorage.setItem(key, String(n))
    setViews(n)
  }, [blogId, init, isMounted])
  return isMounted ? views : init
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE CONTENT
// ─────────────────────────────────────────────────────────────────────────────

function BlogPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const viewParam = searchParams.get("post") as ViewMode | null

  const [view, setView] = useState<ViewMode>("list")
  const [animIn, setAnimIn] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // ③ VIEW COUNTERS — add one line per blog
  const collegeViews  = useViewCounter("college",  COLLEGE_CARD.initialViews)
  const teachingViews = useViewCounter("teaching", TEACHING_CARD.initialViews)
  const chennaiViews  = useViewCounter("chennai",  CHENNAI_CARD.initialViews)
  const kosalViews    = useViewCounter("kosal",    KOSAL_CARD.initialViews)

  // ④ VIEW COUNTS MAP — add your blog id → views here
  const viewCounts: Record<string, number> = {
    college:  collegeViews,
    teaching: teachingViews,
    chennai:  chennaiViews,
    kosal:    kosalViews,
  }

  useEffect(() => {
    const validIds = CARDS.map(c => c.id) as string[]
    if (viewParam && validIds.includes(viewParam)) {
      setView(viewParam as ViewMode)
    } else {
      setView("list")
    }
  }, [viewParam])

  useEffect(() => {
    setAnimIn(false)
    const t = setTimeout(() => setAnimIn(true), 60)
    return () => clearTimeout(t)
  }, [view])

  const go = useCallback((v: ViewMode) => {
    setAnimIn(false)
    if (v === "list") { router.push("/blog") } else { router.push(`/blog?post=${v}`) }
    setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }) }, 200)
  }, [router])

  const back = useCallback(() => go("list"), [go])

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-stone-950 transition-colors duration-200">

      {view === "list" && (
        <BlogList onSelect={go} viewCounts={viewCounts} animIn={animIn} isDark={isDark} />
      )}

      {/* ⑤ VIEW SWITCH — add your <YourBlog /> case here */}
      {view === "college" && (
        <div className="pt-10 sm:pt-12">
          <CollegeBlog onBack={back} liveViews={collegeViews} animIn={animIn} />
        </div>
      )}
      {view === "teaching" && (
        <div className="pt-10 sm:pt-12">
          <TeachingBlog onBack={back} liveViews={teachingViews} animIn={animIn} />
        </div>
      )}
      {view === "chennai" && (
        <div className="pt-10 sm:pt-12">
          <ChennaiBlog onBack={back} liveViews={chennaiViews} animIn={animIn} />
        </div>
      )}
      {view === "kosal" && (
        <div className="pt-10 sm:pt-12">
          <KosalBlog onBack={back} liveViews={kosalViews} animIn={animIn} />
        </div>
      )}

      {/* Fixed Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto scale-90 sm:scale-100 origin-bottom transition-transform">
          <DockNav />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6] dark:bg-stone-950" />}>
      <BlogPageContent />
    </Suspense>
  )
}