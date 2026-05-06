// components/ui/minimalist-hero.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LucideIcon, Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface MinimalistHeroProps {
  logoText: string
  navLinks?: { label: string; href: string }[]
  mainText: string
  subtitle?: string
  role?: string
  readMoreLink: string
  imageSrc: string
  imageAlt: string
  socialLinks: { icon: LucideIcon; href: string; label: string }[]
  locationText: string
  className?: string
  resumeLink?: string
  // FIX: now optional — defaults to 'Abu' so existing callers without
  // this prop continue to build. Pass it explicitly for correct labels.
  personName?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// NavLink
// ─────────────────────────────────────────────────────────────────────────────
const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <a
    href={href}
    className={[
      'text-sm font-medium px-3 py-1.5 rounded-full',
      'text-foreground/60 hover:text-foreground',
      'hover:bg-foreground/5 transition-colors',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
    ].join(' ')}
  >
    {children}
  </a>
)

// ─────────────────────────────────────────────────────────────────────────────
// SocialIcon
// ─────────────────────────────────────────────────────────────────────────────
const SocialIcon = ({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: LucideIcon
  label: string
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
)

// ─────────────────────────────────────────────────────────────────────────────
// ScrollIndicator
// ─────────────────────────────────────────────────────────────────────────────
const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY <= 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) return null

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
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5 text-foreground/40" />
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LineReveal
// ─────────────────────────────────────────────────────────────────────────────
const LineReveal = ({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) => {
  const prefersReduced = useReducedMotion()

  return (
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
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MinimalistHero
// ─────────────────────────────────────────────────────────────────────────────
export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  subtitle = 'Frontend Developer',
  role = 'Building modern, responsive web experiences',
  readMoreLink,
  imageSrc,
  imageAlt,
  socialLinks,
  locationText,
  className,
  resumeLink,
  // FIX: default value here so the prop is optional at call sites
  personName = 'Abu',
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()
  const hasNavLinks = (navLinks?.length ?? 0) > 0

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [menuOpen])

  // Close on Escape + return focus to trigger button
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [menuOpen])

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-background font-sans overflow-x-hidden',
        className
      )}
    >
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      {(hasNavLinks || resumeLink) && (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div
            ref={menuRef}
            className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-12"
          >
            {/* Logo — aria-hidden because h1 already identifies the person */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.4 }}
              className="text-xl font-bold tracking-wide"
              aria-hidden="true"
            >
              {logoText}
            </motion.div>

            {/* Desktop nav */}
            {hasNavLinks && (
              <nav
                className="hidden md:flex items-center gap-1"
                aria-label="Primary"
              >
                {navLinks?.map((link) => (
                  <NavLink key={link.label} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            )}

            {/* Hamburger — mobile only */}
            {hasNavLinks && (
              <button
                ref={menuButtonRef}
                className={[
                  'md:hidden p-2 rounded-full hover:bg-foreground/5 transition',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
                ].join(' ')}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={
                  menuOpen ? 'Close navigation menu' : 'Open navigation menu'
                }
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* Mobile drawer */}
          {hasNavLinks && (
            <motion.div
              id="mobile-menu"
              aria-hidden={!menuOpen}
              inert={!menuOpen as any}
              initial={false}
              animate={
                menuOpen
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{
                duration: prefersReduced ? 0.01 : 0.25,
                ease: 'easeInOut',
              }}
              className="md:hidden overflow-hidden border-t border-border/40 bg-background"
            >
              <nav
                aria-label="Mobile"
                className="px-6 pb-4 pt-2 flex flex-col gap-1"
              >
                {navLinks?.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={[
                      'rounded-lg px-3 py-3 text-sm font-medium',
                      'text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition',
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
              </nav>
            </motion.div>
          )}
        </header>
      )}

      {/* ── HERO BODY ───────────────────────────────────────────── */}
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center px-6 py-4 md:px-12"
      >
        <div className="w-full max-w-7xl">
          <div
            className={[
              'flex flex-col gap-8',
              'md:gap-12 lg:gap-16',
              'md:grid md:grid-cols-3 md:items-center',
            ].join(' ')}
          >
            {/* ── COLUMN A — Badge + body + CTA buttons ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.6,
                delay: prefersReduced ? 0 : 0.6,
              }}
              className={[
                'flex flex-col gap-5',
                'order-3 md:order-1',
                'items-center md:items-start',
                'text-center md:text-left',
              ].join(' ')}
            >
              <div className="flex flex-col gap-3">
                {/* Availability badge — decorative dot is aria-hidden */}
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-foreground/50">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-green-500 animate-pulse"
                  />
                  {subtitle}
                </span>

                {/* Body copy — text-base per type scale */}
                <p className="text-base text-foreground/70 max-w-[260px]">
                  {mainText}
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {resumeLink && (
                  <a
                    href={resumeLink}
                    download
                    aria-label={`Download ${personName}'s resume as a PDF`}
                    className={[
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
                  aria-label={`Read more about ${personName}`}
                  className={[
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

            {/* ── COLUMN B — Profile image ───────────────────────── */}
            <motion.div
              className={[
                'relative flex items-end justify-center',
                'order-2 md:order-2',
                'min-h-[220px] sm:min-h-[280px] md:min-h-[420px]',
              ].join(' ')}
            >
              {/* Yellow circle — decorative */}
              <motion.div
                aria-hidden="true"
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { scale: 0.8, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.2,
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-yellow-400/90 dark:bg-yellow-500/80"
                style={{
                  width: 'clamp(160px, 35vw, 340px)',
                  height: 'clamp(160px, 35vw, 340px)',
                }}
              />

              {/* Profile photo */}
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto object-cover object-top"
                style={{ width: 'clamp(120px, 30vw, 240px)' }}
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 50 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: prefersReduced ? 0 : 0.5,
                }}
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.onerror = null
                  t.src = `https://placehold.co/240x400/eab308/1a1000?text=${encodeURIComponent(personName)}`
                }}
              />
            </motion.div>

            {/* ── COLUMN C — H1 heading + role tagline ──────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.01 : 0.6,
                delay: prefersReduced ? 0 : 0.8,
              }}
              className={[
                'flex flex-col gap-3',
                'order-1 md:order-3',
                'items-center md:items-start',
                'text-center md:text-left',
              ].join(' ')}
            >
              {/*
                ONE <h1> per page.
                font-extrabold + fluid clamp size via inline style.
                text-balance prevents orphaned last words.
              */}
              <h1
                className="font-extrabold leading-[1.1] text-balance"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)' }}
              >
                <LineReveal delay={0.3}>
                  Hi, I&apos;m{' '}
                  <span className="text-yellow-500">{personName}</span>
                </LineReveal>
                <LineReveal delay={0.44}>
                  <span className="text-yellow-500 dark:text-yellow-400">
                    Frontend
                  </span>
                </LineReveal>
                <LineReveal delay={0.58}>
                  <span className="text-yellow-500 dark:text-yellow-400">
                    Developer.
                  </span>
                </LineReveal>
              </h1>

              {/* Role tagline — text-base per type scale */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: prefersReduced ? 0.01 : 0.4,
                  delay: prefersReduced ? 0 : 0.95,
                }}
                className="text-base font-medium text-yellow-600 dark:text-yellow-400"
              >
                {role}
              </motion.p>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
      </main>

      {/* Bottom gradient — decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"
      />

      {/* ── HERO FOOTER ─────────────────────────────────────────── */}
      <footer className="z-10 w-full border-t border-border/40 px-6 py-3 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 1.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </motion.div>

          {/* Location */}
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
  )
}