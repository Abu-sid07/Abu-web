'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LucideIcon, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface MinimalistHeroProps {
  logoText: string;
  navLinks?: { label: string; href: string }[];
  mainText: string;
  // FIX 2.5 — added subtitle and role props
  subtitle?: string;
  role?: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  socialLinks: { icon: LucideIcon; href: string; label: string }[];
  locationText: string;
  className?: string;
  resumeLink?: string;
}

// ─────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className={[
      'text-sm font-medium px-3 py-1.5 rounded-full',
      'text-foreground/60 hover:text-foreground',
      'hover:bg-foreground/5 transition-colors',
      // Keyboard focus ring
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
    ].join(' ')}
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  // FIX — require label for accessibility
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={[
      'text-foreground/50 transition-colors hover:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-yellow-500 focus-visible:ring-offset-2 rounded-sm',
    ].join(' ')}
  >
    <Icon className="h-5 w-5" aria-hidden="true" />
  </a>
);

// ─────────────────────────────────────────
// FIX 2.6 — Scroll Indicator Component
// Bouncing chevron tells user to scroll down
// ─────────────────────────────────────────

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);
  const prefersReduced = useReducedMotion();

  // Hide indicator once user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setVisible(false);
      else setVisible(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.5 }}
    >
      <span className="text-xs text-foreground/40 tracking-widest uppercase">
        Scroll
      </span>
      <motion.div
        animate={
          prefersReduced
            ? {}
            : {
                y: [0, 6, 0],
              }
        }
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ChevronDown className="h-5 w-5 text-foreground/40" />
      </motion.div>
    </motion.div>
  );
};

// ─────────────────────────────────────────
// FIX 2.1 — Line Reveal Animation
// Replaces slow typing effect
// Content is visible immediately
// Animation is purely decorative entrance
// ─────────────────────────────────────────

const LineReveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const prefersReduced = useReducedMotion();

  return (
    // Outer div clips the inner sliding text
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={prefersReduced ? { opacity: 0 } : { y: '105%', opacity: 0 }}
        animate={prefersReduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
        transition={{
          duration: prefersReduced ? 0.01 : 0.65,
          delay: prefersReduced ? 0 : delay,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  // FIX 2.5 — destructure new props with defaults
  subtitle = 'Frontend Developer',
  role = 'Building modern, responsive web experiences',
  readMoreLink,
  imageSrc,
  imageAlt,
  socialLinks,
  locationText,
  className,
  resumeLink,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-background font-sans overflow-x-hidden',
        className
      )}
    >
      {/* ─────────────────────────────────────
          NAVBAR
          ───────────────────────────────────── */}
      {navLinks && (
        <header
          ref={menuRef}
          className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.4 }}
              className="text-xl font-bold tracking-wide"
            >
              {logoText}
            </motion.div>

            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {resumeLink && (
              <motion.a
                href={resumeLink}
                download
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: prefersReduced ? 0.01 : 0.4 }}
                className={[
                  'hidden md:inline-flex h-9 items-center justify-center',
                  'rounded-full bg-yellow-400 px-5 text-sm font-semibold text-yellow-950',
                  'shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-500',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-yellow-600 focus-visible:ring-offset-2',
                ].join(' ')}
              >
                Download Resume
              </motion.a>
            )}

            {/* Mobile hamburger */}
            <button
              className={[
                'md:hidden p-2 rounded-full hover:bg-foreground/5 transition',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
              ].join(' ')}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen
                ? <X className="h-5 w-5" aria-hidden="true" />
                : <Menu className="h-5 w-5" aria-hidden="true" />
              }
            </button>
          </div>

          {/* 
            Mobile menu
            FIX — uses AnimatePresence-style animation via CSS
            instead of abruptly appearing
          */}
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            initial={false}
            animate={
              menuOpen
                ? { height: 'auto', opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: prefersReduced ? 0.01 : 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-border/40 bg-background"
          >
            <div className="px-6 pb-4 pt-2 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'rounded-lg px-3 py-3 text-sm font-medium',
                    'text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition',
                    // FIX 1.6 — minimum 44px tap target (py-3 = 12px * 2 + text = ~44px)
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-yellow-500 focus-visible:ring-offset-1',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              ))}
              {resumeLink && (
                <a
                  href={resumeLink}
                  download
                  className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-yellow-400 text-sm font-semibold text-yellow-950 hover:bg-yellow-500 transition"
                >
                  Download Resume
                </a>
              )}
            </div>
          </motion.div>
        </header>
      )}

      {/* ─────────────────────────────────────
          HERO BODY
          ───────────────────────────────────── */}
      <main
        className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12"
        aria-label="Hero section"
      >
        <div className="w-full max-w-7xl">

          {/* ── MOBILE layout ── */}
          <div className="flex flex-col items-center gap-6 md:hidden">

            {/* Profile image with yellow circle */}
            <div
              className="relative flex items-end justify-center"
              style={{ width: '280px', height: '300px' }}
            >
              {/* Yellow circle */}
              <motion.div
                initial={prefersReduced ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.2,
                }}
                aria-hidden="true"
                className="absolute rounded-full bg-yellow-400 dark:bg-yellow-500"
                style={{
                  width: '220px',
                  height: '220px',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 0,
                }}
              />

              {/* Profile image */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.5,
                }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  // FIX 2.2 — fluid width, never overflows container
                  width: 'min(240px, 85vw)',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = 'https://placehold.co/240x300/eab308/1a1000?text=Abu';
                }}
              />
            </div>

            {/* 
              FIX 2.1 — Heading uses LineReveal instead of typing effect
              Content is readable immediately, animation is just entrance
              FIX 2.2 — fluid font size via clamp, never overflows
            */}
            <div className="text-center">
              {/* 
                FIX 2.5 — Role badge appears above main heading
                Visitor immediately knows what you do
              */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.4,
                  delay: prefersReduced ? 0 : 0.3,
                }}
                className="mb-3 inline-flex items-center gap-2"
              >
                {/* Green available dot */}
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                />
                <span className="text-xs font-medium tracking-widest uppercase text-foreground/50">
                  {subtitle}
                </span>
              </motion.div>

              {/* Main heading — line reveal, no typing delay */}
              <h1
                // FIX 2.2 — clamp scales smoothly across all screen sizes
                className="font-extrabold leading-tight"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 3rem)',
                }}
              >
                <LineReveal delay={0.4}>
                  Hi, I&apos;m{' '}
                  <span className="text-yellow-500">Abu</span>
                </LineReveal>
                <LineReveal delay={0.52}>
                  {/* FIX 2.5 — role shown in heading */}
                  Frontend Developer.
                </LineReveal>
              </h1>

              {/* FIX 2.5 — role description one-liner */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.5,
                  delay: prefersReduced ? 0 : 0.7,
                }}
                className="mt-2 text-sm font-medium text-yellow-600 dark:text-yellow-400"
              >
                {role}
              </motion.p>
            </div>

            {/* About text */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.5,
                delay: prefersReduced ? 0 : 0.8,
              }}
              className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/70 text-center"
            >
              {mainText}
            </motion.p>

            {/* 
              FIX 2.3 — Buttons now have clear hierarchy
              Primary = yellow filled (Download Resume)
              Secondary = ghost outlined (Read More)
              Size difference also signals importance
            */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.5,
                delay: prefersReduced ? 0 : 0.95,
              }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {/* PRIMARY button — bold, filled, larger */}
              {resumeLink && (
                <a
                  href={resumeLink}
                  download
                  className={[
                    // FIX 2.3 — primary: filled, prominent
                    'inline-flex h-12 items-center justify-center',
                    'rounded-full bg-yellow-400 px-7',
                    'text-sm font-bold text-yellow-950 shadow-md',
                    'transition-all hover:-translate-y-0.5 hover:bg-yellow-500',
                    'hover:shadow-lg hover:shadow-yellow-400/25',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-yellow-600 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  Download Resume
                </a>
              )}

              {/* SECONDARY button — outlined, smaller visual weight */}
              <a
                href={readMoreLink}
                className={[
                  // FIX 2.3 — secondary: ghost outlined, less prominent
                  'inline-flex h-10 items-center justify-center',
                  'rounded-full border border-border px-5',
                  'text-sm font-medium text-foreground/60',
                  'transition-all hover:-translate-y-0.5',
                  'hover:bg-foreground/5 hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-foreground/50 focus-visible:ring-offset-2',
                ].join(' ')}
              >
                About Me
              </a>
            </motion.div>
          </div>

          {/* ── TABLET / DESKTOP layout ── */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-8 lg:gap-16">

            {/* Left column — description + buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.6,
                delay: prefersReduced ? 0 : 0.6,
              }}
              className="flex flex-col gap-5"
            >
              {/* FIX 2.5 — role description on desktop left panel */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-foreground/50 mb-3">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                  />
                  {subtitle}
                </span>
                <p className="text-sm leading-relaxed text-foreground/70 max-w-[260px]">
                  {mainText}
                </p>
              </div>

              {/* 
                FIX 2.3 — Clear button hierarchy on desktop
                Primary is larger and filled
                Secondary is smaller and outlined
              */}
              <div className="flex flex-wrap gap-3">
                {resumeLink && (
                  <a
                    href={resumeLink}
                    download
                    className={[
                      // PRIMARY — filled, shadow, larger
                      'inline-flex h-12 items-center justify-center',
                      'rounded-full bg-yellow-400 px-7',
                      'text-sm font-bold text-yellow-950 shadow-md',
                      'transition-all hover:-translate-y-0.5 hover:bg-yellow-500',
                      'hover:shadow-lg hover:shadow-yellow-400/25',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-yellow-600 focus-visible:ring-offset-2',
                    ].join(' ')}
                  >
                    Download Resume
                  </a>
                )}
                <a
                  href={readMoreLink}
                  className={[
                    // SECONDARY — ghost, no shadow, smaller
                    'inline-flex h-10 items-center justify-center',
                    'rounded-full border border-border px-5',
                    'text-sm font-medium text-foreground/60',
                    'transition-all hover:-translate-y-0.5',
                    'hover:bg-foreground/5 hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2',
                    'focus-visible:ring-foreground/50 focus-visible:ring-offset-2',
                  ].join(' ')}
                >
                  About Me
                </a>
              </div>
            </motion.div>

            {/* Center column — profile image */}
            <motion.div
              className="relative flex items-end justify-center"
              style={{ minHeight: '420px' }}
            >
              {/* Yellow circle */}
              <motion.div
                aria-hidden="true"
                initial={prefersReduced ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.2,
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400/90 dark:bg-yellow-500/80 w-[260px] h-[260px] lg:w-[340px] lg:h-[340px]"
              />

              {/* Profile image */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                // FIX 2.2 — fluid width with clamp, prevents overflow
                className="relative z-10 h-auto object-cover object-top"
                style={{ width: 'clamp(160px, 20vw, 240px)' }}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.5,
                }}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = 'https://placehold.co/240x400/eab308/1a1000?text=Abu';
                }}
              />
            </motion.div>

            {/* Right column — heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.6,
                delay: prefersReduced ? 0 : 0.8,
              }}
              className="flex flex-col gap-3"
            >
              {/* 
                FIX 2.1 — LineReveal instead of typing
                FIX 2.2 — clamp for fluid size on all screens
              */}
              <h1
                className="font-extrabold leading-[1.1]"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
              >
                <LineReveal delay={0.3}>Hi, I&apos;m</LineReveal>
                <LineReveal delay={0.44}>
                  <span className="text-yellow-500">Abu</span>
                </LineReveal>
                <LineReveal delay={0.58}>Frontend</LineReveal>
                <LineReveal delay={0.72}>Developer.</LineReveal>
              </h1>

              {/* FIX 2.5 — role tag line below heading */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.4,
                  delay: prefersReduced ? 0 : 0.95,
                }}
                className="text-sm font-medium text-yellow-600 dark:text-yellow-400"
              >
                {role}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* FIX 2.6 — Scroll indicator */}
        <ScrollIndicator />
      </main>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
      />

      {/* Footer */}
      <footer className="z-10 w-full border-t border-border/40 px-6 py-4 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 1.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, i) => (
              <SocialIcon
                key={i}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 1.3 }}
            className="text-sm text-foreground/60"
          >
            {locationText}
          </motion.p>
        </div>
      </footer>
    </div>
  );
};