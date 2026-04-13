import React from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { Article } from '../../types/article'

// Helper functions
const getReadTime = (id: number) => {
  const times = ['7 min read', '5 min read', '6 min read', '4 min read']
  return times[id - 1] || '5 min read'
}

const getDate = (id: number) => {
  const dates = ['Jan 15 2025', 'Dec 28 2024', 'Nov 10 2024', 'Oct 5 2024']
  return dates[id - 1] || 'Jan 2025'
}

const getAccent = (id: number) => {
  const accents = ['from-emerald-400 to-teal-500', 'from-teal-400 to-cyan-500', 'from-cyan-400 to-blue-500', 'from-blue-400 to-indigo-500']
  return accents[id - 1] || 'from-emerald-400 to-teal-500'
}

interface BlogCardProps {
  article: Article;
  onClick: () => void;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

const BlogCard: React.FC<BlogCardProps> = ({ article, onClick }) => {
  return (
    <motion.div 
      variants={itemVariants}
      onClick={onClick} 
      className="group relative bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer overflow-hidden"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-5 text-sm font-medium text-gray-500">
            <div className="flex items-center space-x-2 bg-white/5 py-1 px-3 rounded-full border border-white/5">
              <Calendar size={14} className="text-emerald-400" />
              <span>{getDate(article.id)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 py-1 px-3 rounded-full border border-white/5">
              <Clock size={14} className="text-teal-400" />
              <span>{getReadTime(article.id)}</span>
            </div>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">{article.title}</h3>

        <p className="text-gray-400 mb-8 leading-relaxed text-lg line-clamp-2 md:line-clamp-none">{article.summary}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center text-emerald-400 font-semibold group-hover:gap-3 transition-all duration-300 text-sm md:text-base">
            <span>Read Article</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <div className={`h-1.5 w-12 bg-gradient-to-r ${getAccent(article.id)} rounded-full group-hover:w-20 transition-all duration-500`} />
        </div>
      </div>
    </motion.div>
  )
}

export default BlogCard