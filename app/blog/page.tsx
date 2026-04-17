"use client"

import React, { useState } from 'react'
// Import Components
import { Dock, DockIcon } from '@/components/ui/Dock'
import Header from '@/components/ui/Header-blog'
import BlogList from '@/components/ui/BlogList-blog'
import ArticleView from '@/components/article/ArticleView-blog'
// Import Types and Data
import { Article } from '../../types/article'
import { articlesData } from '../../data/articles'

export default function BlogPage() {
  const [currentView, setCurrentView] = useState<'list' | 'article'>('list')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setCurrentView('article')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedArticle(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Dock Navbar */}
      <div className="flex justify-center pt-6 pb-4">
        <Dock>
          <DockIcon>
            <a href="/">Home</a>
          </DockIcon>
          <DockIcon>
            <a href="/blog">Blog</a>
          </DockIcon>
          <DockIcon>
            <a href="/projects">Projects</a>
          </DockIcon>
          <DockIcon>
            <a href="/contact">Contact</a>
          </DockIcon>
        </Dock>
      </div>

      {currentView === 'list' ? (
        <>
          <Header />
          <BlogList articles={articlesData.sections} onArticleClick={handleArticleClick} />
        </>
      ) : (
        <ArticleView article={selectedArticle} />
      )}


    </div>
  )
}