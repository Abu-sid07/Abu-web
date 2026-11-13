// college-blog.tsx
// Usage: import CollegeBlog from '@/components/blogs/college-blog'
// Images live in /public/blogs/college/
//   sadak-clg.png, friends_png.jpeg, gra-img.png, Graduation-Day.gif

import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContentPoint {
  heading: string;
  description: string;
  images: { src: string; alt: string; caption: string; isGif?: boolean }[];
}

interface BlogData {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  read_time: string;
  views: number;
  institution: string;
  course: string;
  duration: string;
  summary: string;
  content_points: ContentPoint[];
  note: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const blogData: BlogData = {
  id: 1,
  title: "Three Years That Changed Everything",
  subtitle: "Personal Story · College",
  author: "Abu",
  date: "November 2024",
  read_time: "5 min read",
  views: 350,
  institution: "Sadakathullah Appa College",
  course: "BCA",
  duration: "2021 to 2024",
  summary:
    "I walked into Sadakathullah Appa College not knowing who I'd become. Here's what I left with — and why those 1,095 days were worth every sleepless night.",

  content_points: [
    {
      heading: "🌱 The Day Everything Felt Possible",
      description:
        "I still remember standing at the college gate on day one — backpack too heavy, directions unclear, heart pounding. The campus stretched out like a world I hadn't earned yet. New faces everywhere. New rules. New version of me. The mix of terror and excitement was something I'd never felt before. That first walk across the grounds wasn't just orientation — it was the quiet beginning of the best three years of my life.",
      images: [
        {
          src: "/blogs/college/sadak-clg.png",
          alt: "Sadakathullah Appa College campus front view, Tirunelveli",
          caption: "Sadakathullah Appa College — where it all began",
        },
      ],
    },
    {
      heading: "💻 When the Screen Finally Made Sense",
      description:
        "Nobody tells you how satisfying it is when broken code suddenly works at 2 AM. The BCA curriculum wasn't gentle — late submissions, semester crunch, logic errors that made no sense — but every grind built something real. I wasn't just learning to code. I was learning how to think. By third year, problems that once paralysed me became puzzles I actually enjoyed.",
      images: [],
    },
    {
      heading: "🤝 The People Who Made It Unforgettable",
      description:
        "Here's what the syllabus never taught: friendship is its own kind of curriculum. Group studies that turned into midnight snack runs. Cultural fest rehearsals that went completely off-script. The inside jokes that still land over WhatsApp today. These three — the ones in this photo — walked every single step of this journey with me. Three years, same faces, same campus, same memories.",
      images: [
        {
          src: "/blogs/college/friends_png.jpeg",
          alt: "Abu and his two closest college friends standing outside Sadakathullah Appa College",
          caption: "Three years, three of us — this photo says everything",
        },
      ],
    },
    {
      heading: "🎓 The Moment I Realised It Was Over",
      description:
        "Walking across that stage to collect my degree, I expected to feel triumphant. Instead, I felt something quieter — a kind of grateful ache. Three years in one handshake. The hard nights, the exams, the friendships, the growth — all of it folded into a single certificate and a photograph. College didn't just give me a BCA. It gave me a blueprint for who I want to be.",
      images: [
        {
          src: "/blogs/college/Graduation-Day.gif",
          alt: "Graduation Day ceremony at Sadakathullah Appa College",
          caption: "Graduation Day — the moment we'd worked three years for",
          isGif: true,
        },
        {
          src: "/blogs/college/gra-img.png",
          alt: "Graduation day collage — friends in gowns, certificates in hand",
          caption: "Gowns, grins, and something beautifully bittersweet",
        },
      ],
    },
  ],

  note: "Some chapters don't end — they just become the foundation everything else is built on. Sadakathullah Appa College is mine.",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-stone-400 mb-2 font-sans">
      {text}
    </p>
  );
}

function SectionHeading({ text }: { text: string }) {
  return (
    <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug mb-4">
      {text}
    </h2>
  );
}

function BlogImage({
  src,
  alt,
  caption,
  isGif = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  isGif?: boolean;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="relative w-full h-56 sm:h-64">
        {isGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs italic px-4 py-3">
        {caption}
      </figcaption>
    </figure>
  );
}

// ─── Chapter Block ─────────────────────────────────────────────────────────────

function Chapter({
  point,
  index,
}: {
  point: ContentPoint;
  index: number;
}) {
  const chapterNum = String(index + 1).padStart(2, "0");

  return (
    <section className="py-12 border-b border-stone-100">
      <SectionLabel text={`Chapter ${chapterNum}`} />
      <SectionHeading text={point.heading} />
      <p className="text-[16px] text-stone-500 leading-[1.9] mb-6">
        {point.description}
      </p>

      {/* Single image — full width */}
      {point.images.length === 1 && (
        <BlogImage {...point.images[0]} className="w-full" />
      )}

      {/* Two images — side by side */}
      {point.images.length === 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {point.images.map((img, i) => (
            <BlogImage key={i} {...img} />
          ))}
        </div>
      )}

      {/* Three+ images — first full width, rest in grid */}
      {point.images.length >= 3 && (
        <div className="flex flex-col gap-3">
          <BlogImage {...point.images[0]} className="w-full" />
          <div className="grid grid-cols-2 gap-3">
            {point.images.slice(1).map((img, i) => (
              <BlogImage key={i} {...img} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CollegeBlog() {
  const blog = blogData;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <article className="max-w-[740px] mx-auto px-5 pb-24">

        {/* ── HEADER ── */}
        <header className="pt-14 pb-10 border-b border-stone-200">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full mb-5 font-sans">
            {blog.subtitle}
          </span>

          <h1 className="font-serif text-[38px] sm:text-[44px] font-bold leading-[1.15] text-stone-900 tracking-tight mb-4">
            {blog.title}
          </h1>

          <p className="font-serif italic text-lg text-stone-500 leading-relaxed mb-7">
            {blog.summary}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-2.5 flex-wrap font-sans">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
              A
            </div>
            <div className="text-sm text-stone-400">
              <span className="text-stone-600 font-semibold">{blog.author}</span>
              <span className="mx-1.5 text-stone-200">·</span>
              {blog.date}
              <span className="mx-1.5 text-stone-200">·</span>
              {blog.read_time}
            </div>
            <div className="ml-auto flex gap-2">
              <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">
                👁 {blog.views}
              </span>
              <span className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full">
                {blog.course}
              </span>
            </div>
          </div>

          {/* Info strip */}
          <div className="grid grid-cols-3 gap-3 mt-7">
            {[
              { label: "Institution", value: blog.institution },
              { label: "Course", value: blog.course },
              { label: "Duration", value: blog.duration },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-stone-100 rounded-xl px-4 py-3 font-sans"
              >
                <p className="text-[10px] font-semibold tracking-widest uppercase text-stone-300 mb-1">
                  {item.label}
                </p>
                <p className="text-[13px] font-semibold text-stone-700 leading-snug">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ── CHAPTERS ── */}
        {blog.content_points.map((point, index) => (
          <Chapter key={index} point={point} index={index} />
        ))}

        {/* ── CLOSING NOTE ── */}
        <blockquote className="mt-14 px-8 py-8 bg-white rounded-xl border border-stone-100 border-l-[4px] border-l-blue-600">
          <p className="font-serif text-[19px] italic text-stone-700 leading-[1.85]">
            "{blog.note}"
          </p>
          <footer className="mt-4 text-[13px] text-stone-400 font-sans">
            — {blog.author} · {blog.institution}
          </footer>
        </blockquote>

      </article>
    </div>
  );
}