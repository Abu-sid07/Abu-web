// components/experience-section.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type TimelineItem = {
  id: string;
  type: "work" | "edu";
  title: string;
  organization: string;
  period: string;
  location?: string;
  badge: string;
  description?: string;
  bullets?: string[];   // ← add this
  skills?: string[];
  link?: string;
};

type FilterTab = "all" | "work" | "edu";

const timelineData: TimelineItem[] = [
  {
    id: "work-frontend",
    type: "work",
    title: "Front-End Developer",
    organization: "Kosal.io",
    period: "07/2025 – 03/2026",
    badge: "Work",
    link: "https://kosallanding.vercel.app/",
    bullets: [
      "Develop responsive and modern user interfaces using Next.js, React.js, TypeScript, JavaScript, Tailwind CSS, shadcn/ui.",
      "Build reusable UI components and optimize application performance for smoother, faster user experiences.",
      "Integrate REST APIs, manage data flow, and ensure clean, maintainable front-end architecture.",
      "Collaborate with teams using Git/GitHub, follow clean code practices, and efficiently debug issues.",
      "Use AI-Assisted Development Tools to speed up development tasks, reduce repetitive work, and improve delivery efficiency.",
    ],
    skills: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion", "AI Tools"],
  },
  {
    id: "work-visa",
    type: "work",
    title: "Visa Executive",
    organization: "Hameed Air Travels",
    period: "07/2024 – 07/2025",
    location: "Chennai, Tamil Nadu",
    badge: "Work",
    bullets: [
      "Processed visa applications for multiple countries, ensuring accurate documentation, compliance, and timely submission.",
      "Handled ticket booking and travel arrangements while maintaining precision and customer satisfaction.",
      "Utilized booking systems and CRM tools for client data management, record-keeping, and application tracking.",
      "Demonstrated technical adaptability, including basic system troubleshooting, website content updates, and cybersecurity awareness.",
      "Delivered excellent client service and digital communication, ensuring clear guidance, professional support, and organized workflow.",
    ],
  },
  {
    id: "work-intern",
    type: "work",
    title: "Web Developer (Intern)",
    organization: "Code Genie",
    period: "04/2023 – 04/2023",
    location: "Tirunelveli, Tamil Nadu",
    badge: "Intern",
    link: "https://www.linkedin.com/company/codegenie-solutions?originalSubdomain=in",
    bullets: [
      "Front-End Development: Proficient in HTML5, CSS3, JavaScript, and Bootstrap for creating responsive and visually appealing web designs.",
      "Interactive UI & Problem-Solving: Hands-on experience with JavaScript DOM manipulation and event handling to enhance user experience.",
      "Collaborative & Adaptive Learning: Eager to learn, adapt to new technologies, and work efficiently using GitHub, VS Code.",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "GitHub"],
  },
  {
    id: "edu-mern",
    type: "edu",
    title: "MERN Full Stack",
    organization: "Greens Technology",
    period: "07/2024 – 07/2025",
    location: "Chennai, Tamil Nadu",
    badge: "Course",
    link: "https://www.greenstechnologys.com/",
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    id: "edu-novit",
    type: "edu",
    title: "Full Stack Development",
    organization: "NoviTech",
    period: "12/2024 – 01/2025",
    location: "Online",
    badge: "Course",
  },
  {
    id: "edu-bca",
    type: "edu",
    title: "Bachelor of Computer Application (BCA)",
    organization: "Sadakathullah Appa College, Tirunelveli",
    period: "06/2021 – 06/2024",
    badge: "BCA",
    link: "https://sadakath.ac.in/",
  },
];

const corePhilosophies = [
  "Building clean and scalable UI",
  "Writing maintainable code",
  "Improving user experience",
  "Solving real-world problems",
];

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "edu", label: "Education" },
];

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
        <span className="text-black dark:text-white">Experience &amp; </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
          Education
        </span>
      </h2>

      <p className="max-w-xl mx-auto text-base leading-relaxed text-black/60 dark:text-white/50">
        A look at my professional journey, academic background, and the core
        philosophies that drive my work.
      </p>
    </motion.div>
  );
}

function FilterTabs({
  active,
  onChange,
}: {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 }}
      className="flex items-center justify-center gap-2 mb-14 flex-wrap"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={[
              "px-5 py-2 rounded-[20px] text-[13px] font-medium transition-all duration-300",
              isActive
                ? "bg-yellow-500 text-black"
                : "bg-transparent border border-black/10 text-black/50 hover:text-black/70 hover:border-black/20 dark:border-white/10 dark:text-white/50 dark:hover:text-white/70 dark:hover:border-white/20",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </motion.div>
  );
}

function TimelineDot({ type }: { type: "work" | "edu" }) {
  if (type === "work") {
    return (
      <div
        className="w-3 h-3 rounded-full bg-yellow-500"
        style={{ boxShadow: "0 0 0 3px rgba(234,179,8,0.18)" }}
      />
    );
  }

  return (
    <div
      className="w-3 h-3 rounded-full bg-black dark:bg-white"
      style={{ boxShadow: "0 0 0 3px rgba(234,179,8,0.18)" }}
    />
  );
}

function TimelineBadge({
  label,
  type,
}: {
  label: string;
  type: "work" | "edu";
}) {
  if (type === "work") {
    return (
      <span className="inline-flex rounded-[20px] border border-yellow-500/20 bg-yellow-500/12 px-2 py-[2px] text-[10px] font-medium text-yellow-700 dark:text-yellow-400">
        {label}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-[20px] border border-black/10 bg-black/[0.04] px-2 py-[2px] text-[10px] font-medium text-black/60 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/60">
      {label}
    </span>
  );
}

function TimelineItemRow({
  item,
  index,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative flex gap-5 pb-14 last:pb-0"
    >
      <div className="relative flex flex-col items-center">
        <TimelineDot type={item.type} />
        {!isLast && (
          <div className="mt-3 w-[1.5px] flex-1 bg-black/10 dark:bg-white/10" />
        )}
      </div>

      <div className="flex-1 -mt-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
          <div>
            <h3 className="text-[17px] font-semibold leading-snug text-black dark:text-white">
              {item.title}
            </h3>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[14px] font-medium text-black/55 dark:text-white/45 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors underline"
              >
                {item.organization}
              </a>
            ) : (
              <p className="mt-1 text-[14px] font-medium text-black/55 dark:text-white/45">
                {item.organization}
              </p>
            )}
          </div>

          <TimelineBadge label={item.badge} type={item.type} />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
            <span className="text-[12px] font-medium tracking-wide text-black/40 dark:text-white/35">
              {item.period}
            </span>
          </div>

          {item.location && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black/25 dark:bg-white/25" />
              <span className="text-[12px] text-black/40 dark:text-white/35">
                {item.location}
              </span>
            </div>
          )}
        </div>

        {item.description && (
          <p className="mb-4 text-[13px] leading-7 text-black/55 dark:text-white/50">
            {item.description}
          </p>
        )}

        {item.bullets && item.bullets.length > 0 && (
          <ul className="mb-4 space-y-2">
            {item.bullets.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[13px] leading-6 text-black/55 dark:text-white/50"
              >
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-yellow-500" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {item.skills && item.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-[10px] font-medium text-black/60 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/55"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CorePhilosophies() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="mt-10 border-t border-black/8 pt-10 dark:border-white/8"
    >
      <p className="mb-5 text-[12px] font-medium uppercase tracking-[0.15em] text-black/35 dark:text-white/30">
        Core Philosophies
      </p>

      <div className="flex flex-wrap gap-2.5">
        {corePhilosophies.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
            className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.03]"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-yellow-500 shrink-0" />
            <span className="text-[12px] font-medium text-black/65 dark:text-white/55">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return timelineData;
    return timelineData.filter((item) => item.type === activeTab);
  }, [activeTab]);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-white py-20 md:py-24 dark:bg-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03] dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.04] dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-6 lg:px-12">
        <SectionHeader />
        <FilterTabs active={activeTab} onChange={setActiveTab} />

        <div className="relative">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="relative">
              {filteredItems.map((item, index) => (
                <TimelineItemRow
                  key={item.id}
                  item={item}
                  index={index}
                  isLast={index === filteredItems.length - 1}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <CorePhilosophies />
      </div>
    </section>
  );
}

export default ExperienceSection;