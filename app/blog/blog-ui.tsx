"use client"

// path: app/blog/blog-ui.tsx
// Shared primitives used by every blog post component.
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"

// ── Types ────────────────────────────────────────────────────────────────────

export interface BlogImage {
  src: string
  alt: string
  caption: string
  isGif?: boolean
}

// ── Small reusable atoms ──────────────────────────────────────────────────────

export function SLabel({ text }: { text: string }) {
  return (
    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-stone-400 dark:text-stone-500 mb-2 font-sans">
      {text}
    </p>
  )
}

export function SHeading({ text }: { text: string }) {
  return (
    <h2 className="font-serif text-[20px] sm:text-[22px] md:text-2xl font-bold text-stone-900 dark:text-stone-50 leading-snug mb-4">
      {text}
    </h2>
  )
}

// Fixed BlogImg with max-height + object-fit
export function BlogImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="rounded-2xl overflow-hidden border border-stone-800">
      <div className="relative w-full max-h-[480px] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
          style={{ maxHeight: "480px" }}
        />
      </div>
      {caption && (
        <figcaption className="px-4 py-2.5 text-xs text-stone-400 italic bg-stone-900">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-400 dark:text-stone-500
                 hover:text-stone-800 dark:hover:text-stone-100 transition-colors mb-8 sm:mb-10 group"
    >
      <ArrowLeftIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
      Back to all posts
    </button>
  )
}

export function ClosingQuote({
  text,
  author,
  accentColor = "border-l-blue-500",
}: {
  text: string
  author: string
  accentColor?: string
}) {
  return (
    <blockquote
      className={`mt-10 sm:mt-14 px-5 sm:px-7 py-5 sm:py-7 bg-white dark:bg-stone-900 rounded-xl sm:rounded-2xl border-l-[4px] ${accentColor} border border-stone-100 dark:border-stone-800`}
    >
      <p className="font-serif text-[16px] sm:text-[18px] italic text-stone-700 dark:text-stone-300 leading-[1.85]">
        "{text}"
      </p>
      <footer className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] text-stone-400 dark:text-stone-500 font-sans">
        — {author}
      </footer>
    </blockquote>
  )
}

export function PostSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-10 sm:py-12 border-b border-stone-100 dark:border-stone-800/60">
      {children}
    </section>
  )
}
