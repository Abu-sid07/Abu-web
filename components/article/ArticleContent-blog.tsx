"use client"

import React, { useState, useEffect } from 'react'
import ArticleHeader from './ArticleHeader-blog'
import MediaGallery from './MediaGallery-blog'
import TableOfContents from './TableOfContents-blog'
import { Article, ContentPoint } from '../../types/article'

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections: ContentPoint[] = article.content_points || []
      // 150px offset accounts for fixed navbar and margin
      const scrollPosition = window.scrollY + 150 
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(`section-${i}`)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [article])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
      <div className="lg:col-span-2">
        <ArticleHeader article={article} />

        {/* Introduction Section */}
        <div id="section-intro" className="mb-12">
          <div className="border-l-4 border-emerald-500 pl-6 py-2 mb-8 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-r-lg">
            <h2 className="text-3xl font-bold text-white tracking-tight">Introduction</h2>
          </div>
          <p className="text-gray-300 leading-relaxed mb-8 text-lg md:text-xl font-light">{article.summary}</p>
          {(article.institution || article.company) && (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-xl shadow-emerald-500/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {article.institution && (<div><span className="text-gray-500">Institution:</span><p className="text-white font-medium">{article.institution}</p></div>)}
                {article.course && (<div><span className="text-gray-500">Course:</span><p className="text-white font-medium">{article.course}</p></div>)}
                {article.duration && (<div><span className="text-gray-500">Duration:</span><p className="text-white font-medium">{article.duration}</p></div>)}
                {article.company && (<div><span className="text-gray-500">Company:</span><p className="text-white font-medium">{article.company}</p></div>)}
                {article.role && (<div><span className="text-gray-500">Role:</span><p className="text-white font-medium">{article.role}</p></div>)}
                {article.teaching_schedule && (<div className="md:col-span-2"><span className="text-gray-500">Schedule:</span><p className="text-white font-medium">{article.teaching_schedule}</p></div>)}
              </div>
            </div>
          )}
        </div>

        {/* Content Points */}
        {article.content_points && article.content_points.map((point: ContentPoint, index: number) => (
          <div key={index} id={`section-${index}`} className="mb-16 scroll-mt-32">
            <div className="border-l-4 border-teal-500 pl-6 py-2 mb-8 bg-gradient-to-r from-teal-500/10 to-transparent rounded-r-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{point.heading}</h2>
            </div>
            {point.description && <p className="text-gray-300 leading-relaxed mb-6 text-lg md:text-xl font-light">{point.description}</p>}
            {point.details && <p className="text-gray-400 leading-relaxed mb-8 text-lg md:text-xl font-light">{point.details}</p>}
            {point.lessons && (<ul className="space-y-3 mb-6">{point.lessons.map((lesson: string, i: number) => (<li key={i} className="flex items-start space-x-3"><span className="text-emerald-400 mt-1 text-xl">•</span><span className="text-gray-300 text-lg">{lesson}</span></li>))}</ul>)}
            {point.values && (<ul className="space-y-3 mb-6">{point.values.map((value: string, i: number) => (<li key={i} className="flex items-start space-x-3"><span className="text-emerald-400 mt-1 text-xl">✓</span><span className="text-gray-300 text-lg">{value}</span></li>))}</ul>)}
            {point.skills && (<div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8 mb-10 shadow-xl shadow-emerald-500/5 backdrop-blur-md"><ul className="grid grid-cols-1 md:grid-cols-2 gap-4">{point.skills.map((skill: string, i: number) => (<li key={i} className="flex items-center space-x-3"><span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">✓</span><span className="text-gray-200">{skill}</span></li>))}</ul></div>)}
            <MediaGallery media={point.media} heading={point.heading} />
          </div>
        ))}

        {article.media && <MediaGallery media={article.media} heading={article.title} />}

        {article.note && (<div className="relative overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 border-l-4 border-l-cyan-500 rounded-r-2xl rounded-l-md p-8 mb-12 shadow-xl"><div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" /><p className="relative z-10 text-gray-300 italic text-lg md:text-xl font-light">{article.note}</p></div>)}
      </div>

      <div className="lg:col-span-1">
        <TableOfContents sections={article.content_points || []} activeSection={activeSection} />
      </div>
    </div>
  )
}

export default ArticleContent