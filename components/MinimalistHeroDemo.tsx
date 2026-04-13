//components/MinimalistHeroDemo.tsx
'use client'

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'RESUME', href: '#experience' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
    { label: 'BLOGS', href: '/blog' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: 'https://www.instagram.com/abu_ibnu_rasool/' },
    { icon: Twitter, href: 'https://x.com/abu_ibnu_rasool' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abusid07/' },
  ];

  return (
    <MinimalistHero
      logoText="Abu's."
      navLinks={navLinks}
      mainText="Hi! I’m Abu, a passionate frontend developer specializing in creating modern, responsive, and user-friendly web experiences. I love turning ideas into interactive digital products and continuously learning the latest web technologies."
      readMoreLink="#about"
      resumeLink="/abu cv.pdf"
      imageSrc="/port.png"
      imageAlt="A portrait of a person in a black turtleneck, in profile."
      overlayText={{
        part1: "Hi, I'm Abu",
        part2: 'Frontend Developer.',
      }}
      socialLinks={socialLinks}
      locationText="Tamil Nadu, India"
    />
  );
};

export { MinimalistHeroDemo };
