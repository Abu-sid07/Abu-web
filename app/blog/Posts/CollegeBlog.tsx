"use client"

// path: app/blog/posts/CollegeBlog.tsx
// ─── Blog Post: "Three Years That Changed Everything" ────────────────────────
// To add this blog to the listing page:
//   1. Import CollegeBlog and COLLEGE_CARD from this file
//   2. Push COLLEGE_CARD into the CARDS array in page.tsx
//   3. Add <CollegeBlog /> to the view switch in BlogPageContent

import { EyeIcon } from "lucide-react"
import { BackBtn, BlogImg, ClosingQuote, PostSection, SHeading, SLabel } from "../blog-ui"

// ── Data ─────────────────────────────────────────────────────────────────────

const DATA = {
  title: "Three Years That Changed Everything",
  subtitle: "Personal Story · College",
  author: "Abu",
  date: "November 2024",
  read_time: "5 min read",
  views: 473,
  institution: "Sadakathullah Appa College",
  course: "BCA",
  duration: "2021 to 2024",
  summary:
    "I walked into Sadakathullah Appa College not knowing who I'd become. Here's what I left with — and why those 1,095 days were worth every sleepless night.",
  chapters: [
    {
      heading: "🌱 The Day Everything Felt Possible",
      body: "I still remember standing at the college gate on day one — backpack too heavy, directions unclear, heart pounding. The campus stretched out like a world I hadn't earned yet. New faces everywhere. New rules. New version of me. The mix of terror and excitement was something I'd never felt before. That first walk across the grounds wasn't just orientation — it was the quiet beginning of the best three years of my life.",
      images: [
        {
          src: "/blog/sadak-clg.png",
          alt: "Sadakathullah Appa College campus front view",
          caption: "Sadakathullah Appa College — where it all began",
        },
      ],
    },
    {
      heading: "💻 When the Screen Finally Made Sense",
      body: "Nobody tells you how satisfying it is when broken code suddenly works at 2 AM. The BCA curriculum wasn't gentle — late submissions, semester crunch, logic errors that made no sense — but every grind built something real. I wasn't just learning to code. I was learning how to think. By third year, problems that once paralysed me became puzzles I actually enjoyed.",
      images: [],
    },
    {
      heading: "🤝 The People Who Made It Unforgettable",
      body: "Here's what the syllabus never taught: friendship is its own kind of curriculum. Group studies that turned into midnight snack runs. Cultural fest rehearsals that went completely off-script. The inside jokes that still land over WhatsApp today. These three — the ones in this photo — walked every single step of this journey with me.",
      images: [
        {
          src: "/blog/friend.jpeg",
          alt: "Abu and his two closest college friends",
          caption: "Three years, three of us — this photo says everything",
        },
      ],
    },
    {
      heading: "🎓 The Moment I Realised It Was Over",
      body: "Walking across that stage to collect my degree, I expected to feel triumphant. Instead, I felt something quieter — a kind of grateful ache. Three years in one handshake. The hard nights, the exams, the friendships, the growth — all of it folded into a single certificate and a photograph. College didn't just give me a BCA. It gave me a blueprint for who I want to be.",
      images: [
        {
          src: "/blog/Graduation-Day.gif",
          alt: "Graduation Day ceremony",
          caption: "Graduation Day — the moment we'd worked three years for",
          isGif: true,
        },
        {
          src: "/blog/gra-img.png",
          alt: "Graduation day collage",
          caption: "Gowns, grins, and something beautifully bittersweet",
        },
      ],
    },
  ],
  closingQuote:
    "Some chapters don't end — they just become the foundation everything else is built on. Sadakathullah Appa College is mine.",
}

// ── Card config (used by the listing page) ───────────────────────────────────

export const COLLEGE_CARD = {
  id: "college" as const,
  tag: "Personal Story",
  tagColor: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  accent: "bg-blue-500",
  border: "hover:border-blue-200 dark:hover:border-blue-800",
  title: DATA.title,
  summary: DATA.summary,
  date: DATA.date,
  read_time: DATA.read_time,
  initialViews: DATA.views,
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CollegeBlog({
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
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs sm:text-sm font-bold text-blue-700 dark:text-blue-300 shrink-0">
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
              {DATA.course}
            </span>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5 sm:mt-7">
          {[
            { label: "Institution", value: DATA.institution },
            { label: "Course",      value: DATA.course },
            { label: "Duration",    value: DATA.duration },
          ].map((it) => (
            <div
              key={it.label}
              className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 font-sans"
            >
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-stone-300 dark:text-stone-600 mb-0.5 sm:mb-1">
                {it.label}
              </p>
              <p className="text-[11px] sm:text-[13px] font-semibold text-stone-700 dark:text-stone-300 leading-snug">
                {it.value}
              </p>
            </div>
          ))}
        </div>
      </header>

      {/* Chapters */}
      {DATA.chapters.map((ch, i) => (
        <PostSection key={i}>
          <SLabel text={`Chapter ${String(i + 1).padStart(2, "0")}`} />
          <SHeading text={ch.heading} />
          <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-6 sm:mb-7">
            {ch.body}
          </p>
          {ch.images.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              {ch.images.map((img, j) => (
                <BlogImg key={j} {...(img as any)} />
              ))}
            </div>
          )}
        </PostSection>
      ))}

      <ClosingQuote
        text={DATA.closingQuote}
        author={`${DATA.author} · ${DATA.institution}`}
        accentColor="border-l-blue-500"
      />
    </article>
  )
}
