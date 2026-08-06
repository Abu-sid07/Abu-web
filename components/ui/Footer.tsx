"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Social link definition with REQUIRED aria-label (Fix 7.3)
// ─────────────────────────────────────────────────────────────────────────────

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Abu-sid07",
    label: "Visit Abu Siddique's GitHub profile",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abusid07/",
    label: "Visit Abu Siddique's LinkedIn profile",
  },
  {
    icon: Twitter,
    href: "https://x.com/abu_ibnu_rasool",
    label: "Visit Abu Siddique's X (Twitter) profile",
  },
  {
    icon: Mail,
    href: "mailto:abubackersiddique311@gmail.com",
    label: "Send email to Abu Siddique",
  },
];

// Quick nav links (Fix 7.1)
const quickNav = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Back to Top Button (Fix 7.2)
// ─────────────────────────────────────────────────────────────────────────────

function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.25,
        ease: "easeInOut",
      }}
      className={[
        "fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50",
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-yellow-500 text-yellow-950",
        "shadow-lg shadow-yellow-500/25",
        "hover:bg-yellow-600 hover:shadow-xl hover:shadow-yellow-500/30",
        "transition-all",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-yellow-600 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Footer (Fixes 7.1, 7.3, 7.4)
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();

  // Fix 7.4: Dynamic copyright year
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Fix 7.2: Back to top button */}
      <BackToTopButton />

      <footer
        role="contentinfo"
        className={[
          "relative w-full border-t",
          "bg-background",
          "border-border/40",
        ].join(" ")}
      >
        {/* Decorative top gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">

            {/* ── Brand + Bio ── (Fix 7.1: richer content) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                ease: "easeOut",
              }}
              className="lg:col-span-2"
            >
              <Link
                href="#hero"
                className={[
                  "inline-flex items-center gap-2",
                  "text-2xl font-bold tracking-tight",
                  "text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                  "rounded-sm",
                ].join(" ")}
                aria-label="Go to top of page"
              >
                <span className="text-yellow-500">Abu</span>
                <span>Sid.</span>
              </Link>

              <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                Frontend developer building modern, responsive, and accessible
                web experiences with React, Next.js, and Tailwind CSS.
                Passionate about clean UI, performance, and delightful interactions.
              </p>

              {/* Fix 7.3: Social links with aria-labels */}
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={[
                        "flex items-center justify-center",
                        "w-10 h-10 rounded-full",
                        "bg-muted/60 text-muted-foreground",
                        "hover:bg-yellow-500 hover:text-yellow-950",
                        "transition-all",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                      ].join(" ")}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>

              {/* Quick email CTA */}
              <a
                href="mailto:abubackersiddique311@gmail.com"
                className={[
                  "mt-6 inline-flex items-center gap-2",
                  "text-sm font-medium",
                  "text-yellow-600 dark:text-yellow-400",
                  "hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                  "rounded-sm",
                ].join(" ")}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                abubackersiddique311@gmail.com
              </a>
            </motion.div>

            {/* ── Quick Navigation ── (Fix 7.1) */}
            <motion.nav
              aria-label="Footer quick navigation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.1,
                ease: "easeOut",
              }}
              className="lg:col-span-1"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {quickNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "text-muted-foreground hover:text-foreground",
                        "transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                        "rounded-sm",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* ── Resources ── (Fix 7.1: useful links) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: prefersReducedMotion ? 0.01 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.2,
                ease: "easeOut",
              }}
              className="lg:col-span-1"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                <li>
                  <a
                    href="/abu cv.pdf"
                    download
                    className={[
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                      "rounded-sm",
                    ].join(" ")}
                  >
                    Download Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className={[
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                      "rounded-sm",
                    ].join(" ")}
                  >
                    View Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className={[
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                      "rounded-sm",
                    ].join(" ")}
                  >
                    Get in Touch
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Abu-sid07/abu-web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "text-muted-foreground hover:text-foreground",
                      "transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2",
                      "focus-visible:ring-yellow-500 focus-visible:ring-offset-2",
                      "rounded-sm",
                    ].join(" ")}
                  >
                    View Source
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* ── Bottom Bar ── (Fix 7.4: dynamic year) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.5,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
            className={[
              "mt-12 pt-8",
              "flex flex-col sm:flex-row items-center justify-between gap-4",
              "border-t border-border/40",
            ].join(" ")}
          >
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              {/* Fix 7.4: dynamic year */}
              © {currentYear} Abu Siddique. All rights reserved.
            </p>

            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500" aria-hidden="true" />
              <span>using React, Next.js & Tailwind</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}