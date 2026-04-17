"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, ArrowUpRight, Github } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "abubackersiddique311@gmail.com",
    href: "mailto:abubackersiddique311@gmail.com",
    gradient: "from-yellow-400 to-amber-500",
    shadowColor: "shadow-yellow-500/20",
    borderColor: "group-hover:border-yellow-500/50",
    bgMuted: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6369535009",
    href: "tel:+916369535009",
    gradient: "from-yellow-400 to-amber-500",
    shadowColor: "shadow-yellow-500/20",
    borderColor: "group-hover:border-yellow-500/50",
    bgMuted: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/abusid07",
    href: "https://linkedin.com/in/abusid07",
    gradient: "from-yellow-400 to-amber-500",
    shadowColor: "shadow-yellow-500/20",
    borderColor: "group-hover:border-yellow-500/50",
    bgMuted: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/abusid07", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/abusid07", label: "LinkedIn" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-400/[0.03] rounded-[100%] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 hidden sm:block">
         <div className="absolute left-12 top-20 w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center animate-[spin_8s_linear_infinite] shadow-sm bg-white">
            <span className="w-2 h-2 rounded-sm bg-yellow-400" />
         </div>
         <div className="absolute right-16 bottom-40 w-12 h-12 rounded-2xl border border-gray-100 flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite] shadow-sm bg-white">
            <div className="w-3 h-3 rounded-full bg-blue-400/50 blur-[2px]" />
         </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 w-full max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <span className="text-yellow-700 font-semibold text-xs uppercase tracking-widest">
              Get In Touch
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Let&apos;s Build{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
                Together
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
                className="absolute bottom-1 left-0 right-0 h-3 bg-yellow-400/20 rounded-full origin-left -z-0"
              />
            </span>
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
            I&apos;m currently open for new opportunities. Whether you have a question
            or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-24">
          {contactItems.map(
            (
              {
                icon: Icon,
                label,
                value,
                href,
                gradient,
                shadowColor,
                borderColor,
                bgMuted,
                iconColor,
              },
              i
            ) => (
              <motion.a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl ${shadowColor} transition-all duration-500 text-center flex flex-col items-center gap-5`}
              >
                {/* Border glowing gradient on hover */}
                <div
                  className={`absolute -inset-[1px] bg-gradient-to-b ${gradient} rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px] -z-10`}
                />
                <div className="absolute inset-0 bg-white rounded-[2rem] -z-0" />

                {/* Animated Icon Container */}
                <div
                  className={`relative z-10 w-20 h-20 rounded-[1.5rem] flex items-center justify-center ${bgMuted} border border-transparent ${borderColor} transition-colors duration-500 group-hover:-translate-y-2`}
                >
                  <Icon className={`w-8 h-8 ${iconColor} group-hover:scale-110 transition-transform duration-500`} />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    {label}
                  </p>
                  <p className="text-[0.95rem] font-bold text-gray-900 truncate px-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                    {value}
                  </p>
                </div>

                {/* Arrow hint */}
                <span className="relative z-10 mt-auto pt-4 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Connect
                  </span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </span>
             </motion.a>
            )
          )}
        </div>

        {/* Global Footer Elements */}
        <div className="w-full max-w-5xl border-t border-gray-100 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
               <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-gray-100 hover:border-gray-900">
                 <link.icon className="w-4 h-4" />
               </a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center sm:text-right text-gray-400 text-sm font-medium"
          >
            Built with{" "}
            <span className="text-gray-900 font-bold">
              Next.js
            </span>{" "}
            &amp;{" "}
            <span className="text-gray-900 font-bold">
              Tailwind CSS
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block mt-1 sm:mt-0 sm:ml-2">Designed with ❤️</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
