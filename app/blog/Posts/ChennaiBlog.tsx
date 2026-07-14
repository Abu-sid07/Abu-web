"use client"

// path: app/blog/posts/ChennaiBlog.tsx
// ─── Blog Post: "The Journey of Faith – The Beginning in Chennai" ─────────────
// To add this blog to the listing page:
//   1. Import ChennaiBlog and CHENNAI_CARD from this file
//   2. Push CHENNAI_CARD into the CARDS array in page.tsx
//   3. Add <ChennaiBlog /> to the view switch in BlogPageContent

import { EyeIcon } from "lucide-react"
import { BackBtn, BlogImg, ClosingQuote, PostSection, SHeading, SLabel } from "../blog-ui"

// ── Data ─────────────────────────────────────────────────────────────────────

const DATA = {
  title: "The Journey of Faith – The Beginning in Chennai",
  subtitle: "Career · Personal Story",
  author: "Abu",
  date: "June 2025",
  read_time: "4 min read",
  views: 407,
  summary:
    "I arrived in Chennai with a BCA degree and a software dream. What followed was a year of early mornings, midnight coursework, and a bicycle ride I'll never forget.",

  chapters: [
    {
      label: "Chapter 01",
      heading: "July 2024 – Arriving with a Dream",
      body: "I came to Chennai carrying my BCA degree and one clear goal — to work in the software industry. But reality hit fast. Days passed, then weeks, and the software job I had dreamed about wasn't coming easily. Rejections are never easy, but I refused to sit still. Instead of waiting, I started looking at every door that was open — even if it wasn't the one I had originally planned to walk through.",
      images: [
        {
          src: "/blog/chennai-arrival.png",
          alt: "Abu with his BCA certificate, looking hopeful and determined",
          caption: "Arrived with a degree, a dream, and a lot to prove",
        },
      ],
    },
    {
      label: "Chapter 02",
      heading: "5:00 AM — The Day Starts with Prayer",
      body: "Before anything else — before the city woke up, before the office opened — I prayed. Every single morning at 5:00 AM. That quiet moment before the day began was the anchor that kept everything else in place. It wasn't just a habit. It was a reminder of why I was doing all of this.",
      images: [],
    },
    {
      label: "Chapter 03",
      heading: "7:00 AM — The Gym Before the Grind",
      body: "After Fajr, I hit the gym from 7:00 to 8:30 AM. While others were still in bed, I was already pushing through reps. The discipline I built in that gym every morning quietly carried over into everything else — the late-night studying, the hard days at the office, the moments I wanted to give up.",
      images: [
        {
          src: "/blog/gym.png",
          alt: "Abu at the gym during his morning workout",
          caption: "7:00 AM — the gym before the grind",
        },
      ],
    },
   {
      label: "Chapter 04",
      heading: "My Start as a Junior Frontend Developer",
      body: "That's when I took my first steps into the tech world as a Junior Frontend Developer. I balanced my daily routines with the responsibility of managing the agency's digital operations. I didn't just handle visa applications; I began optimizing them. It wasn't my ultimate destination — but I approached every task with the focus of a developer, learning to build and maintain digital systems from the ground up.",
      images: [
        {
          src: "/blog/visa-office.jpeg",
          alt: "Abu at his workstation, coding and managing digital tools",
          caption: "Every morning, the office opened — and so did my journey into development",
        },
      ],
    },
    {
      label: "Chapter 05",
      heading: "Automating and Growing",
      body: "During this time, I dove deep into web technologies and CRM tools. My focus on digitizing manual workflows didn't go unnoticed — within six months, I was taking on more technical responsibilities as a lead for our digital portals. I continued in this hybrid role for a year, bridging the gap between operations and frontend development. While I was delivering results for the agency, my passion for building web applications was growing stronger every day.",
      images: [
        {
          src: "/blog/promotion.jpg",
          alt: "A display of digital projects or a professional workspace, representing growth",
          caption: "Six months in — moving from manual tasks to digital solutions. The growth was real.",
        },
      ],
    },
    {
      label: "Chapter 06",
      heading: "A Step Closer to My Dream",
      body: "The software dream wouldn't let me rest. So I enrolled in an intense MERN Full Stack course — office by day, coursework by night. Some days I caught the bus. On Sundays, when no bus pass was available, I cycled a long distance just to attend class. No shortcut, no excuse. I completed the course. With new skills in hand and one year of real work experience behind me — I was ready. A big change was right around the corner.",
      images: [
        {
          src: "/blog/night-study.jpeg",
          alt: "Abu studying late at night or on a bus with his laptop and notes",
          caption: "Office by day, MERN stack by night — no days off",
        },
      ],
    },
  ],

  closingQuote:
    "Some people wait for the right opportunity. I decided to build the skills while waiting — so when the door finally opened, I was ready to walk through it.",
}

// ── Card config (used by the listing page) ───────────────────────────────────

export const CHENNAI_CARD = {
  id: "chennai" as const,
  tag: "Career Story",
  tagColor: "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300",
  accent: "bg-orange-500",
  border: "hover:border-orange-200 dark:hover:border-orange-800",
  title: DATA.title,
  summary: DATA.summary,
  date: DATA.date,
  read_time: DATA.read_time,
  initialViews: DATA.views,
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ChennaiBlog({
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
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 shrink-0">
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
              Chennai
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
        author={`${DATA.author} · Chennai`}
        accentColor="border-l-orange-500"
      />
    </article>
  )
}