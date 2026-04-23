"use client"

import React, { useState, useEffect, useRef } from 'react';
import { MinimalistHeroDemo } from '@/components/MinimalistHeroDemo';
import About from '@/components/ui/About';
import Skills from '@/components/ui/Skills';
import Projects from '@/components/ui/Projects';
import Experience from '@/components/ui/Experience';
import ProjectGallery from '@/components/ui/CircularGallery';
import Link from 'next/link';
import Footer from '@/components/ui/Footer';
import {
  HomeIcon,
  LinkedinIcon,
  FileTextIcon,
  GithubIcon,
  MailIcon,
  SunIcon,
  MoonIcon,
  BookOpenIcon,
} from 'lucide-react';

// ─────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  external: boolean;
  sep?: boolean;
  action?: () => void;
  sectionId?: string; // FIX 1.1 — link nav items to sections
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────

// FIX 1.1 — section IDs to watch for active state
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'gallery'];

// ─────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────

// FIX 1.1 — hook to track which section is currently in view
function useActiveSection(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Track visibility ratio of each section
    const visibilityMap: Record<string, number> = {};

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap[id] = entry.intersectionRatio;

            // Find which section has the highest visibility
            const mostVisible = Object.entries(visibilityMap).reduce(
              (max, [sectionId, ratio]) =>
                ratio > max.ratio ? { id: sectionId, ratio } : max,
              { id: 'hero', ratio: 0 }
            );

            if (mostVisible.ratio > 0) {
              setActiveSection(mostVisible.id);
            }
          });
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}

// FIX 1.2 — hook to track if user has scrolled past threshold
function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    // Use passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

// ─────────────────────────────────────────
// DOCK NAV COMPONENT
// ─────────────────────────────────────────

function DockNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

  // FIX 1.1 — track active section
  const activeSection = useActiveSection(SECTION_IDS);

  // FIX 1.2 — track scroll position for background change
  const isScrolled = useScrolled(10);

  // FIX 1.4 — ref to track keyboard focus inside dock
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const nowDark = html.classList.toggle('dark');
    setIsDark(nowDark);
    localStorage.setItem('theme', nowDark ? 'dark' : 'light');
  };

  const navItems: NavItem[] = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '#hero',
      external: false,
      sectionId: 'hero', // FIX 1.1
    },
    {
      icon: BookOpenIcon,
      label: 'Blog',
      href: '/blog',
      external: false,
      sep: true,
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abusid07',
      external: true,
      sep: true,
    },
    {
      icon: FileTextIcon,
      label: 'Resume',
      href: '/resume.pdf',
      external: true,
    },
    {
      icon: GithubIcon,
      label: 'GitHub',
      href: 'https://github.com/Abu-sid07',
      external: true,
    },
    {
      icon: MailIcon,
      label: 'Gmail',
      href: 'mailto:abubackersiddique311@gmail.com',
      external: false,
      sep: true,
    },
    {
      icon: isDark ? SunIcon : MoonIcon,
      label: isDark ? 'Light mode' : 'Dark mode',
      href: '#',
      external: false,
      action: toggleTheme,
    },
  ];

  const getSize = (index: number): number => {
    if (hoveredIndex === null) return 40;
    const diff = Math.abs(index - hoveredIndex);
    if (diff === 0) return 58;
    if (diff === 1) return 48;
    return 40;
  };

  const getY = (index: number): number => {
    if (hoveredIndex === null) return 0;
    const diff = Math.abs(index - hoveredIndex);
    if (diff === 0) return -12;
    if (diff === 1) return -6;
    return 0;
  };

  // FIX 1.1 — check if nav item matches active section
  const isActive = (item: NavItem): boolean => {
    if (!item.sectionId) return false;
    return activeSection === item.sectionId;
  };

  return (
    <>
      {/* 
        ─────────────────────────────────────
        FIX 1.5 — Skip to content link
        Hidden visually but visible on focus
        First focusable element on the page
        ─────────────────────────────────────
      */}
      <a
        href="#main-content"
        className={[
          // Always in DOM, only visible on focus
          'fixed top-4 left-4 z-[9999]',
          'px-4 py-2 rounded-lg',
          'bg-background border border-border',
          'text-sm font-medium text-foreground',
          'shadow-lg',
          // Hide when not focused
          '-translate-y-20 opacity-0',
          // Show on focus
          'focus:translate-y-0 focus:opacity-100',
          'transition-all duration-200',
          // FIX 1.3 — clear focus outline
          'focus:outline-2 focus:outline-offset-2 focus:outline-blue-500',
        ].join(' ')}
      >
        Skip to main content
      </a>

      {/* 
        ─────────────────────────────────────
        FIX 1.2 — Dock background changes on scroll
        Uses isScrolled to add backdrop blur
        and stronger border when scrolled
        ─────────────────────────────────────
      */}
      <div
        ref={dockRef}
        role="navigation"
        aria-label="Main navigation"
        className={[
          'flex items-end gap-1',
          'rounded-2xl px-2 sm:px-3',
          // FIX 1.6 — taller on mobile for bigger tap targets
          'h-[58px] sm:h-[58px]',
          'transition-all duration-300',
          // FIX 1.2 — change background on scroll
          isScrolled
            ? 'bg-background/95 border border-border/80 backdrop-blur-md shadow-lg'
            : 'bg-background/60 border border-border/40 backdrop-blur-sm shadow-sm',
        ].join(' ')}
      >
        {navItems.map((item, index) => {
          const size = getSize(index);
          const y = getY(index);
          const isHovered = hoveredIndex === index;
          const active = isActive(item); // FIX 1.1
          const IconEl = item.icon;

          // FIX 1.6 — ensure minimum 44px tap target on mobile
          // We keep the visual size from getSize but
          // the clickable area is always at least 44px
          const MIN_TAP_SIZE = 44;
          const tapSize = Math.max(size, MIN_TAP_SIZE);

          return (
            <React.Fragment key={item.label}>
              {item.sep && (
                <div className="w-px h-7 bg-border/50 mx-1 self-center flex-shrink-0" />
              )}

              <div
                className="relative flex items-center justify-center flex-shrink-0"
                style={{
                  // FIX 1.6 — outer wrapper uses tap size
                  width: tapSize,
                  height: tapSize,
                  transform: `translateY(${y}px)`,
                  transition:
                    'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* 
                  ───────────────────────────
                  Tooltip
                  ───────────────────────────
                */}
                <span
                  role="tooltip"
                  id={`tooltip-${item.label}`}
                  className={[
                    'absolute left-1/2 pointer-events-none z-50',
                    'whitespace-nowrap rounded-lg',
                    'bg-[#18181b] dark:bg-[#f4f4f5]',
                    'px-2 py-1 text-[11px] font-medium',
                    'text-white dark:text-black',
                    'transition-all duration-150',
                  ].join(' ')}
                  style={{
                    bottom: 'calc(100% + 10px)',
                    transform: `translateX(-50%) translateY(${isHovered ? 0 : 6}px)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  {item.label}
                  {/* Tooltip arrow */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
                    style={{ borderTopColor: isDark ? '#f4f4f5' : '#18181b' }}
                  />
                </span>

                {/* 
                  ───────────────────────────
                  FIX 1.1 — Active indicator dot
                  Shows under icon when section is active
                  ───────────────────────────
                */}
                {active && (
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute bottom-1 left-1/2 -translate-x-1/2',
                      'w-1 h-1 rounded-full',
                      'bg-blue-500 dark:bg-blue-400',
                      'transition-opacity duration-200',
                    ].join(' ')}
                  />
                )}

                {/* 
                  ───────────────────────────
                  Action button (theme toggle)
                  ───────────────────────────
                */}
                {item.action ? (
                  <button
                    onClick={item.action}
                    aria-label={item.label}
                    aria-describedby={`tooltip-${item.label}`}
                    // FIX 1.3 — clear focus outline
                    className={[
                      'flex items-center justify-center',
                      'rounded-xl text-foreground transition-colors',
                      // FIX 1.3 — visible focus ring
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-blue-500',
                      'focus-visible:ring-offset-2',
                      'focus-visible:ring-offset-background',
                    ].join(' ')}
                    style={{
                      // Visual icon size
                      width: size,
                      height: size,
                      background: isHovered ? 'hsl(var(--muted))' : 'transparent',
                      transition:
                        'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.15s ease',
                    }}
                    // FIX 1.4 — show tooltip on keyboard focus too
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    <IconEl
                      aria-hidden="true"
                      style={{
                        width: size * 0.46,
                        height: size * 0.46,
                        transition:
                          'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                    />
                  </button>
                ) : (
                  /* 
                    ─────────────────────────
                    Nav Link
                    ─────────────────────────
                  */
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.label}
                    aria-describedby={`tooltip-${item.label}`}
                    // FIX 1.1 — aria-current for active section link
                    aria-current={active ? 'page' : undefined}
                    // FIX 1.3 — visible focus ring
                    className={[
                      'flex items-center justify-center',
                      'rounded-xl transition-colors',
                      // FIX 1.1 — active state color
                      active
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-foreground',
                      // FIX 1.3 — keyboard focus ring
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-blue-500',
                      'focus-visible:ring-offset-2',
                      'focus-visible:ring-offset-background',
                    ].join(' ')}
                    style={{
                      // Visual icon size
                      width: size,
                      height: size,
                      background: isHovered
                        ? 'hsl(var(--muted))'
                        : active
                          ? 'hsl(var(--muted) / 0.6)'
                          : 'transparent',
                      transition:
                        'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.15s ease, color 0.15s ease',
                    }}
                    // FIX 1.4 — tooltip shows on keyboard focus
                    onFocus={() => setHoveredIndex(index)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    <IconEl
                      aria-hidden="true"
                      style={{
                        width: size * 0.46,
                        height: size * 0.46,
                        transition:
                          'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                    />
                  </Link>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

// ─────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────

export default function Home() {
  // Restore theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <main
      id="main-content" // FIX 1.5 — skip link target
      className="w-full"
      // FIX 1.5 — tabIndex so skip link can focus this element
      tabIndex={-1}
    >
      <section id="hero" className="min-h-screen w-full">
        <MinimalistHeroDemo />
      </section>

      <section id="about" className="w-full">
        <About />
      </section>

      <section id="skills" className="w-full">
        <Skills />
      </section>

      <section id="projects" className="w-full">
        <Projects />
      </section>

      <section id="experience" className="w-full">
        <Experience />
      </section>

      <section
        id="gallery"
        className="w-full"
        style={{ height: '600px' }}
      >
        <ProjectGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
        />
      </section>

      {/* Fixed dock — stays above all content */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-50 px-4">
        <DockNav />
      </div>

      {/* Spacer so last section is not hidden behind dock */}
      <div className="h-24" aria-hidden="true" />

      <Footer />
      
    </main>
  );
}