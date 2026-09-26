// components/BlogCard.jsx
'use client'

import React from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { Article } from '@/types/article'

/**
 * BlogCard component
 *
 * Typography tokens used (from tailwind.config.js):
 *   text-xs → 12px/1.5 — metadata, timestamps, tags
 *   text-sm → 14px/1.625 — CTA links, UI chrome
 *   text-base → 16px/1.75 — body copy (excerpts)
 *   text-xl → 20px/1.5 — card titles (h3 under section h2)
 *
 * Accessibility:
 *   - <article> wrapper for semantic grouping
 *   - <time> element with datetime attribute for dates
 *   - <a> element for CTA with descriptive aria-label
 *   - aria-hidden on decorative icons and accent bar
 *   - :focus-visible ring from global addBase() styles
 */
interface BlogCardProps {
  article: Article
  onClick?: () => void
  className?: string
}

export default function BlogCard({ article, onClick, className }: BlogCardProps) {
  // ──────────────────────────────────────────────────────────────
  // Helper functions — kept local since they're static data mocks
  // In production, these would come from the Article object directly
  // ──────────────────────────────────────────────────────────────
  const getReadTime = () => {
    return article.read_time || '5 min read'
  }

  const getDate = () => {
    if (article.date) {
      return new Date(article.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }
    return 'Jan 15, 2025'
  }

  const getAccentGradient = () => {
    // Gradient variants for visual interest
    const gradients = [
      'from-emerald-400 to-teal-500',
      'from-teal-400 to-cyan-500',
      'from-cyan-400 to-blue-500',
      'from-blue-400 to-indigo-500',
    ]
    const index = (article.id || 1) % gradients.length
    return gradients[index]
  }

  return (
    <article
      className={[
        'group relative flex flex-col overflow-hidden',
        'rounded-2xl border',
        // Background — use CSS variables for dark mode support
        'bg-card text-card-foreground',
        'border-border',
        // Shadow on hover — dark mode variant from theme
        'transition-all duration-200 ease-out',
        'hover:-translate-y-1',
        'dark:hover:shadow-card-hover-dark',
        // Use custom shadow token from config
        'hover:shadow-card-hover',
        // Optional glow effect for emphasis sections
        'dark:bg-black/60 bg-black/40',
        'dark:border-white/10 border-white/10',
        'backdrop-blur-sm',
        'p-8',
        className, // allow override per instance
      ].join(' ')}
    >
      {/* Decorative hover glow — correctly aria-hidden */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-transparent"
      />

      <div className="relative z-10 flex flex-col gap-6">

        {/* ── Meta row — date + read time ─────────────────────────── */}
        {/* Both are metadata → use text-xs (12px), not text-sm (14px) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            <Calendar
              size={13}
              // Use theme colour variable — works in light/dark
              className="text-emerald-500 dark:text-emerald-400"
              aria-hidden="true"
            />
            <time
              dateTime={new Date(article.date).toISOString()}
              className="text-muted-foreground"
            >
              {getDate()}
            </time>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            <Clock
              size={13}
              className="text-teal-500 dark:text-teal-400"
              aria-hidden="true"
            />
            <span className="text-muted-foreground">
              {getReadTime()}
            </span>
          </div>
        </div>

        {/* ── Title — card h3 under section h2 ────────────────────── */}
        {/* TYPE: text-xl = 20px/1.5 (not text-lg which is 18px pull-quote) */}
        <h3 className="text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
          {article.title}
        </h3>

        {/* ── Excerpt — body copy ─────────────────────────────────── */}
        {/* TYPE: text-base = 16px/1.75 (not text-sm)
            line-clamp-3 prevents cards from blowing up height */}
        <p className="text-base leading-relaxed text-muted-foreground line-clamp-3">
          {article.summary}
        </p>

        {/* ── Footer — CTA link + accent bar ──────────────────────── */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
        {/*
            FIX: was styled div with onClick — now proper <a>
            TYPE: text-sm = 14px (UI chrome, not body)
            Global :focus-visible adds ring automatically
          */}
          <a
            href={`/blog/${article.id}`}
            onClick={(e) => {
              // Prevent default if you're handling routing via onClick prop
              e.preventDefault()
              onClick?.()
            }}
            className={[
              'inline-flex items-center gap-2 text-sm font-semibold',
              // Theme colours for light/dark
              'text-emerald-600 dark:text-emerald-400',
              'transition-all duration-300',
              // Underline grows on hover
              'underline-offset-4 hover:underline',
              // Focus styles handled by global :focus-visible rule
              'rounded-sm outline-none',
            ].join(' ')}
            aria-label={`Read full article: ${article.title}`}
          >
            Read Article
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          {/* Decorative gradient bar — aria-hidden */}
          <div
            aria-hidden="true"
            className={[
              'h-1.5 w-12 rounded-full bg-gradient-to-r',
              getAccentGradient(),
              'transition-all duration-500',
              'group-hover:w-20',
            ].join(' ')}
          />
        </div>

      </div>
    </article>
  )
}