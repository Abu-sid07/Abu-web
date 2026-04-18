"use client"

import React, { useRef, useState } from 'react';
import { MinimalistHeroDemo } from '@/components/MinimalistHeroDemo';
import About from '@/components/ui/About';
import Skills from '@/components/ui/Skills';
import Projects from '@/components/ui/Projects';
import Experience from '@/components/ui/Experience';
import Link from 'next/link';
import {
  HomeIcon,
  PenLineIcon,
  LinkedinIcon,
  FileTextIcon,
  GithubIcon,
  MailIcon,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  external: boolean;
  sep?: boolean;
}

const navItems: NavItem[] = [
  { icon: HomeIcon,     label: "Home",     href: "#hero",                                  external: false },
  { icon: PenLineIcon,  label: "Blog",     href: "/blog",                                  external: false, sep: true },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/abusid07",   external: true  },
  { icon: FileTextIcon, label: "Resume",   href: "/resume.pdf",                            external: true  },
  { icon: GithubIcon,   label: "GitHub",   href: "https://github.com/Abu-sid07",           external: true  },
  { icon: MailIcon,     label: "Gmail",    href: "mailto:abubackersiddique311@gmail.com",  external: false },
]

function DockNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <div className="flex items-end gap-1 bg-background border border-border/40 rounded-2xl px-3 h-[58px]"
      style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.06)' }}>
      {navItems.map((item, index) => {
        const size = getSize(index);
        const y = getY(index);
        const isHovered = hoveredIndex === index;

        return (
          <React.Fragment key={item.label}>
            {item.sep && (
              <div className="w-px h-7 bg-border/50 mx-1 self-center flex-shrink-0" />
            )}
            <div
              className="relative flex items-center justify-center flex-shrink-0 cursor-pointer"
              style={{ width: size, height: size, transform: `translateY(${y}px)`, transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), transform 0.2s cubic-bezier(0.34,1.56,0.64,1)' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <span
                className="absolute left-1/2 pointer-events-none z-50 whitespace-nowrap rounded-lg bg-[#18181b] px-2 py-1 text-[11px] font-medium text-white"
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
                  style={{ borderTopColor: '#18181b' }}
                />
              </span>

              {/* Icon button */}
              <Link
                href={item.href}
                target={item.external ? '_blank' : '_self'}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center w-full h-full rounded-xl text-foreground transition-colors"
                style={{ background: isHovered ? 'hsl(var(--muted))' : 'transparent' }}
              >
                <item.icon
                  style={{
                    width: size * 0.46,
                    height: size * 0.46,
                    transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                />
              </Link>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <main className="w-full">

      <section id="hero" className="h-screen w-full">
        <MinimalistHeroDemo />
      </section>

      <section id="about" className="w-full bg-white">
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

      {/* Dillion Verma Exact Dock */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
        <DockNav />
      </div>

    </main>
  );
}