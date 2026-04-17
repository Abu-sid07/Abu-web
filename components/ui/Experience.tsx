"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Target, ChevronRight } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

const experiences = [
  {
    role: "Frontend Developer",
    company: "Kosal.io",
    period: "July 2025 – Present",
    highlights: [
      "Developed responsive and modern UI using Next.js, React, and Tailwind CSS",
      "Built reusable components and improved application performance",
      "Integrated APIs and managed data flow efficiently",
      "Used AI tools to speed up development and debugging",
    ],
  },
];

const focusAreas = [
  "Building clean and scalable UI",
  "Writing maintainable code",
  "Improving user experience",
  "Solving real-world problems",
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 bg-gray-50 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-yellow-400/[0.04] rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-400/[0.03] rounded-full blur-3xl translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            <span className="text-yellow-700 font-semibold text-xs uppercase tracking-widest">
              Career Profile
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            Experience &amp;{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Education
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
                className="absolute bottom-0 md:bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </h2>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            A look at my professional journey, academic background, and the 
            core philosophies that drive my work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-1 items-start">
          {/* Left: Experience Timeline */}
          <div className="lg:col-span-7 relative">
            {/* Continuous Timeline Line */}
            <div className="absolute left-[39px] top-16 bottom-0 w-px bg-gradient-to-b from-yellow-300 via-yellow-200 to-transparent lg:block hidden z-0" />
            <div className="absolute left-[27px] top-16 bottom-0 w-px bg-gradient-to-b from-yellow-300 via-yellow-200 to-transparent lg:hidden block z-0" />

            <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center shrink-0 shadow-xl shadow-gray-900/20 border border-gray-700">
                <Briefcase className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 tracking-tight">Experience</h3>
            </motion.div>

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.2 + i * 0.1)}
                className="relative pl-14 lg:pl-20 mb-10"
              >
                {/* Timeline Node Indicator */}
                <div className="absolute left-[23px] lg:left-[35px] top-6 w-3 h-3 rounded-full bg-yellow-500 ring-4 ring-yellow-50 z-10 shadow-md">
                  <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-75" />
                </div>

                <div className="group relative rounded-3xl overflow-hidden">
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-0 transition-opacity duration-500 blur-[0.5px]" />
                  <div className="relative bg-gray-50 rounded-3xl p-7 lg:p-9 shadow-sm border border-gray-100 transition-colors duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-1">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500" />
                          <p className="font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-full text-sm border border-gray-100">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-yellow-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-xl whitespace-nowrap shadow-sm">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-3 text-gray-600 text-[0.95rem] leading-relaxed group/item">
                          <ChevronRight className="w-4 h-4 text-yellow-500 mt-1 shrink-0 group-hover/item:translate-x-1 transition-transform duration-300" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Education + Focus Areas */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Education Bento Card */}
            <motion.div {...fadeUp(0.3)} className="group relative rounded-3xl overflow-hidden">
               <div className="absolute -inset-[1px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />
               <div className="relative bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 transition-colors duration-500">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Education</h3>
                 </div>
                 
                 <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="text-[1.1rem] font-bold text-gray-900 mb-2 leading-snug">
                        Bachelor of Computer Application (BCA)
                    </h4>
                    <div className="flex flex-col gap-1">
                      <p className="text-blue-600 font-semibold text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Sadakathullah Appa College
                      </p>
                      <p className="text-gray-500 text-sm ml-3.5">Tirunelveli, India</p>
                    </div>
                 </div>
               </div>
            </motion.div>

            {/* Focus Areas Bento Grid */}
            <motion.div {...fadeUp(0.4)} className="group relative rounded-3xl overflow-hidden">
               <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-0 transition-opacity duration-500 blur-[0.5px]" />
               <div className="relative bg-gray-50 rounded-3xl p-8 shadow-sm border border-gray-100 transition-colors duration-500">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-center shrink-0">
                        <Target className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Core Focus</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focusAreas.map((area, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, delay: 0.45 + i * 0.08 }}
                            className="bg-gray-50 rounded-xl px-4 py-3.5 border border-gray-100 flex items-start gap-3 transition-all duration-300 group/area"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 group-hover/area:scale-150 transition-transform duration-300" />
                            <p className="text-sm font-semibold text-gray-700 leading-snug">{area}</p>
                        </motion.div>
                    ))}
                </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
