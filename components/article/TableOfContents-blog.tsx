"use client"

import React, { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { ContentPoint } from '../../types/article'

interface TableOfContentsProps {
  sections: ContentPoint[];
  activeSection: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, activeSection }) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <div className={`${isSticky ? 'sticky top-24' : ''} hidden lg:block`}>
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-emerald-500/5 rounded-2xl p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative z-10 flex items-center space-x-3 mb-6">
          <BookOpen size={20} className="text-emerald-400" />
          <h3 className="text-white font-bold tracking-wide">Table of Contents</h3>
        </div>
        <div className="relative z-10 space-y-2">
          {sections.map((section, index) => (
            <button key={index} onClick={() => scrollToSection(index)} className={`w-full text-left text-sm py-2.5 px-4 rounded-xl transition-all duration-300 ${activeSection === index ? 'bg-emerald-500/10 text-emerald-400 border-l-2 border-emerald-500 font-semibold shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'}`}>
              {section.heading}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableOfContents