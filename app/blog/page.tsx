"use client"

import React, { useState } from 'react'
// Import Components
import Navbar from '@/components/ui/Navbar-blog'
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
      <Navbar onBackClick={handleBackToList} isArticleView={currentView === 'article'} />

      {currentView === 'list' ? (
        <>
          <Header />
          <BlogList articles={articlesData.sections} onArticleClick={handleArticleClick} />
        </>
      ) : (
        <ArticleView article={selectedArticle} onBack={handleBackToList} />
      )}

      <footer className="border-t border-gray-800 py-8 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          <p className="mb-2">© 2025 Abu. All rights reserved.</p>
          <p className="text-sm">Built with Next.js, TypeScript & shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}