"use client"

// path: app/blog/posts/TeachingBlog.tsx
// ─── Blog Post: "The 6 AM Classroom That Changed Me" ─────────────────────────
// To add this blog to the listing page:
//   1. Import TeachingBlog and TEACHING_CARD from this file
//   2. Push TEACHING_CARD into the CARDS array in page.tsx
//   3. Add <TeachingBlog /> to the view switch in BlogPageContent

import { ClockIcon, EyeIcon } from "lucide-react"
import { BackBtn, BlogImg, ClosingQuote, PostSection, SHeading, SLabel } from "../blog-ui"

// ── Data ─────────────────────────────────────────────────────────────────────

const DATA = {
  title: "The 6 AM Classroom That Changed Me",
  subtitle: "Teaching · Personal Story",
  author: "Abu",
  date: "28 Dec 2024",
  read_time: "5 min read",
  views: 568,
  schedule: "6:00 AM – 7:30 AM",
  summary:
    "Before the world woke up, I was already teaching. Here's how a one-hour morning routine quietly became the most meaningful part of my day.",

  s1: {
    label: "How it began",
    heading: "A college student who became a teacher",
    body: [
      "Most people my age were sleeping at 6 AM. I was already standing in front of a classroom — chalk in hand, students seated on the floor, the quiet morning air carrying the sound of Arabic recitation.",
      "It started during my first year at Sadakathullah Appa College. Someone needed a teacher for the local Madrasa. I stepped in — not because I had everything figured out, but because the children needed someone to show up. And I did, every single morning, for a year straight.",
    ],
    images: [
      { src: "/blog/teach-01.jpeg", alt: "Abu with young students inside the Madrasa classroom", caption: "First batch — young learners, big hearts" },
      { src: "/blog/teach-3.jpeg",  alt: "Abu sitting with small children during class",          caption: "The little ones always made class feel alive" },
    ],
  },

  s2: {
    label: "Inside the classroom",
    heading: "More than just Arabic — a life curriculum",
    intro:
      "People assume teaching Arabic is about letters and grammar. It is, but it's also so much more. Every morning lesson was a thread that connected language to character, scripture to everyday life.",
    lessons: [
      { icon: "📖", text: "How to read the Quran correctly — with tajweed, rhythm, and reverence" },
      { icon: "🕊️", text: "Stories from the life of Prophet Muhammad (SAW) and the wisdom inside them" },
      { icon: "🤲", text: "Facing hardships with patience — something my students taught back to me, honestly" },
      { icon: "🌙", text: "Practical Islamic values for navigating daily decisions and relationships" },
    ],
    closing:
      "The youngest students would sometimes forget the lesson and ask me completely unrelated questions. I'd answer every single one. That's where the real teaching happened — not in the textbook.",
    image: { src: "/blog/teach-6.jpeg", alt: "Students sitting in a Quran study circle", caption: "The circle doesn't just teach — it builds community" },
  },

  s3: {
    label: "The journey",
    heading: "I left. Then I came back — and kept teaching.",
    intro:
      "Life moved fast after that first year. I finished college, packed my bags, and moved to Chennai for work. But something felt incomplete without the 6 AM classroom.",
    timeline: [
      {
        period: "2023–2024",
        label: "College – Final Year",
        body: "During my 3rd year of BCA, I taught students every morning from 6:00 to 7:30 AM. After teaching, I would get ready and attend college. I maintained this routine consistently for one full year.",
        note: "Built discipline, consistency, and a passion for teaching.",
      },
      {
        period: "July 2024",
        label: "Chennai – Visa Executive",
        body: "Moved to Chennai and joined as a Visa Executive. Due to work commitments and a new environment, teaching was paused — but never forgotten.",
        note: "",
      },
      {
        period: "July 2025 – Present",
        label: "Home + Kosal.io",
        body: "Returned to my hometown and joined Kosal.io as a Software Developer. Restarted teaching students every morning from 6:00 to 7:30 AM, then continued with my professional office work.",
        note: "Balancing passion and profession — every single day.",
      },
    ],
  },

  s4: {
    label: "Current students",
    heading: "The faces that make 6 AM worth it",
    body: "These are the students I teach today. Some are brand new — still learning the alphabet. Others have been coming for years. Each one shows up with a willingness to learn that honestly humbles me.",
    images: [
      { src: "/blog/teach-2.jpg",  alt: "Abu with a large group of madrasa students outdoors", caption: "The full class — outside on a good day" },
      { src: "/blog/teach-5.jpeg", alt: "Students studying Quran together",                    caption: "Every page turned is a step forward" },
      { src: "/blog/teach-6.jpeg", alt: "Evening study session with students in a circle",     caption: "Evening revision — the room is small, the energy is enormous" },
    ],
  },

  s5: {
    label: "Recognition",
    heading: "The moments that made it all feel real",
    intro: "Teaching isn't about trophies. But when your community acknowledges the work — it matters more than you expect.",
    images: [
      { src: "/blog/award-1.jpg", alt: "Abu receiving appreciation on stage", caption: "Guest appreciation — received from a respected elder" },
      { src: "/blog/Award-2.jpg", alt: "Abu receiving a trophy",              caption: "Student performance award — watching students excel is the real prize" },
    ],
    items: [
      {
        icon: "🏅",
        title: "Guest Appreciation — Madrasa Annual Day",
        desc: "Honoured by a former police officer and a professional auditor. Their words were a reminder that education rooted in values is something the world still deeply respects.",
      },
      {
        icon: "🎓",
        title: "Student Performance Recognition",
        desc: "Watching students who once stumbled over letters stand confidently on stage — performing, reciting, smiling. As a teacher, this was the proudest moment of all.",
      },
    ],
  },

  s6: {
    label: "What it taught me",
    heading: "The student who learned the most was me",
    intro:
      "I walked into that classroom thinking I was the teacher. Three years in, I know better. The children reshaped how I see discipline, patience, and purpose.",
    values: [
      { icon: "⏰", title: "Consistency over motivation",         desc: "Motivation fades. Showing up at 6 AM every day taught me that discipline is what actually moves the needle." },
      { icon: "💡", title: "Teaching deepens your own knowledge", desc: "Every question a student asked forced me to understand more clearly myself." },
      { icon: "🤲", title: "Kindness is a teaching method",       desc: "The students who struggled most needed patience first — and lesson plans second." },
    ],
  },

  closingQuote:
    "I became a software developer by qualification. But teaching these children every morning — that's what keeps me grounded. Code compiles and deploys. But a child who learns to read the Quran for the first time? That echo lasts a lifetime.",
}

// ── Card config (used by the listing page) ───────────────────────────────────

export const TEACHING_CARD = {
  id: "teaching" as const,
  tag: "Teaching",
  tagColor: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300",
  accent: "bg-emerald-500",
  border: "hover:border-emerald-200 dark:hover:border-emerald-800",
  title: DATA.title,
  summary: DATA.summary,
  date: DATA.date,
  read_time: DATA.read_time,
  initialViews: DATA.views,
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TeachingBlog({
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
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
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
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {DATA.schedule}
            </span>
          </div>
        </div>
      </header>

      {/* S1 — How it began */}
      <PostSection>
        <SLabel text={DATA.s1.label} />
        <SHeading text={DATA.s1.heading} />
        {DATA.s1.body.map((p, i) => (
          <p key={i} className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-4">
            {p}
          </p>
        ))}
        <div className="flex flex-col gap-3 sm:gap-4 mt-5 sm:mt-6">
          {DATA.s1.images.map((img, i) => <BlogImg key={i} {...img} />)}
        </div>
      </PostSection>

      {/* S2 — Inside the classroom */}
      <PostSection>
        <SLabel text={DATA.s2.label} />
        <SHeading text={DATA.s2.heading} />
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5">
          {DATA.s2.intro}
        </p>
        <ul className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          {DATA.s2.lessons.map((l, i) => (
            <li
              key={i}
              className="flex items-start gap-3 bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3"
            >
              <span className="text-lg sm:text-xl mt-0.5 shrink-0">{l.icon}</span>
              <span className="text-[14px] sm:text-[15px] text-stone-600 dark:text-stone-400 leading-relaxed">
                {l.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] italic font-serif mb-6 sm:mb-7">
          "{DATA.s2.closing}"
        </p>
        <BlogImg {...DATA.s2.image} />
      </PostSection>

      {/* S3 — Timeline */}
      <PostSection>
        <SLabel text={DATA.s3.label} />
        <SHeading text={DATA.s3.heading} />
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-7 sm:mb-8">
          {DATA.s3.intro}
        </p>
        <div className="flex flex-col gap-6 sm:gap-7">
          {DATA.s3.timeline.map((item, i) => (
            <div key={i} className="relative pl-7 sm:pl-8">
              <span className="absolute left-0 top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-[#faf9f6] dark:border-stone-950 z-10" />
              {i < DATA.s3.timeline.length - 1 && (
                <span className="absolute left-[4px] sm:left-[5px] top-4 bottom-0 w-[2px] bg-emerald-100 dark:bg-emerald-900/40" />
              )}
              <p className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-1 font-sans">
                {item.period} · {item.label}
              </p>
              <p className="text-[14px] sm:text-[15px] text-stone-500 dark:text-stone-400 leading-relaxed">
                {item.body}
              </p>
              {item.note && (
                <p className="mt-1 text-[14px] sm:text-[15px] italic text-stone-800 dark:text-stone-300 font-serif">
                  {item.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </PostSection>

      {/* S4 — Current students */}
      <PostSection>
        <SLabel text={DATA.s4.label} />
        <SHeading text={DATA.s4.heading} />
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">
          {DATA.s4.body}
        </p>
        <div className="flex flex-col gap-3 sm:gap-4">
          {DATA.s4.images.map((img, i) => <BlogImg key={i} {...img} />)}
        </div>
      </PostSection>

      {/* S5 — Recognition */}
      <PostSection>
        <SLabel text={DATA.s5.label} />
        <SHeading text={DATA.s5.heading} />
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">
          {DATA.s5.intro}
        </p>
        <div className="flex flex-col gap-3 sm:gap-4 mb-5 sm:mb-6">
          {DATA.s5.images.map((img, i) => <BlogImg key={i} {...img} />)}
        </div>
        <div className="flex flex-col gap-3 sm:gap-4">
          {DATA.s5.items.map((a, i) => (
            <div
              key={i}
              className="flex gap-3 sm:gap-4 bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >
              <span className="text-xl sm:text-2xl shrink-0 mt-0.5">{a.icon}</span>
              <div>
                <h3 className="font-serif text-[15px] sm:text-[16px] font-bold text-stone-800 dark:text-stone-200 mb-1 sm:mb-1.5">
                  {a.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PostSection>

      {/* S6 — What it taught me */}
      <PostSection>
        <SLabel text={DATA.s6.label} />
        <SHeading text={DATA.s6.heading} />
        <p className="text-[15px] sm:text-[16px] text-stone-500 dark:text-stone-400 leading-[1.9] mb-5 sm:mb-6">
          {DATA.s6.intro}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {DATA.s6.values.map((v, i) => (
            <div
              key={i}
              className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >
              <span className="text-xl sm:text-2xl block mb-2 sm:mb-3">{v.icon}</span>
              <p className="font-semibold text-[13px] sm:text-[14px] text-stone-800 dark:text-stone-200 mb-1 sm:mb-1.5 font-sans">
                {v.title}
              </p>
              <p className="text-[12px] sm:text-[13px] text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </PostSection>

      <ClosingQuote
        text={DATA.closingQuote}
        author={`${DATA.author} · Tirunelveli`}
        accentColor="border-l-emerald-500"
      />
    </article>
  )
}
