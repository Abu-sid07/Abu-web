// components/ui/minimalist-hero.tsx
'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  logoText: string;
  navLinks?: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
  resumeLink?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className={[
      'text-sm font-medium px-3 py-1.5 rounded-full',
      'text-foreground/60 hover:text-foreground',
      'hover:bg-foreground/5 transition-colors',
    ].join(' ')}
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/50 transition-colors hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  socialLinks,
  locationText,
  className,
  resumeLink,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-background font-sans overflow-x-hidden',
        className
      )}
    >
      {/* Navbar */}
      {navLinks && (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">

            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold tracking-wide"
            >
              {logoText}
            </motion.div>

            <nav className="hidden md:flex items-center gap-1">
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
                transition={{ duration: 0.4 }}
                className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-yellow-400 px-5 text-sm font-semibold text-yellow-950 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-yellow-500"
              >
                Download Resume
              </motion.a>
            )}

            <button
              className="md:hidden p-2 rounded-full hover:bg-foreground/5 transition"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t border-border/40 bg-background px-6 pb-4 pt-2 flex flex-col gap-1"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition"
                >
                  {link.label}
                </a>
              ))}
              {resumeLink && (
                <a
                  href={resumeLink}
                  download
                  className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-full bg-yellow-400 text-sm font-semibold text-yellow-950 hover:bg-yellow-500 transition"
                >
                  Download Resume
                </a>
              )}
            </motion.div>
          )}
        </header>
      )}

      {/* Hero body */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 md:px-12">
        <div className="w-full max-w-7xl">

          {/* ── MOBILE layout ── */}
          <div className="flex flex-col items-center gap-6 md:hidden">

            {/*
              Image section — matches laptop view exactly:
              - Yellow circle animates in first (scale 0.8 → 1)
              - Person image slides up from below AFTER circle appears
              - Person is NOT clipped — full body visible sitting in front of circle
              - Circle sits behind, person overlaps the bottom edge (same as desktop)
            */}
            <div
              className="relative flex items-end justify-center"
              style={{ width: '280px', height: '300px' }}
            >
              {/* Step 1: Circle appears first */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
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

              {/* Step 2: Person slides up from bottom after circle */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '240px',
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

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-4xl font-extrabold leading-tight text-center"
            >
              Hi, I&apos;m{' '}
              <span className="text-yellow-500">Abu</span>
              <br />
              Frontend Developer.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/70 text-center"
            >
              {mainText}
            </motion.p>

            {/* Buttons — always last */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {resumeLink && (
                <a
                  href={resumeLink}
                  download
                  className="inline-flex h-11 items-center justify-center rounded-full bg-yellow-400 px-6 text-sm font-bold text-yellow-950 shadow transition-all hover:-translate-y-0.5 hover:bg-yellow-500"
                >
                  Download Resume
                </a>
              )}
              <a
                href={readMoreLink}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground/70 transition-all hover:-translate-y-0.5 hover:bg-foreground/5"
              >
                Read More
              </a>
            </motion.div>
          </div>

          {/* ── TABLET / DESKTOP layout ── */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:gap-8 lg:gap-16">

            {/* Left: description + buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-5"
            >
              <p className="text-sm leading-relaxed text-foreground/70 max-w-[260px]">
                {mainText}
              </p>
              <div className="flex flex-wrap gap-3">
                {resumeLink && (
                  <a
                    href={resumeLink}
                    download
                    className="inline-flex h-11 items-center justify-center rounded-full bg-yellow-400 px-6 text-sm font-bold text-yellow-950 shadow transition-all hover:-translate-y-0.5 hover:bg-yellow-500"
                  >
                    Download Resume
                  </a>
                )}
                <a
                  href={readMoreLink}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground/70 transition-all hover:-translate-y-0.5 hover:bg-foreground/5"
                >
                  Read More
                </a>
              </div>
            </motion.div>

            {/* Center: image on yellow circle */}
            <motion.div
              className="relative flex items-end justify-center"
              style={{ minHeight: '420px' }}
            >
              {/* Circle first */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400/90 dark:bg-yellow-500/80 w-[260px] h-[260px] lg:w-[340px] lg:h-[340px]"
              />
              {/* Person slides up after */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 w-48 lg:w-60 h-auto object-cover object-top"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = 'https://placehold.co/240x400/eab308/1a1000?text=Abu';
                }}
              />
            </motion.div>

            {/* Right: big heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex items-center"
            >
              <h1 className="font-extrabold leading-tight text-4xl lg:text-5xl xl:text-6xl">
                Hi, I&apos;m
                <br />
                <span className="text-yellow-500">Abu</span>
                <br />
                Frontend
                <br />
                Developer.
              </h1>
            </motion.div>
          </div>
        </div>
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
            transition={{ delay: 1.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link, i) => (
              <SocialIcon key={i} href={link.href} icon={link.icon} />
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-sm text-foreground/60"
          >
            {locationText}
          </motion.p>
        </div>
      </footer>
    </div>
  );
};