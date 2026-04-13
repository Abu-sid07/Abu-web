"use client"

import React, { useEffect, useState } from "react"
import { Dock, DockIcon } from "./Dock" // assuming the Dock component is in the same folder; if Dock is exported from another file adjust path
import { cn } from "@/lib/utils"

interface DockBarProps {
  className?: string
  iconSize?: number
  darkMode?: boolean
}

const icons = [
  "next.js",
  "react",
  "typescript",
  "javascript",
  "html5",
  "css3",
  "vercel",
  "git",
  "github",
]

export function DockBar({ className, iconSize = 64, darkMode }: DockBarProps) {
  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    if (typeof darkMode === "boolean") {
      setIsDark(darkMode)
      return
    }
    const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")
    if (!mq) return
    setIsDark(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [darkMode])

  // If dark, use monochrome white icons (by adding /FFFFFF), otherwise default brand colors
  const getIconUrl = (slug: string) =>
    isDark ? `https://cdn.simpleicons.org/${slug}/FFFFFF` : `https://cdn.simpleicons.org/${slug}`

  return (
    <div className={cn("w-full flex justify-center", className)}>
      <Dock iconSize={iconSize} className="shadow-none">
        {icons.map((slug) => (
          <DockIcon
            key={slug}
            href="#"
            name={slug}
            src={getIconUrl(slug)}
            iconSize={iconSize}
          />
        ))}
      </Dock>
    </div>
  )
}
