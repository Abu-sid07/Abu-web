"use client"

// path: app/blog/posts/KosalBlog.tsx
// ─── Blog Post: "My Journey: From Visa Work to Software Development" ──────────
// To add this blog to the listing page:
//   1. Import KosalBlog and KOSAL_CARD from this file
//   2. Push KOSAL_CARD into the CARDS array in page.tsx
//   3. Add <KosalBlog /> to the view switch in BlogPageContent

import { EyeIcon } from "lucide-react"
import { BackBtn, BlogImg, ClosingQuote, PostSection, SHeading, SLabel } from "../blog-ui"

// ── Data ─────────────────────────────────────────────────────────────────────

const DATA = {
  title: "My Journey: From Visa Work to Software Development",
  subtitle: "Career · Kosal.io",
  author: "Abu",
  date: "June 2025",
  read_time: "4 min read",
  views: 434,
  summary:
    "After a year of grinding in Chennai, one phone call from a friend changed everything. Here's how I finally walked into the software career I'd been building toward all along.",

  chapters: [
    {
      label: "Chapter 01",
      heading: "Late June 2025 – A Big Change",
      body: "I was living in Chennai, working as a Visa Executive — handling passports, stamping documents, and managing visa files every single day. It was a fast-paced job, and I gave it my best. But deep inside, I always knew where I truly wanted to be: in front of a laptop, writing code. So while working full-time, I quietly completed my MERN Full Stack course on the side. One day, my college friend Gouse called me with exciting news — he was heading to an interview at a new company.",
      images: [
        {
          src: "/blog/laptop-work.jpg",
          alt: "Abu working on his laptop with a focused look",
          caption: "The moment I knew the grind was about to pay off",
        },
      ],
    },
    {
      label: "Chapter 02",
      heading: "A Helping Hand",
      body: "Gouse got the job! I was genuinely happy for him. A few days later, I took a chance and asked him, 'Bro, can you put in a word for me there?' Because I had already finished my full stack course and was ready for a real switch, his recommendation opened the door. I went for the interview — and I got it. Just like that, two college friends were about to work under the same roof again.",
      images: [
        {
          src: "/blog/gouse-abu.jpg",
          alt: "Abu and Gouse together, looking happy and professional",
          caption: "From college to colleagues — the circle came full circle",
        },
      ],
    },
    {
      label: "Chapter 03",
      heading: "Working with My Best Friend",
      body: "There's something special about working alongside someone who has known you since college. At Kosal.io in Tirunelveli, Gouse and I sat at the same desk as Front-End Developers, debugging code, building features, and brainstorming together. We even created tech content for Instagram — writing scripts, shooting reels, and growing an audience. From sharing notes in college to sharing a workspace in a real company, it felt like the journey had come full circle.",
      images: [
        {
          src: "/blog/two-laptops.jpg",
          alt: "Two laptops on a desk, representing teamwork",
          caption: "Same desk, same mission — two developers building things together",
        },
      ],
    },
    {
      label: "Chapter 04",
      heading: "What Comes Next?",
      body: "One year as a developer at Kosal.io has taught me more than I ever expected — not just about code, but about collaboration, content creation, and what I'm truly capable of. But I'm not stopping here. My next big step in this career is already taking shape, and I'm excited to take it. The road ahead looks bright.",
      images: [
        {
          src: "/blog/road-ahead.jpg",
          alt: "A sunrise or a road leading forward, representing a new beginning",
          caption: "The road doesn't end here — it's just getting started",
        },
      ],
    },
  ],

  closingQuote:
    "It took one year, one friend, and one phone call to change the direction of everything. Sometimes the right door opens not when you force it — but when you've quietly done the work to deserve it.",
}

// ── Card config (used by the listing page) ───────────────────────────────────

export const KOSAL_CARD = {
  id: "kosal" as const,
  tag: "Career Story",
  tagColor: "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300",
  accent: "bg-violet-500",
  border: "hover:border-violet-200 dark:hover:border-violet-800",
  title: DATA.title,
  summary: DATA.summary,
  date: DATA.date,
  read_time: DATA.read_time,
  initialViews: DATA.views,
}

// ── Component ─────────────────────────────────────────────────────────────────

export function KosalBlog({
  onBack,
  liveViews,
  animIn,
}: {
  onBack: () => void
  liveViews: number
  animIn: boolean
}) {
  return (
    <article
      className="max-w-[740px] mx-auto px-4 sm:px-5 pb-32 transition-all duration-500"
      style={{
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <BackBtn onClick={onBack} />

      {/* Header */}
      <header className="pb-8 sm:pb-10 border-b border-stone-200 dark:border-stone-800">
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
          {DATA.subtitle}
        </span>
        <h1 className="font-serif text-[28px] sm:text-[36px] md:text-[44px] font-bold leading-[1.15] text-stone-900 dark:text-stone-50 tracking-tight mb-3 sm:mb-4">
          {DATA.title}
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-6 sm:mb-7">
          {DATA.summary}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap font-sans">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-xs sm:text-sm font-bold text-violet-700 dark:text-violet-300 shrink-0">
            A
          </div>
          <div className="text-xs sm:text-sm text-stone-400 dark:text-stone-500">
            <span className="text-stone-600 dark:text-stone-300 font-semibold">{DATA.author}</span>
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>
            {DATA.date}
            <span className="mx-1 sm:mx-1.5 text-stone-300 dark:text-stone-700">·</span>
            {DATA.read_time}
          </div>
          <div className="ml-auto flex gap-1.5 sm:gap-2">
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
              <EyeIcon className="w-3 h-3" />
              {liveViews}
            </span>
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full">
              Kosal.io
            </span>
          </div>
        </div>
      </header>

      {/* Chapters */}
      {DATA.chapters.map((ch, i) => (
        <PostSection key={i}>
          <SLabel text={ch.label} />
          <SHeading text={ch.heading} />
          <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-6 sm:mb-7">
            {ch.body}
          </p>
          {ch.images.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              {ch.images.map((img, j) => (
                <BlogImg key={j} {...img} />
              ))}
            </div>
          )}
        </PostSection>
      ))}

      <ClosingQuote
        text={DATA.closingQuote}
        author={`${DATA.author} · Kosal.io`}
        accentColor="border-l-violet-500"
      />
    </article>
  )
}
