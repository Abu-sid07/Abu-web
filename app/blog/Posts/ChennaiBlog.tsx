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
  title: "My Journey: How I Built My Tech Career in Chennai",
  subtitle: "Career · Personal Story",
  author: "Abu",
  date: "June 2025",
  read_time: "4 min read",
  views: 407,
  summary:
    "I came to Chennai with a BCA degree and a dream of working in software. Rejections didn't stop me: I built digital tools at Hameed Air Travels, learned full-stack development at Greens Technology, and kept moving forward.",

  chapters: [
    {
      label: "Chapter 01",
      heading: "Starting with a Dream",
      body: "I came to Chennai with my BCA degree and a big dream: to work in software. The start was difficult. I faced rejections and didn't get a software job right away, but I refused to give up. I chose to take the opportunities available to me and make the most of them.",
      images: [
        {
          src: "/blog/chennai-arrival.png",
          alt: "Abu with his BCA certificate at the start of his career journey",
          caption: "A BCA degree and a dream of working in software",
        },
      ],
    },
    {
      label: "Chapter 02",
      heading: "My Morning Routine",
      body: "Every day, I woke up at 5:00 AM for Fajr prayer. It gave me peace and a clear mind before the day began. That routine helped me stay grounded through long days of work and study.",
      images: [
        {
          src: "/blog/Prayer.jpg",
          alt: "Prayer as part of Abu's morning routine",
          caption: "Finding peace and focus through Fajr prayer",
        },
      ],
    },
    {
      label: "Chapter 03",
      heading: "7:00 AM — The Gym Before Work",
      body: "After prayer, I went to the gym at 7:00 AM. Waking up early and working out gave me the strength and focus I needed to balance long days of work with studying at night.",
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
    heading: "My First Step: Hameed Air Travels",
    body: <>In May 2024, I joined Hameed Air Travels as a Junior Frontend Developer. Much of the agency&apos;s visa work was done on paper, so I created digital tools and a website to track visa applications online. This helped reduce mistakes and made the work faster. You can see the website I built at <a className="text-orange-600 underline underline-offset-4 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300" href="https://hameedairtravels.vercel.app" target="_blank" rel="noopener noreferrer">hameedairtravels.vercel.app</a>. I learned that you don&apos;t have to wait for a tech company to use technology; you can bring it to any company.</>,
      images: [
        {
          src: "/blog/visa-office.jpeg",
          alt: "Abu working at Hameed Air Travels on digital tools",
          caption: "Turning paper-based visa work into a digital process",
        },
      ],
    },
    {
      label: "Chapter 05",
      heading: "Learning More: Greens Technology",
      body: "After a year at Hameed Air Travels, I wanted to learn more. In April 2025, I started a MERN Stack Internship at Greens Technology. I learned how to build complete websites from start to finish and practiced with MongoDB, React.js, and Node.js to create fast, useful web experiences.",
      images: [
        {
          src: "/blog/promotion.jpg",
          alt: "A professional workspace representing Abu's continued learning in technology",
          caption: "Building full-stack skills during my internship",
        },
      ],
    },
    {
      label: "Chapter 06",
      heading: "Hard Work and Bus Travel",
      body: "It was a busy time: I worked during the day and studied late into the night. On Sundays, when I didn't have a bus pass, I rode my bicycle a long way to get to class. I was tired, but I kept going and didn't make excuses.",
      images: [
        {
          src: "/blog/bus.jpg",
          alt: "Abu studying late at night after a day of work",
          caption: "Working by day and studying late into the night",
        },
      ],
    },
    {
      label: "Chapter 07",
      heading: "Ready for the Future",
      body: "Some people wait for the perfect job to be handed to them. I chose to work hard and build my skills while I waited. That effort, along with the experience I've gained, has prepared me for my next big step as a software developer.",
      images: [
        {
          src: "/blog/Feature.jpg",
          alt: "Abu looking ahead to his next step as a software developer",
          caption: "Ready for the next step in my software career",
        },
      ],
    },
  ],

  closingQuote:
    "I didn't wait for the perfect opportunity. I kept learning, building, and showing up until I was ready for the next step.",
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
      className="max-w-[680px] mx-auto px-4 sm:px-5 pb-28 transition-all duration-500"
      style={{
        opacity: animIn ? 1 : 0,
        transform: animIn ? "translateY(0)" : "translateY(24px)",
      }}
    >
      <BackBtn onClick={onBack} />

      {/* Header */}
      <header className="pb-6 sm:pb-8 border-b border-stone-200 dark:border-stone-800">
        <span className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-full mb-4 sm:mb-5 font-sans">
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center text-xs sm:text-sm font-bold text-orange-700 dark:text-orange-300 shrink-0">
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
          <p className="text-[14px] sm:text-[15px] text-stone-600 dark:text-stone-300 leading-[1.85] mb-5 sm:mb-6">
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
