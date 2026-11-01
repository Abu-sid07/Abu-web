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
    <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-stone-600 dark:text-stone-400 mb-2 font-sans">
      {text}
    </p>
  )
}

export function SHeading({ text }: { text: string }) {
  return (
    <h2 className="font-serif text-[18px] sm:text-[20px] md:text-[22px] font-bold text-stone-900 dark:text-stone-50 leading-snug mb-3">
      {text}
    </h2>
  )
}

// Fixed BlogImg with max-height + object-fit
export function BlogImg({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 680px) 100vw, 680px"
          className="object-cover object-top"
        />
      </div>
      {caption && (
        <figcaption className="border-t border-stone-200 bg-white px-4 py-2.5 text-xs italic text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
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
        className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400
                 hover:text-stone-800 dark:hover:text-stone-100 transition-colors mb-6 sm:mb-8 group"
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
      className={`mt-8 sm:mt-10 px-4 sm:px-6 py-4 sm:py-5 bg-white dark:bg-stone-900 rounded-xl border-l-[4px] ${accentColor} border border-stone-100 dark:border-stone-800`}
    >
      <p className="font-serif text-[15px] sm:text-[16px] italic text-stone-700 dark:text-stone-300 leading-[1.8]">
        "{text}"
      </p>
      <footer className="mt-3 sm:mt-4 text-[12px] sm:text-[13px] text-stone-600 dark:text-stone-400 font-sans">
        — {author}
      </footer>
    </blockquote>
  )
}

export function PostSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-7 sm:py-9 border-b border-stone-100 dark:border-stone-800/60">
      {children}
    </section>
  )
}
