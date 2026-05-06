"use client"

// path: Abu-web/app/blog/page.tsx  (save as light-theme-blog.tsx)
// Dark  mode → animated silk canvas hero
// Light mode → radial gradient + animated film-grain noise hero

import React, { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  HomeIcon, PenLineIcon, LinkedinIcon,
  FileTextIcon, GithubIcon, MailIcon,
  SunIcon, MoonIcon, ArrowLeftIcon,
  ClockIcon, EyeIcon, BookOpenIcon,
} from "lucide-react"

type ViewMode = "list" | "college" | "teaching"

// ─────────────────────────────────────────────────────────────────────────────
// NOISE LAYER  (film-grain overlay, used by GradientBackground)
// ─────────────────────────────────────────────────────────────────────────────

function Noise({
  patternSize = 100,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 1,
  patternAlpha = 38,
  intensity = 0.85,
}: {
  patternSize?: number
  patternScaleX?: number
  patternScaleY?: number
  patternRefreshInterval?: number
  patternAlpha?: number
  intensity?: number
}) {
  const grainRef = useRef<HTMLCanvasElement>(null)
  const cssSizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const patCanvas = document.createElement("canvas")
    patCanvas.width  = patternSize
    patCanvas.height = patternSize
    const patCtx  = patCanvas.getContext("2d")!
    const patData = patCtx.createImageData(patternSize, patternSize)
    const pLen    = patternSize * patternSize * 4

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const p   = canvas.parentElement?.getBoundingClientRect()
      const w   = p?.width  ?? window.innerWidth
      const h   = p?.height ?? window.innerHeight
      cssSizeRef.current = { width: w, height: h }
      canvas.width  = w * dpr
      canvas.height = h * dpr
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

        const sx = Math.max(0.001, patternScaleX)
        const sy = Math.max(0.001, patternScaleY)
        ctx.clearRect(0, 0, cw, ch)
        ctx.save()
        ctx.scale(sx, sy)
        const fill = ctx.createPattern(patCanvas, "repeat")
        if (fill) { ctx.fillStyle = fill; ctx.fillRect(0, 0, cw/sx, ch/sy) }
        ctx.restore()
      }
      frame++
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize)
    resize()
    loop()
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf) }
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity])

  return <canvas ref={grainRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// ─────────────────────────────────────────────────────────────────────────────
// GRADIENT BACKGROUND  (light-mode hero)
// ─────────────────────────────────────────────────────────────────────────────

// Warm sunrise palette — feels personal, editorial, and soft
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
  const gradient   = `radial-gradient(125% 125% at 50% 101%, ${colorStops})`

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ background: gradient }}
    >
      {/* Animated film-grain noise overlay */}
      <Noise
        patternSize={100}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={1}
        patternAlpha={38}
        intensity={0.85}
      />
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SILK CANVAS BACKGROUND  (dark-mode hero)
// ─────────────────────────────────────────────────────────────────────────────

function SilkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef   = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let time = 0
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const noise = (x: number, y: number) => {
      const G = 2.71828
      return ((G * Math.sin(G * x)) * (G * Math.sin(G * y)) * (1 + x)) % 1
    }

    const draw = () => {
      const { width, height } = canvas
      const img = ctx.createImageData(width, height)
      const d   = img.data
      const t   = 0.018 * time

      // Purple-gray silk palette for dark mode
      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * 2, v = (y / height) * 2
          const tx = u, ty = v + 0.03 * Math.sin(8 * tx - t)
          const pattern =
            0.6 + 0.4 * Math.sin(
              5 * (tx + ty + Math.cos(3 * tx + 5 * ty) + 0.02 * t) +
              Math.sin(20 * (tx + ty - 0.1 * t))
            )
          const k   = Math.max(0, pattern - noise(x, y) / 15)
          const idx = (y * width + x) * 4
          if (idx < d.length) {
            d[idx]   = Math.floor(110 * k)
            d[idx+1] = Math.floor(100 * k)
            d[idx+2] = Math.floor(130 * k)
            d[idx+3] = 255
          }
        }
      }
      ctx.putImageData(img, 0, 0)

      const vg = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width,height)/1.6)
      vg.addColorStop(0, "rgba(0,0,0,0)")
      vg.addColorStop(1, "rgba(0,0,0,0.55)")
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, width, height)

      time++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => { ro.disconnect(); if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO BACKGROUND — switches on theme
// ─────────────────────────────────────────────────────────────────────────────

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
      className="absolute left-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg
                 bg-zinc-900 dark:bg-zinc-100 px-2 py-1 text-[11px] font-medium
                 text-white dark:text-zinc-900"
      style={{
        bottom: "calc(100% + 10px)",
        transform: `translateX(-50%) translateY(${visible ? 0 : 6}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity .12s ease, transform .12s ease",
      }}
    >
      {label}
      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100" />
    </span>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [hov, setHov] = useState(false)
  const [ok,  setOk]  = useState(false)
  useEffect(() => setOk(true), [])
  if (!ok) return <div style={{ width: 38, height: 38 }} />

  const dark = theme === "dark"
  const sz   = hov ? 52 : 38
  const tr   = "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1),transform .2s cubic-bezier(.34,1.56,.64,1)"

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0 cursor-pointer"
      style={{ width:sz, height:sz, transform:`translateY(${hov?-10:0}px)`, transition:tr }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <Tooltip label={dark ? "Light Mode" : "Dark Mode"} visible={hov} />
      <button aria-label="Toggle theme"
        className="flex items-center justify-center w-full h-full rounded-xl text-zinc-600 dark:text-zinc-300"
        style={{ background: hov ? "hsl(var(--muted))" : "transparent" }}
      >
        {dark
          ? <SunIcon  style={{ width:sz*.45, height:sz*.45, transition:"width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }} />
          : <MoonIcon style={{ width:sz*.45, height:sz*.45, transition:"width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }} />
        }
      </button>
    </div>
  )
}

function DockNav() {
  const [hov, setHov] = useState<number|null>(null)
  const sz = (i:number) => hov===null?38:Math.abs(i-hov)===0?52:Math.abs(i-hov)===1?45:38
  const ty = (i:number) => hov===null?0 :Math.abs(i-hov)===0?-10:Math.abs(i-hov)===1?-5:0
  const tr = "width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1),transform .2s cubic-bezier(.34,1.56,.64,1)"

  return (
    <div className="flex items-end gap-0.5 sm:gap-1
                    bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl
                    border border-zinc-200/60 dark:border-zinc-700/40
                    rounded-2xl px-2 sm:px-3 h-[50px] sm:h-[54px]
                    shadow-lg shadow-black/5">
      {NAV_ITEMS.map((item, i) => {
        const size=sz(i), y=ty(i), isH=hov===i
        return (
          <React.Fragment key={item.label}>
            {item.sep && <div className="w-px h-5 sm:h-6 bg-zinc-200 dark:bg-zinc-700 mx-0.5 sm:mx-1 self-center flex-shrink-0"/>}
            <div
              className="relative flex items-center justify-center flex-shrink-0"
              style={{ width:size, height:size, transform:`translateY(${y}px)`, transition:tr }}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            >
              <Tooltip label={item.label} visible={isH}/>
              <Link href={item.href} target={item.external?"_blank":"_self"}
                rel={item.external?"noopener noreferrer":undefined}
                className="flex items-center justify-center w-full h-full rounded-xl
                           text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                style={{ background:isH?"hsl(var(--muted))":"transparent" }}
              >
                <item.icon style={{ width:size*.45, height:size*.45, transition:"width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1)" }}/>
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
// SHARED BLOG UI
// ─────────────────────────────────────────────────────────────────────────────

function SLabel({ text }: { text: string }) {
  return <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-stone-400 dark:text-stone-500 mb-2 font-sans">{text}</p>
}
function SHeading({ text }: { text: string }) {
  return <h2 className="font-serif text-[20px] sm:text-[22px] md:text-2xl font-bold text-stone-900 dark:text-stone-50 leading-snug mb-4">{text}</h2>
}

function BlogImage({ src, alt, caption, isGif=false }: { src:string; alt:string; caption:string; isGif?:boolean }) {
  return (
    <figure className="overflow-hidden rounded-xl sm:rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm bg-stone-50 dark:bg-stone-900">
      {isGif
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={src} alt={alt} className="w-full h-auto block"/>
        : <Image src={src} alt={alt} width={0} height={0}
            sizes="(max-width:640px)100vw,(max-width:768px)100vw,740px"
            style={{ width:"100%", height:"auto", display:"block" }}/>
      }
      {caption && (
        <figcaption className="px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-[12px] italic text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-800">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-400 dark:text-stone-500
                 hover:text-stone-800 dark:hover:text-stone-100 transition-colors mb-8 sm:mb-10 group"
    >
      <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform"/>
      Back to all posts
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLEGE DATA + COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const COLLEGE = {
  title: "Three Years That Changed Everything",
  subtitle: "Personal Story · College",
  author: "Abu", date: "November 2024", read_time: "5 min read", views: 350,
  institution: "Sadakathullah Appa College", course: "BCA", duration: "2021 to 2024",
  summary: "I walked into Sadakathullah Appa College not knowing who I'd become. Here's what I left with — and why those 1,095 days were worth every sleepless night.",
  chapters: [
    {
      heading: "🌱 The Day Everything Felt Possible",
      body: "I still remember standing at the college gate on day one — backpack too heavy, directions unclear, heart pounding. The campus stretched out like a world I hadn't earned yet. New faces everywhere. New rules. New version of me. The mix of terror and excitement was something I'd never felt before. That first walk across the grounds wasn't just orientation — it was the quiet beginning of the best three years of my life.",
      images: [{ src:"/blog/sadak-clg.png", alt:"Sadakathullah Appa College campus front view", caption:"Sadakathullah Appa College — where it all began" }],
    },
    {
      heading: "💻 When the Screen Finally Made Sense",
      body: "Nobody tells you how satisfying it is when broken code suddenly works at 2 AM. The BCA curriculum wasn't gentle — late submissions, semester crunch, logic errors that made no sense — but every grind built something real. I wasn't just learning to code. I was learning how to think. By third year, problems that once paralysed me became puzzles I actually enjoyed.",
      images: [],
    },
    {
      heading: "🤝 The People Who Made It Unforgettable",
      body: "Here's what the syllabus never taught: friendship is its own kind of curriculum. Group studies that turned into midnight snack runs. Cultural fest rehearsals that went completely off-script. The inside jokes that still land over WhatsApp today. These three — the ones in this photo — walked every single step of this journey with me.",
      images: [{ src:"/blog/friend.jpeg", alt:"Abu and his two closest college friends", caption:"Three years, three of us — this photo says everything" }],
    },
    {
      heading: "🎓 The Moment I Realised It Was Over",
      body: "Walking across that stage to collect my degree, I expected to feel triumphant. Instead, I felt something quieter — a kind of grateful ache. Three years in one handshake. The hard nights, the exams, the friendships, the growth — all of it folded into a single certificate and a photograph. College didn't just give me a BCA. It gave me a blueprint for who I want to be.",
      images: [
        { src:"/blog/Graduation-Day.gif", alt:"Graduation Day ceremony", caption:"Graduation Day — the moment we'd worked three years for", isGif:true },
        { src:"/blog/gra-img.png", alt:"Graduation day collage", caption:"Gowns, grins, and something beautifully bittersweet" },
      ],
    },
  ],
  note: "Some chapters don't end — they just become the foundation everything else is built on. Sadakathullah Appa College is mine.",
}

function CollegeBlog({ onBack, liveViews, animIn }: { onBack:()=>void; liveViews:number; animIn:boolean }) {
  const b = COLLEGE
  return (
    <article
      className="max-w-[740px] mx-auto px-4 sm:px-5 pb-32 transition-all duration-500"
      style={{ opacity: animIn?1:0, transform: animIn?"translateY(0)":"translateY(24px)" }}
    >
      <BackBtn onClick={onBack}/>
      <header className="pb-8 sm:pb-10 border-b border-stone-200 dark:border-stone-800">
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">{b.subtitle}</span>
        <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.15] text-stone-900 dark:text-stone-50 tracking-tight mb-3 sm:mb-4">{b.title}</h1>
        <p className="font-serif italic text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-6 sm:mb-7">{b.summary}</p>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap font-sans">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300 shrink-0">A</div>
          <div className="text-xs sm:text-sm text-stone-400 dark:text-stone-500">
            <span className="text-stone-600 dark:text-stone-300 font-semibold">{b.author}</span>
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>{b.date}
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>{b.read_time}
          </div>
          <div className="ml-auto flex gap-1.5 sm:gap-2">
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1"><EyeIcon className="w-3 h-3"/>{liveViews}</span>
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full">{b.course}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-7">
          {[{label:"Institution",value:b.institution},{label:"Course",value:b.course},{label:"Duration",value:b.duration}].map(it=>(
            <div key={it.label} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-sans">
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-stone-300 dark:text-stone-600 mb-0.5 sm:mb-1">{it.label}</p>
              <p className="text-[11px] sm:text-[13px] font-semibold text-stone-700 dark:text-stone-300 leading-snug">{it.value}</p>
            </div>
          ))}
        </div>
      </header>

      {b.chapters.map((ch, i) => (
        <section key={i} className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
          <SLabel text={`Chapter ${String(i+1).padStart(2,"0")}`}/>
          <SHeading text={ch.heading}/>
          <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-6 sm:mb-7">{ch.body}</p>
          {ch.images.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              {ch.images.map((img,j) => <BlogImage key={j} {...(img as any)}/>)}
            </div>
          )}
        </section>
      ))}

      <blockquote className="mt-10 sm:mt-14 px-5 sm:px-7 py-5 sm:py-7 bg-white dark:bg-stone-900 rounded-xl sm:rounded-2xl border-l-[4px] border-l-blue-500 border border-stone-100 dark:border-stone-800">
        <p className="font-serif text-[16px] sm:text-[18px] italic text-stone-700 dark:text-stone-300 leading-[1.85]">"{b.note}"</p>
        <footer className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] text-stone-400 dark:text-stone-500 font-sans">— {b.author} · {b.institution}</footer>
      </blockquote>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TEACHING DATA + COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const TEACHING = {
  title: "The 6 AM Classroom That Changed Me",
  subtitle: "Teaching · Personal Story",
  author: "Abu", date: "28 Dec 2024", read_time: "5 min read", views: 203, schedule: "6:00 AM – 7:30 AM",
  summary: "Before the world woke up, I was already teaching. Here's how a one-hour morning routine quietly became the most meaningful part of my day.",
  s1: {
    label:"How it began", heading:"A college student who became a teacher",
    body:[
      "Most people my age were sleeping at 6 AM. I was already standing in front of a classroom — chalk in hand, students seated on the floor, the quiet morning air carrying the sound of Arabic recitation.",
      "It started during my first year at Sadakathullah Appa College. Someone needed a teacher for the local Madrasa. I stepped in — not because I had everything figured out, but because the children needed someone to show up. And I did, every single morning, for a year straight.",
    ],
    images:[
      { src:"/blog/teach-01.jpeg", alt:"Abu with young students inside the Madrasa classroom", caption:"First batch — young learners, big hearts" },
      { src:"/blog/teach-3.jpeg",  alt:"Abu sitting with small children during class",          caption:"The little ones always made class feel alive" },
    ],
  },
  s2: {
    label:"Inside the classroom", heading:"More than just Arabic — a life curriculum",
    intro:"People assume teaching Arabic is about letters and grammar. It is, but it's also so much more. Every morning lesson was a thread that connected language to character, scripture to everyday life.",
    lessons:[
      { icon:"📖", text:"How to read the Quran correctly — with tajweed, rhythm, and reverence" },
      { icon:"🕊️", text:"Stories from the life of Prophet Muhammad (SAW) and the wisdom inside them" },
      { icon:"🤲", text:"Facing hardships with patience — something my students taught back to me, honestly" },
      { icon:"🌙", text:"Practical Islamic values for navigating daily decisions and relationships" },
    ],
    closing:"The youngest students would sometimes forget the lesson and ask me completely unrelated questions. I'd answer every single one. That's where the real teaching happened — not in the textbook.",
    image:{ src:"/blog/teach-6.jpeg", alt:"Students sitting in a Quran study circle", caption:"The circle doesn't just teach — it builds community" },
  },
  s3: {
    label:"The journey", heading:"I left. Then I came back — and kept teaching.",
    intro:"Life moved fast after that first year. I finished college, packed my bags, and moved to Chennai for work. But something felt incomplete without the 6 AM classroom.",
    timeline:[
      { period:"2023–2024",           label:"College – Final Year",     body:"During my 3rd year of BCA, I taught students every morning from 6:00 to 7:30 AM. After teaching, I would get ready and attend college. I maintained this routine consistently for one full year.",    note:"Built discipline, consistency, and a passion for teaching." },
      { period:"July 2024",           label:"Chennai – Visa Executive", body:"Moved to Chennai and joined as a Visa Executive. Due to work commitments and a new environment, teaching was paused — but never forgotten.",                                                     note:"" },
      { period:"July 2025 – Present", label:"Home + kosal.io",          body:"Returned to my hometown and joined kosal.io as a Software Developer. Restarted teaching students every morning from 6:00 to 7:30 AM, then continued with my professional office work.",             note:"Balancing passion and profession — every single day." },
    ],
  },
  s4: {
    label:"Current students", heading:"The faces that make 6 AM worth it",
    body:"These are the students I teach today. Some are brand new — still learning the alphabet. Others have been coming for years. Each one shows up with a willingness to learn that honestly humbles me.",
    images:[
      { src:"/blog/teach-2.jpg",  alt:"Abu with a large group of madrasa students outdoors", caption:"The full class — outside on a good day" },
      { src:"/blog/teach-5.jpeg", alt:"Students studying Quran together",                    caption:"Every page turned is a step forward" },
      { src:"/blog/teach-6.jpeg", alt:"Evening study session with students in a circle",     caption:"Evening revision — the room is small, the energy is enormous" },
    ],
  },
  s5: {
    label:"Recognition", heading:"The moments that made it all feel real",
    intro:"Teaching isn't about trophies. But when your community acknowledges the work — it matters more than you expect.",
    images:[
      { src:"/blog/award-1.jpg", alt:"Abu receiving appreciation on stage", caption:"Guest appreciation — received from a respected elder" },
      { src:"/blog/award-2.jpg", alt:"Abu receiving a trophy",              caption:"Student performance award — watching students excel is the real prize" },
    ],
    items:[
      { icon:"🏅", title:"Guest Appreciation — Madrasa Annual Day", desc:"Honoured by a former police officer and a professional auditor. Their words were a reminder that education rooted in values is something the world still deeply respects." },
      { icon:"🎓", title:"Student Performance Recognition",          desc:"Watching students who once stumbled over letters stand confidently on stage — performing, reciting, smiling. As a teacher, this was the proudest moment of all." },
    ],
  },
  s6: {
    label:"What it taught me", heading:"The student who learned the most was me",
    intro:"I walked into that classroom thinking I was the teacher. Three years in, I know better. The children reshaped how I see discipline, patience, and purpose.",
    values:[
      { icon:"⏰", title:"Consistency over motivation",         desc:"Motivation fades. Showing up at 6 AM every day taught me that discipline is what actually moves the needle." },
      { icon:"💡", title:"Teaching deepens your own knowledge", desc:"Every question a student asked forced me to understand more clearly myself." },
      { icon:"🤲", title:"Kindness is a teaching method",       desc:"The students who struggled most needed patience first — and lesson plans second." },
    ],
  },
  closing:"I became a software developer by qualification. But teaching these children every morning — that's what keeps me grounded. Code compiles and deploys. But a child who learns to read the Quran for the first time? That echo lasts a lifetime.",
  closingAttr:"Abu · Tirunelveli",
}

function TeachingBlog({ onBack, liveViews, animIn }: { onBack:()=>void; liveViews:number; animIn:boolean }) {
  const t = TEACHING
  return (
    <article
      className="max-w-[740px] mx-auto px-4 sm:px-5 pb-32 transition-all duration-500"
      style={{ opacity: animIn?1:0, transform: animIn?"translateY(0)":"translateY(24px)" }}
    >
      <BackBtn onClick={onBack}/>
      <header className="pb-8 sm:pb-10 border-b border-stone-200 dark:border-stone-800">
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">{t.subtitle}</span>
        <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.15] text-stone-900 dark:text-stone-50 tracking-tight mb-3 sm:mb-4">{t.title}</h1>
        <p className="font-serif italic text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-6 sm:mb-7">{t.summary}</p>
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap font-sans">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 shrink-0">A</div>
          <div className="text-xs sm:text-sm text-stone-400 dark:text-stone-500">
            <span className="text-stone-600 dark:text-stone-300 font-semibold">{t.author}</span>
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>{t.date}
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>{t.read_time}
          </div>
          <div className="ml-auto flex gap-1.5 sm:gap-2">
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1"><EyeIcon className="w-3 h-3"/>{liveViews}</span>
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1"><ClockIcon className="w-3 h-3"/>{t.schedule}</span>
          </div>
        </div>
      </header>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s1.label}/><SHeading text={t.s1.heading}/>
        {t.s1.body.map((p,i) => <p key={i} className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-4">{p}</p>)}
        <div className="flex flex-col gap-3 sm:gap-4 mt-5 sm:mt-6">
          {t.s1.images.map((img,i) => <BlogImage key={i} {...img}/>)}
        </div>
      </section>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s2.label}/><SHeading text={t.s2.heading}/>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5">{t.s2.intro}</p>
        <ul className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          {t.s2.lessons.map((l,i) => (
            <li key={i} className="flex items-start gap-3 bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
              <span className="text-lg sm:text-xl mt-0.5 shrink-0">{l.icon}</span>
              <span className="text-[14px] sm:text-[15px] text-stone-600 dark:text-stone-400 leading-relaxed">{l.text}</span>
            </li>
          ))}
        </ul>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] italic font-serif mb-6 sm:mb-7">"{t.s2.closing}"</p>
        <BlogImage {...t.s2.image}/>
      </section>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s3.label}/><SHeading text={t.s3.heading}/>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-7 sm:mb-8">{t.s3.intro}</p>
        <div className="flex flex-col gap-6 sm:gap-7">
          {t.s3.timeline.map((item,i) => (
            <div key={i} className="relative pl-7 sm:pl-8">
              <span className="absolute left-0 top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-[#faf9f6] dark:border-stone-950 z-10"/>
              {i < t.s3.timeline.length-1 && <span className="absolute left-[4px] sm:left-[5px] top-4 bottom-0 w-[2px] bg-emerald-100 dark:bg-emerald-900/40"/>}
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-1 font-sans">{item.period} · {item.label}</p>
              <p className="text-[14px] sm:text-[15px] text-stone-500 dark:text-stone-400 leading-relaxed">{item.body}</p>
              {item.note && <p className="mt-1 text-[14px] sm:text-[15px] italic text-stone-800 dark:text-stone-300 font-serif">{item.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s4.label}/><SHeading text={t.s4.heading}/>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">{t.s4.body}</p>
        <div className="flex flex-col gap-3 sm:gap-4">
          {t.s4.images.map((img,i) => <BlogImage key={i} {...img}/>)}
        </div>
      </section>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s5.label}/><SHeading text={t.s5.heading}/>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">{t.s5.intro}</p>
        <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6">
          {t.s5.images.map((img,i) => <BlogImage key={i} {...img}/>)}
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          {t.s5.items.map((a,i) => (
            <div key={i} className="flex gap-3 sm:gap-4 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <span className="text-xl sm:text-2xl shrink-0 mt-0.5">{a.icon}</span>
              <div>
                <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-stone-800 dark:text-stone-200 mb-1 sm:mb-1.5">{a.title}</h3>
                <p className="text-[13px] sm:text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
        <SLabel text={t.s6.label}/><SHeading text={t.s6.heading}/>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">{t.s6.intro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {t.s6.values.map((v,i) => (
            <div key={i} className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <span className="text-xl sm:text-2xl block mb-2 sm:mb-3">{v.icon}</span>
              <p className="font-semibold text-[13px] sm:text-[14px] text-stone-800 dark:text-stone-200 mb-1 sm:mb-1.5 font-sans">{v.title}</p>
              <p className="text-[12px] sm:text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <blockquote className="mt-10 sm:mt-14 px-5 sm:px-7 py-5 sm:py-7 bg-white dark:bg-stone-900 rounded-xl sm:rounded-2xl border-l-[4px] border-l-emerald-500 border border-stone-100 dark:border-stone-800">
        <p className="font-serif text-[16px] sm:text-[18px] italic text-stone-700 dark:text-stone-300 leading-[1.85]">"{t.closing}"</p>
        <footer className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] text-stone-400 dark:text-stone-500 font-sans">— {t.closingAttr}</footer>
      </blockquote>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG LIST  (with themed hero)
// ─────────────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "college" as ViewMode,
    tag: "Personal Story",
    tagColor: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
    accent: "bg-blue-500", border: "hover:border-blue-200 dark:hover:border-blue-800",
    title: "Three Years That Changed Everything",
    summary: "I walked into Sadakathullah Appa College not knowing who I'd become. Here's what I left with — and why those 1,095 days were worth every sleepless night.",
    date: "November 2024", read_time: "5 min read",
  },
  {
    id: "teaching" as ViewMode,
    tag: "Teaching",
    tagColor: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
    accent: "bg-emerald-500", border: "hover:border-emerald-200 dark:hover:border-emerald-800",
    title: "The 6 AM Classroom That Changed Me",
    summary: "Before the world woke up, I was already teaching. How a morning routine became the most meaningful part of my day.",
    date: "28 Dec 2024", read_time: "5 min read",
  },
]

function BlogList({
  onSelect, collegeViews, teachingViews, animIn, isDark,
}: {
  onSelect:(v:ViewMode)=>void; collegeViews:number; teachingViews:number; animIn:boolean; isDark:boolean
}) {
  const counts = { college: collegeViews, teaching: teachingViews }

  return (
    <div>
      {/* ── HERO: silk (dark) or gradient+noise (light) ── */}
      <div className="relative h-[38vh] sm:h-[45vh] md:h-[52vh] overflow-hidden">
        <HeroBackground isDark={isDark}/>

        {/* Fade edge to page background */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#faf9f6] dark:from-stone-950 to-transparent z-10"/>

        {/* Hero copy */}
        <div
          className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
          style={{
            opacity: animIn ? 1 : 0,
            transform: animIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .8s ease, transform .8s ease",
          }}
        >
          <p
            className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4 font-sans"
            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.75)" }}
          >
            Abu's Writing
          </p>
          <h1
            className="font-serif font-light tracking-[-0.04em] leading-none mb-4 sm:mb-5"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              color: isDark ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)",
              textShadow: isDark
                ? "0 0 40px rgba(255,255,255,0.1)"
                : "0 2px 20px rgba(0,0,0,0.18)",
            }}
          >
            Stories
          </h1>
          <p
            className="font-serif italic text-sm sm:text-base md:text-lg max-w-sm sm:max-w-md"
            style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.75)" }}
          >
            Real moments — from college corridors to early morning classrooms.
          </p>
        </div>
      </div>

      {/* ── CARDS ── */}
      <div className="max-w-[740px] mx-auto px-4 sm:px-5 pb-32 pt-6 sm:pt-8">
        <div
          className="flex items-center gap-2 mb-6 sm:mb-8"
          style={{ opacity: animIn?1:0, transform: animIn?"none":"translateY(12px)", transition:"opacity .6s .3s ease, transform .6s .3s ease" }}
        >
          <BookOpenIcon className="w-4 h-4 text-stone-400 dark:text-stone-500"/>
          <span className="text-sm font-medium text-stone-400 dark:text-stone-500 font-sans tracking-wide">2 stories</span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          {CARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => onSelect(card.id)}
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
                  <span className={`text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full font-sans ${card.tagColor}`}>{card.tag}</span>
                  <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500 font-sans shrink-0 mt-1"><EyeIcon className="w-3 h-3"/>{counts[card.id as keyof typeof counts]}</span>
                </div>
                <h2 className="font-serif text-[18px] sm:text-[21px] md:text-[23px] font-bold text-stone-900 dark:text-stone-50 leading-snug mb-1.5 sm:mb-2 group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">{card.title}</h2>
                <p className="text-[13px] sm:text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed mb-4 sm:mb-5 font-sans">{card.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-stone-400 dark:text-stone-500 font-sans">
                    <span>{card.date}</span>
                    <span className="text-stone-200 dark:text-stone-700">·</span>
                    <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3"/>{card.read_time}</span>
                  </div>
                  <span className="text-xs text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300 font-sans transition-colors">Read →</span>
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
  useEffect(() => {
    const key = `blog_views_${blogId}`
    const n   = (parseInt(localStorage.getItem(key) ?? String(init)) || init) + 1
    localStorage.setItem(key, String(n))
    setViews(n)
  }, [blogId, init])
  return views
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [view,   setView]   = useState<ViewMode>("list")
  const [animIn, setAnimIn] = useState(false)
  const { theme }           = useTheme()
  const isDark              = theme === "dark"

  const collegeViews  = useViewCounter("college",  269)
  const teachingViews = useViewCounter("teaching", 300)

  useEffect(() => {
    setAnimIn(false)
    const t = setTimeout(() => setAnimIn(true), 60)
    return () => clearTimeout(t)
  }, [view])

  const go   = useCallback((v: ViewMode) => {
    setAnimIn(false)
    setTimeout(() => { setView(v); window.scrollTo({ top:0, behavior:"smooth" }) }, 200)
  }, [])
  const back = useCallback(() => go("list"), [go])

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-stone-950 transition-colors duration-200">

      {view === "list" && (
        <BlogList
          onSelect={go}
          collegeViews={collegeViews}
          teachingViews={teachingViews}
          animIn={animIn}
          isDark={isDark}
        />
      )}

      {view === "college" && (
        <div className="pt-10 sm:pt-12">
          <CollegeBlog onBack={back} liveViews={collegeViews} animIn={animIn}/>
        </div>
      )}

      {view === "teaching" && (
        <div className="pt-10 sm:pt-12">
          <TeachingBlog onBack={back} liveViews={teachingViews} animIn={animIn}/>
        </div>
      )}

      {/* Fixed Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto scale-90 sm:scale-100 origin-bottom transition-transform">
          <DockNav/>
        </div>
      </div>

    </div>
  )
}