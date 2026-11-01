// teaching-blog.tsx
// Usage: import TeachingBlog from '@/components/blogs/teaching-blog'
// Place your images in /public/blogs/teaching/ and update the src paths below

import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lesson {
  icon: string;
  text: string;
}

interface TimelineItem {
  label: string;
  period: string;
  description: string;
  highlight?: string;
}

interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

interface AwardItem {
  icon: string;
  title: string;
  description: string;
}

interface BlogData {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  read_time: string;
  views: number;
  teaching_schedule: string;
  summary: string;
  sections: {
    how_it_began: {
      label: string;
      heading: string;
      body: string[];
      images: { src: string; alt: string; caption: string }[];
    };
    what_i_teach: {
      label: string;
      heading: string;
      intro: string;
      lessons: Lesson[];
      closing: string;
      image: { src: string; alt: string; caption: string };
    };
    journey: {
      label: string;
      heading: string;
      intro: string;
      timeline: TimelineItem[];
    };
    current_students: {
      label: string;
      heading: string;
      body: string;
      images: { src: string; alt: string; caption: string }[];
    };
    awards: {
      label: string;
      heading: string;
      intro: string;
      items: AwardItem[];
      images: { src: string; alt: string; caption: string }[];
    };
    life_lessons: {
      label: string;
      heading: string;
      intro: string;
      values: ValueCard[];
    };
  };
  closing_quote: string;
  closing_attr: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const blogData: BlogData = {
  id: 2,
  title: "The 6 AM Classroom That Changed Me",
  subtitle: "Teaching · Personal Story",
  author: "Abu",
  date: "28 Dec 2024",
  read_time: "5 min read",
  views: 203,
  teaching_schedule: "Every morning from 6 AM to 7:30 AM",
  summary:
    "Before the world woke up, I was already teaching. Here's how a one-hour morning routine quietly became the most meaningful part of my day.",

  sections: {
    how_it_began: {
      label: "How it began",
      heading: "A college student who became a teacher",
      body: [
        "Most people my age were sleeping at 6 AM. I was already standing in front of a classroom — chalk in hand, students seated on the floor, the quiet morning air carrying the sound of Arabic recitation.",
        "It started during my first year at Sadakathullah Appa College. Someone needed a teacher for the local Madrasa. I stepped in — not because I had everything figured out, but because the children needed someone to show up. And I did, every single morning, for a year straight.",
      ],
      images: [
        {
          src: "/blogs/teaching/teach-01.jpeg",
          alt: "Abu with young students inside the Madrasa classroom",
          caption: "First batch — young learners, big hearts",
        },
        {
          src: "/blogs/teaching/teach-3.jpeg",
          alt: "Abu sitting with small children during class",
          caption: "The little ones always made class feel alive",
        },
      ],
    },

    what_i_teach: {
      label: "Inside the classroom",
      heading: "More than just Arabic — a life curriculum",
      intro:
        "People assume teaching Arabic is about letters and grammar. It is, but it's also so much more. Every morning lesson was a thread that connected language to character, scripture to everyday life.",
      lessons: [
        {
          icon: "📖",
          text: "How to read the Quran correctly — with tajweed, rhythm, and reverence",
        },
        {
          icon: "🕊️",
          text: "Stories from the life of Prophet Muhammad (SAW) and the wisdom inside them",
        },
        {
          icon: "🤲",
          text: "Facing hardships with patience — something my students taught back to me, honestly",
        },
        {
          icon: "🌙",
          text: "Practical Islamic values for navigating daily decisions and relationships",
        },
      ],
      closing:
        "The youngest students would sometimes forget the lesson and ask me completely unrelated questions. I'd answer every single one. That's where the real teaching happened — not in the textbook.",
      image: {
        src: "/blogs/teaching/teach-5.jpeg",
        alt: "Students sitting in a Quran study circle",
        caption: "The circle doesn't just teach — it builds community",
      },
    },

    journey: {
      label: "The journey",
      heading: "I left. Then I came back — and kept teaching.",
      intro:
        "Life moved fast after that first year. I finished college, packed my bags, and moved to Chennai for work. New city, new responsibilities. But something felt incomplete without the 6 AM classroom.",
      timeline: [
        {
          label: "College Year 1",
          period: "2021 – 2022",
          description:
            "Began teaching Arabic at the local Madrasa every morning before college.",
          highlight: "One hour. Every single day. This was the beginning of everything.",
        },
        {
          label: "College Continues",
          period: "2022 – 2024",
          description:
            "Balancing BCA assignments, exams, and friendships — while quietly maintaining the habit of showing up for students who needed consistency.",
        },
        {
          label: "Chennai",
          period: "After College",
          description:
            "Moved to Chennai. Took on a visa executive role. The city was exciting and exhausting. Teaching was on pause — but never forgotten.",
        },
        {
          label: "Home + kosal.io",
          period: "Present",
          description:
            "Returned home. Now working as a Software Developer at kosal.io.",
          highlight:
            "Every morning from 6:00 AM to 7:30 AM — back in the classroom. Part-time in schedule, full-time in heart.",
        },
      ],
    },

    current_students: {
      label: "Current students",
      heading: "The faces that make 6 AM worth it",
      body: "These are the students I teach today. Some are brand new — still learning the alphabet. Others have been coming for years. Each one shows up with a willingness to learn that honestly humbles me.",
      images: [
        {
          src: "/blogs/teaching/teach-2.jpg",
          alt: "Abu with a large group of madrasa students outdoors",
          caption: "The full class — outside on a good day",
        },
        {
          src: "/blogs/teaching/teach-5.jpeg",
          alt: "Students studying Quran together",
          caption: "Every page turned is a step forward",
        },
        {
          src: "/blogs/teaching/teach-6.jpeg",
          alt: "Evening study session with students in a circle",
          caption: "Evening revision — the room is small, the energy is enormous",
        },
      ],
    },

    awards: {
      label: "Recognition",
      heading: "The moments that made it all feel real",
      intro:
        "Teaching isn't about trophies. But when your community acknowledges the work — it matters more than you expect.",
      images: [
        {
          src: "/blogs/teaching/award-1.jpg",
          alt: "Abu receiving a shawl of appreciation on stage at the Madrasa Annual Day",
          caption: "Guest appreciation — received from a respected elder",
        },
        {
          src: "/blogs/teaching/award-2.jpg",
          alt: "Abu receiving a trophy at the Madrasa Annual Day",
          caption: "Student performance award — watching students excel is the real prize",
        },
      ],
      items: [
        {
          icon: "🏅",
          title: "Guest Appreciation — Madrasa Annual Day",
          description:
            "Honoured by a former police officer and a professional auditor. Their words were a reminder that education rooted in values is something the world still deeply respects.",
        },
        {
          icon: "🎓",
          title: "Student Performance Recognition",
          description:
            "Watching students who once stumbled over letters stand confidently on stage — performing, reciting, smiling. As a teacher, this was the proudest moment of all.",
        },
      ],
    },

    life_lessons: {
      label: "What it taught me",
      heading: "The student who learned the most was me",
      intro:
        "I walked into that classroom thinking I was the teacher. Three years in, I know better. The children — their innocence, curiosity, and trust — reshaped how I see discipline, patience, and purpose.",
      values: [
        {
          icon: "⏰",
          title: "Consistency over motivation",
          description:
            "Motivation fades. Showing up at 6 AM every day taught me that discipline is what actually moves the needle.",
        },
        {
          icon: "💡",
          title: "Teaching deepens your own knowledge",
          description:
            "Every question a student asked forced me to understand more clearly myself.",
        },
        {
          icon: "🤲",
          title: "Kindness is a teaching method",
          description:
            "The students who struggled most needed patience first — and lesson plans second.",
        },
      ],
    },
  },

  closing_quote:
    "I became a software developer by qualification. But teaching these children every morning — that's what keeps me grounded. Code compiles and deploys. But a child who learns to read the Quran for the first time? That echo lasts a lifetime.",
  closing_attr: "Abu · Tirunelveli",
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
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-xl ${className}`}>
      <div className="relative w-full h-56 sm:h-64">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white text-xs italic px-4 py-3">
        {caption}
      </figcaption>
    </figure>
  );
}

function TimelineItem({ item, isLast }: { item: TimelineItem; isLast: boolean }) {
  return (
    <div className="relative pl-8">
      {/* dot */}
      <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-stone-50 z-10" />
      {/* line */}
      {!isLast && (
        <span className="absolute left-[5px] top-4 bottom-0 w-[2px] bg-emerald-100" />
      )}
      <p className="text-[10px] font-semibold tracking-widest uppercase text-emerald-700 mb-1 font-sans">
        {item.period} · {item.label}
      </p>
      <p className="text-[15px] text-stone-500 leading-relaxed">{item.description}</p>
      {item.highlight && (
        <p className="mt-1 text-[15px] italic text-stone-800 font-serif">
          {item.highlight}
        </p>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TeachingBlog() {
  const blog = blogData;
  const s = blog.sections;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <article className="max-w-[740px] mx-auto px-5 pb-24">

        {/* ── HEADER ── */}
        <header className="pt-14 pb-10 border-b border-stone-200">
          <span className="inline-block text-[11px] font-semibold tracking-widest uppercase bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full mb-5 font-sans">
            {blog.subtitle}
          </span>
          <h1 className="font-serif text-[38px] sm:text-[44px] font-bold leading-[1.15] text-stone-900 tracking-tight mb-4">
            {blog.title}
          </h1>
          <p className="font-serif italic text-lg text-stone-500 leading-relaxed mb-7">
            {blog.summary}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-2.5 flex-wrap font-sans">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 shrink-0">
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
                🕐 {blog.teaching_schedule}
              </span>
            </div>
          </div>
        </header>

        {/* ── SECTION 1: HOW IT BEGAN ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.how_it_began.label} />
          <SectionHeading text={s.how_it_began.heading} />
          {s.how_it_began.body.map((para, i) => (
            <p key={i} className="text-[16px] text-stone-500 leading-[1.9] mb-4">
              {para}
            </p>
          ))}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {s.how_it_began.images.map((img, i) => (
              <BlogImage key={i} {...img} />
            ))}
          </div>
        </section>

        {/* ── SECTION 2: WHAT I TEACH ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.what_i_teach.label} />
          <SectionHeading text={s.what_i_teach.heading} />
          <p className="text-[16px] text-stone-500 leading-[1.9] mb-5">
            {s.what_i_teach.intro}
          </p>
          <ul className="flex flex-col gap-3 mb-6">
            {s.what_i_teach.lessons.map((lesson, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-lg mt-0.5 shrink-0">{lesson.icon}</span>
                <span className="text-[15px] text-stone-500 leading-relaxed">
                  {lesson.text}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-[16px] text-stone-500 leading-[1.9] italic font-serif mb-6">
            "{s.what_i_teach.closing}"
          </p>
          <BlogImage {...s.what_i_teach.image} className="w-full" />
        </section>

        {/* ── SECTION 3: JOURNEY / TIMELINE ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.journey.label} />
          <SectionHeading text={s.journey.heading} />
          <p className="text-[16px] text-stone-500 leading-[1.9] mb-8">
            {s.journey.intro}
          </p>
          <div className="flex flex-col gap-7">
            {s.journey.timeline.map((item, i) => (
              <TimelineItem
                key={i}
                item={item}
                isLast={i === s.journey.timeline.length - 1}
              />
            ))}
          </div>
        </section>

        {/* ── SECTION 4: CURRENT STUDENTS ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.current_students.label} />
          <SectionHeading text={s.current_students.heading} />
          <p className="text-[16px] text-stone-500 leading-[1.9] mb-6">
            {s.current_students.body}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {s.current_students.images.slice(0, 2).map((img, i) => (
              <BlogImage key={i} {...img} />
            ))}
          </div>
          {s.current_students.images[2] && (
            <div className="mt-3">
              <BlogImage
                {...s.current_students.images[2]}
                className="w-full"
              />
            </div>
          )}
        </section>

        {/* ── SECTION 5: AWARDS ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.awards.label} />
          <SectionHeading text={s.awards.heading} />
          <p className="text-[16px] text-stone-500 leading-[1.9] mb-6">
            {s.awards.intro}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {s.awards.images.map((img, i) => (
              <BlogImage key={i} {...img} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {s.awards.items.map((award, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white border border-stone-100 rounded-xl p-5"
              >
                <span className="text-2xl shrink-0 mt-0.5">{award.icon}</span>
                <div>
                  <h3 className="font-serif text-[17px] font-bold text-stone-800 mb-1.5">
                    {award.title}
                  </h3>
                  <p className="text-[14px] text-stone-500 leading-relaxed font-sans">
                    {award.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 6: LIFE LESSONS ── */}
        <section className="py-12 border-b border-stone-100">
          <SectionLabel text={s.life_lessons.label} />
          <SectionHeading text={s.life_lessons.heading} />
          <p className="text-[16px] text-stone-500 leading-[1.9] mb-6">
            {s.life_lessons.intro}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {s.life_lessons.values.map((val, i) => (
              <div
                key={i}
                className="bg-white border border-stone-100 rounded-xl p-5"
              >
                <span className="text-2xl block mb-3">{val.icon}</span>
                <p className="font-semibold text-[14px] text-stone-800 mb-1.5 font-sans">
                  {val.title}
                </p>
                <p className="text-[13px] text-stone-500 leading-relaxed font-sans">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING QUOTE ── */}
        <blockquote className="mt-14 px-8 py-8 bg-white rounded-xl border border-stone-100 border-l-4 border-l-emerald-600">
          <p className="font-serif text-[19px] italic text-stone-700 leading-[1.85]">
            "{blog.closing_quote}"
          </p>
          <footer className="mt-4 text-[13px] text-stone-400 font-sans">
            — {blog.closing_attr}
          </footer>
        </blockquote>

      </article>
    </div>
  );
}