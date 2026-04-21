"use client"

import React, { useState, useEffect } from 'react';
import { MinimalistHeroDemo } from '@/components/MinimalistHeroDemo';
import About from '@/components/ui/About';
import Skills from '@/components/ui/Skills';
import Projects from '@/components/ui/Projects';
import Experience from '@/components/ui/Experience';
import ProjectGallery from '@/components/ui/CircularGallery';
import Link from 'next/link';
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

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  external: boolean;
  sep?: boolean;
  action?: () => void;
}

function DockNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(false);

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
    },
    {
      icon: BookOpenIcon,
      label: 'Blog',
      href: 'http://localhost:3000/blog',
      external: true,
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

  return (
    <div
      className="flex items-end gap-1 bg-background border border-border/40 rounded-2xl px-2 sm:px-3 h-[54px] sm:h-[58px]"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}
    >
      {navItems.map((item, index) => {
        const size = getSize(index);
        const y = getY(index);
        const isHovered = hoveredIndex === index;
        const IconEl = item.icon;

        return (
          <React.Fragment key={item.label}>
            {item.sep && (
              <div className="w-px h-7 bg-border/50 mx-1 self-center flex-shrink-0" />
            )}

            <div
              className="relative flex items-center justify-center flex-shrink-0 cursor-pointer"
              style={{
                width: size,
                height: size,
                transform: `translateY(${y}px)`,
                transition:
                  'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <span
                className="absolute left-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg bg-[#18181b] dark:bg-[#f4f4f5] px-2 py-1 text-[11px] font-medium text-white dark:text-black"
                style={{
                  bottom: 'calc(100% + 10px)',
                  transform: `translateX(-50%) translateY(${isHovered ? 0 : 6}px)`,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.12s ease, transform 0.12s ease',
                }}
              >
                {item.label}
                <span
                  className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent"
                  style={{ borderTopColor: isDark ? '#f4f4f5' : '#18181b' }}
                />
              </span>

              {/* Action button (theme toggle) or Link */}
              {item.action ? (
                <button
                  onClick={item.action}
                  aria-label={item.label}
                  className="flex items-center justify-center w-full h-full rounded-xl text-foreground transition-colors"
                  style={{
                    background: isHovered ? 'hsl(var(--muted))' : 'transparent',
                  }}
                >
                  <IconEl
                    style={{
                      width: size * 0.46,
                      height: size * 0.46,
                      transition:
                        'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  className="flex items-center justify-center w-full h-full rounded-xl text-foreground transition-colors"
                  style={{
                    background: isHovered ? 'hsl(var(--muted))' : 'transparent',
                  }}
                >
                  <IconEl
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
  );
}

export default function Home() {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <main className="w-full">
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
      
      {/* CircularGallery — showcase your projects visually */}
      <section id="gallery" className="w-full" style={{ height: '600px' }}>
        <ProjectGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
        />
      </section>

      {/* Fixed dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center z-50 px-4">
        <DockNav />
      </div>

      {/* Spacer so last section isn't hidden behind dock */}
      <div className="h-24" />
    </main>
  );
}