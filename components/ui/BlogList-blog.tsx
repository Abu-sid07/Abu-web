import React from 'react'
import { motion } from 'framer-motion'
import BlogCard from './BlogCard-blog'
import { Article } from '../../types/article'

interface BlogListProps {
  articles: Article[];
  onArticleClick: (a: Article) => void;
}

const BlogList: React.FC<BlogListProps> = ({ articles, onArticleClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="pb-20 px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-6"
      >
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} onClick={() => onArticleClick(article)} />
        ))}
      </motion.div>
    </div>
  )
}

export default BlogList