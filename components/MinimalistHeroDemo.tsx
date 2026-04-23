'use client'

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {

  const socialLinks = [
    {
      icon: Facebook,
      href: '#',
      // FIX — every social link now has a label
      label: 'Visit my Facebook profile',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/abu_ibnu_rasool/',
      label: 'Visit my Instagram profile',
    },
    {
      icon: Twitter,
      href: 'https://x.com/abu_ibnu_rasool',
      label: 'Visit my X (Twitter) profile',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/abusid07/',
      label: 'Visit my LinkedIn profile',
    },
  ];

  return (
    <MinimalistHero
      logoText="Abu's."
      mainText="Passionate about creating modern, responsive, and user-friendly web experiences. I turn ideas into interactive digital products."
      // FIX 2.5 — subtitle and role now passed as props
      subtitle="Available for work"
      role="Building fast, accessible, modern interfaces"
      readMoreLink="#about"
      resumeLink="/abu cv.pdf"
      imageSrc="/port.png"
      imageAlt="Portrait of Abu, Frontend Developer"
      socialLinks={socialLinks}
      locationText="Tamil Nadu, India"
    />
  );
};

export { MinimalistHeroDemo };