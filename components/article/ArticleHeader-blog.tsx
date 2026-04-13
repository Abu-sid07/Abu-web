import React from 'react'
import { Clock, Eye, Share2, Calendar, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Article } from '../../types/article'

// Helper functions
const getDate = (id: number) => {
  const dates = ['21 Jan 2025', '28 Dec 2024', '10 Nov 2024', '5 Oct 2024']
  return dates[id - 1] || 'Jan 2025'
}

const getReadTime = (id: number) => {
  const times = ['7 min read', '5 min read', '6 min read', '4 min read']
  return times[id - 1] || '5 min read'
}

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-14 relative"
    >
      {/* Decorative blurry background glow */}
      <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center space-x-2 md:space-x-3 text-sm mb-6">
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-medium tracking-wide">
            Development
          </span>
          <ChevronRight size={14} className="text-gray-600 hidden md:block" />
          <div className="flex items-center space-x-2 text-gray-400">
            <Calendar size={14} className="text-emerald-500" />
            <span>{getDate(article.id)}</span>
          </div>
          <span className="text-gray-600 hidden md:block">•</span>
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock size={14} className="text-teal-500" />
            <span>{getReadTime(article.id)}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
          {article.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-white/10 mt-8 gap-4 sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-emerald-400 to-teal-600">
              <div className="w-full h-full bg-black rounded-full p-2 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-base">Abu.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Developer</p>
            </div>
          </div>

          <div className="flex items-center space-x-5 text-sm text-gray-400 bg-white/5 py-2 px-4 rounded-full border border-white/5">
            <div className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer">
              <Eye size={16} className="text-emerald-500" />
              <span>{Math.floor(Math.random() * 900) + 100} views</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <button className="flex items-center space-x-1.5 hover:text-white transition-colors group">
              <Share2 size={16} className="group-hover:text-emerald-500 transition-colors" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleHeader