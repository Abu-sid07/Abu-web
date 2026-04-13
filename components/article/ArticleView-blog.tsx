import React from 'react'
import ArticleContent from './ArticleContent-blog'
import { Article } from '../../types/article'

interface ArticleViewProps {
  article: Article | null;
  onBack: () => void; // Although not used here, keep for potential future use or consistency
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  if (!article) return <div className="pt-24 pb-20 px-6"><div className="max-w-7xl mx-auto">No article selected</div></div>
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ArticleContent article={article} />
      </div>
    </div>
  )
}

export default ArticleView