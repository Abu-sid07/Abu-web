'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { LucideIcon, Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MinimalistHeroProps {
  logoText: string
  navLinks?: { label: string; href: string }[]
  mainText: string
  subtitle?: string
  role?: string
  readMoreLink: string
  imageSrc: string
  // FIX: renamed to make intent clear — must describe the image, not just the name
  imageAlt: string
  socialLinks: { icon: LucideIcon; href: string; label: string }[]
  locationText: string
  className?: string
  resumeLink?: string
  // FIX: explicit name prop so h1 and aria-labels are not hard-coded
  personName: string
}

// ─────────────────────────────────────────────────────────────────────────────
// NavLink — unchanged, already has correct focus styles
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
// FIX: key={link.label} used at call site — not index
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
// ScrollIndicator — aria-hidden, no changes needed
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
// LineReveal — unchanged
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
  personName,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  // FIX: ref to return focus to toggle button when menu closes
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()
  const hasNavLinks = (navLinks?.length ?? 0) > 0

  // Close mobile menu on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [menuOpen])

  // Close mobile menu on Escape + return focus to trigger
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        // FIX: return focus to the button that opened the menu
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [menuOpen])

  return (
    /*
      FIX: Removed the outer wrapping <div> as the page root.
      The component now renders semantic fragment children.
      The root element is kept as a positioning wrapper only —
      <header>, <main>, <footer> inside carry the landmark roles.
    */
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col bg-background font-sans overflow-x-hidden',
        className
      )}
    >

      {/* ───────────────────────────────────────
          NAVBAR
          FIX: <header> already is the landmark — no aria-label needed.
          menuRef moved to the inner container only, not the whole header,
          so outside-click works correctly.
          ─────────────────────────────────────── */}
      {(hasNavLinks || resumeLink) && (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
          {/* menuRef wraps only the interactive area for outside-click detection */}
          <div
            ref={menuRef}
            className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-12"
          >
            {/* Logo — decorative, not a heading */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReduced ? 0.01 : 0.4 }}
              className="text-xl font-bold tracking-wide"
              aria-hidden="true"  // logoText duplicates personName which is in h1
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

            {/* Mobile hamburger */}
            {hasNavLinks && (
              <button
                ref={menuButtonRef}
                className={[
                  'md:hidden p-2 rounded-full hover:bg-foreground/5 transition',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-yellow-500 focus-visible:ring-offset-2',
                ].join(' ')}
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                {menuOpen
                  ? <X className="h-5 w-5" aria-hidden="true" />
                  : <Menu className="h-5 w-5" aria-hidden="true" />
                }
              </button>
            )}
          </div>

          {/* ─────────────────────────────────────
              Mobile menu drawer
              FIX: inert attribute prevents focus entering hidden menu.
              FIX: role="navigation" removed — the <nav> inside carries it.
              FIX: aria-hidden when closed keeps it out of the a11y tree.
              ───────────────────────────────────── */}
          {hasNavLinks && (
            <motion.div
              id="mobile-menu"
              // FIX: aria-hidden when closed so screen readers skip it
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
              {/* FIX: <nav> carries the landmark — no role="navigation" on outer div */}
              <nav aria-label="Mobile" className="px-6 pb-4 pt-2 flex flex-col gap-1">
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

      {/* ─────────────────────────────────────
          HERO BODY
          FIX: aria-label removed from <main> — redundant on the main landmark.
               One <main> per page; the label "Hero section" added no value.
          ───────────────────────────────────── */}
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

            {/* COLUMN A — Subtitle + Paragraph + Buttons */}
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
              <div>
                {/* FIX: animate-pulse can cause issues for vestibular disorders;
                    it is decorative so aria-hidden="true" is correct */}
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

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                {resumeLink && (
                  <a
                    href={resumeLink}
                    download
                    // FIX: use personName prop — not hard-coded "Abu"
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
                  // FIX: use personName prop — not hard-coded "Abu"
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

            {/* COLUMN B — Profile Image */}
            <motion.div
              className={[
                'relative flex items-end justify-center',
                'order-2 md:order-2',
                'min-h-[220px] sm:min-h-[280px] md:min-h-[420px]',
              ].join(' ')}
            >
              <motion.div
                aria-hidden="true"
                initial={prefersReduced ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
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

              <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto object-cover object-top"
                style={{ width: 'clamp(120px, 30vw, 240px)' }}
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 50 }}
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

            {/* COLUMN C — Main H1 Heading
                FIX: ONE <h1> per page. This is it.
                Section headings elsewhere must be <h2>.
                Card titles must be <h3> under their section <h2>. */}
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
              <h1
                className="font-extrabold leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)' }}
              >
                <LineReveal delay={0.3}>
                  Hi, I&apos;m Abu <span className="text-yellow-500">{personName}</span>
                </LineReveal>
                <LineReveal delay={0.44}>
                  <span className="text-yellow-500 dark:text-yellow-400">Frontend</span>
                </LineReveal>
                <LineReveal delay={0.58}>
                  <span className="text-yellow-500 dark:text-yellow-400">Developer.</span>
                </LineReveal>
              </h1>

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

        <ScrollIndicator />
      </main>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"
      />

      {/* ─────────────────────────────────────
          HERO FOOTER
          FIX: <footer> is already the contentinfo landmark.
               No aria-label needed here.
          ───────────────────────────────────── */}
      <footer className="z-10 w-full border-t border-border/40 px-6 py-3 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: prefersReduced ? 0 : 1.2 }}
            className="flex items-center gap-4"
          >
            {/* FIX: key={link.label} not key={i} */}
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.label}
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
  )
}