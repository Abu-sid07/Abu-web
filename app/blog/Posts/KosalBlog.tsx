"use client"

// path: app/blog/posts/KosalBlog.tsx
// ─── Blog Post: "My Journey: From Visa Work to Software Development" ──────────
// To add this blog to the listing page:
//   1. Import KosalBlog and KOSAL_CARD from this file
//   2. Push KOSAL_CARD into the CARDS array in page.tsx
//   3. Add <KosalBlog /> to the view switch in BlogPageContent
import ProjectGallery from "@/components/ui/CircularGallery"
import { EyeIcon } from "lucide-react"
import { BackBtn, BlogImg, ClosingQuote, PostSection, SHeading, SLabel } from "../blog-ui"

// ── Data ─────────────────────────────────────────────────────────────────────

const DATA = {
  title: "The Phone Call That Changed My Career",
  subtitle: "Career Story · Kosal IT Solutions",
  author: "Abu",
  date: "June 2025",
  read_time: "4 min read",
  views: 434,
  summary:
    "A referral from a friend helped turn my MERN stack internship into a Front-End Developer role—and opened the door to a new team, new skills, and creative work beyond code.",

  chapters: [
    {
      label: "Chapter 01",
      heading: "The Grind at Greens Tech",
      body: "I was working hard as a MERN Stack Development Intern at Greens Technology. My days were filled with writing code, learning new tools, and building full web applications. I loved what I was doing and was getting better every day. As my internship went on, I knew I was ready for a full-time job where I could use my skills in the real world.",
      images: [
        {
          src: "/blog/laptop-work.jpg",
          alt: "Abu working on his laptop during his development internship",
          caption: "Learning, building, and preparing for the next step",
        },
      ],
    },
    {
      label: "Chapter 02",
      heading: "The Important Phone Call",
      body: "I thought of my good friend, Ghouse, who was already working at Kosal IT Solutions. One day, I picked up the phone and asked, 'Bro, are there any open vacancies in your company?' Because he knew how hard I worked, he referred me for an open Front-End Developer role. I went to the interview, gave it my best, and got the job. It was amazing to see how one phone call could open such a big door.",
      images: [
        {
          src: "/blog/gouse-abu.jpeg",
          alt: "Abu and Gouse together, looking happy and professional",
          caption: "From college to colleagues — the circle came full circle",
        },
      ],
    },
    {
      label: "Chapter 03",
      heading: "A New Team and a Fresh Start",
      body: "Joining Kosal IT Solutions was an exciting new chapter. I was welcomed into a talented team. As a Front-End Developer, I spent my days building web features, working with the team, and making sure our websites looked great and worked well. It felt great to be doing what I love in a real company.",
      images: [
        {
          src: "/blog/Kosal-team.jpeg",
          alt: "The Kosal IT Solutions team",
          caption: "A fresh start with a talented new team",
        },
      ],
    },
    {
      label: "Chapter 04",
      heading: "Growing Beyond Code",
      body: "The learning did not stop at programming. Being part of this new team pushed me to try new things and step outside my comfort zone. I started learning content creation: planning, shooting, and editing tech videos, then making Instagram reels to share what I knew. It was fun to bring coding and creativity together. This is how my Creative & Studio projects began. I realized that being a developer is also about sharing ideas with the world.",
      images: [],
    },
    {
      label: "Chapter 05",
      heading: "What Comes Next?",
      body: "My time at Kosal IT Solutions has taught me more than I expected. I learned how to be a better developer, work well with a new team, and create content people enjoy. My next big step is already taking shape, and I am excited for the future.",
      images: [
        {
          src: "/blog/what%20Next.jpg",
          alt: "What comes next in Abu's career journey",
          caption: "The next step is already taking shape",
        },
      ],
    },
  ],
  

  closingQuote:
    "Sometimes, all it takes is hard work and one brave phone call to a friend to open the right door.",
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
      className="max-w-[680px] mx-auto px-4 sm:px-5 pb-28 transition-all duration-500"
      style={{
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <BackBtn onClick={onBack} />

      {/* Header */}
      <header className="pb-6 sm:pb-8 border-b border-stone-200 dark:border-stone-800">
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
          {DATA.subtitle}
        </span>
        <h1 className="font-serif text-[25px] sm:text-[30px] md:text-[36px] font-bold leading-[1.15] text-stone-900 dark:text-stone-50 tracking-tight mb-3">
          {DATA.title}
        </h1>
        <p className="font-serif italic text-[15px] sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-5 sm:mb-6">
          {DATA.summary}
        </p>

        {/* Byline */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap font-sans">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet-100 dark:bg-violet-900 flex items-center justify-center text-xs sm:text-sm font-bold text-violet-700 dark:text-violet-300 shrink-0">
            A
          </div>
          <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            <span className="text-stone-600 dark:text-stone-300 font-semibold">{DATA.author}</span>
            <span className="mx-1 sm:mx-1.5 text-stone-400 dark:text-stone-500">·</span>
            {DATA.date}
            <span className="mx-1 sm:mx-1.5 text-stone-400 dark:text-stone-500">·</span>
            {DATA.read_time}
          </div>
          <div className="ml-auto flex gap-1.5 sm:gap-2">
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1">
              <EyeIcon className="w-3 h-3" />
              {liveViews}
            </span>
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 sm:px-3 py-1 rounded-full">
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
          <p className="text-[14px] sm:text-[15px] text-stone-600 dark:text-stone-300 leading-[1.85] mb-5 sm:mb-6">
            {ch.body}
          </p>
          {ch.label === "Chapter 04" ? (
            <div className="mt-6 h-[480px] w-full overflow-hidden rounded-xl bg-transparent p-3 transition-colors dark:bg-black sm:p-4">
              <ProjectGallery />
            </div>
          ) : ch.images.length > 0 && (
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
