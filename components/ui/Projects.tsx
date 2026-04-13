"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project-card";

// Updated data structure mapping to the new ProjectCard format
const projects = [
  {
    title: "Pump Management & AI-Based Recommendation Dashboard",
    description:
      "A web-based dashboard designed to manage pump inventory and support AI-driven recommendation workflows through structured data and interactive UI. Built interactive chat UI for capturing user requirements.",
    imgSrc: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop", // Stock photo representing industrial/dashboards
    link: "#",
    techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS"],
    linkText: "View Dashboard"
  },
  {
    title: "Vishwa Sangam — Astrology & Matchmaking App",
    description:
      "A web application focused on horoscope matching and compatibility analysis with a clean and intuitive UI. Optimized components for improved performance and load time.",
    imgSrc: "/asto img.png", // Local astrology-themed image asset
    link: "https://vishwasangam.vercel.app/",
    techStack: ["Next.js", "React.js", "Tailwind CSS"],
    linkText: "Visit Live Site"
  },
  {
    title: "Aero Landing Page",
    description: "A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page.",
    imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // AI/tech landscape
    link: "#",
    linkText: "Explore Platform"
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Projects() {
  const pumpImages = [
    "/pump1/pump%201.png",
    "/pump1/pump2.png",
    "/pump1/pump%203.png",
    "/pump1/pump%204.png",
    "/pump1/pump%205.png",
  ];

  const [pumpImageIndex, setPumpImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPumpImageIndex((current) => (current + 1) % pumpImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [pumpImages.length]);

  return (
    <section id="projects" className="relative py-28 bg-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/[0.04] rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-400/[0.03] rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-700 font-semibold text-xs uppercase tracking-widest">
              My Work
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Featured{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Projects
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-base lg:text-lg leading-relaxed">
            A selection of projects that showcase my skills in building real-world, production-grade web applications.
          </p>
        </motion.div>

        {/* Updated Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgSrc={i === 0 ? pumpImages[pumpImageIndex] : project.imgSrc}
                link={project.link}
                linkText={project.linkText}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            More projects coming soon — stay tuned ✨
          </p>
        </motion.div>
      </div>
    </section>
  );
}
