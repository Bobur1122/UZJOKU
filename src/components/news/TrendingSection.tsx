import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, EyeIcon } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { useLanguage } from '../../context/LanguageContext';
export function TrendingSection() {
  const { getTrending } = useNews();
  const { t, getArticleContent } = useLanguage();
  const trendingArticles = getTrending();
  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUpIcon className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">{t.home.trending}</h2>
      </div>

      <div className="space-y-6">
        {trendingArticles.map((article, index) => {
          const content = getArticleContent(article);
          return (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group flex items-start space-x-4">

              <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary transition-colors">
                {index + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                  {content.title}
                </h3>
                <div className="flex items-center text-xs text-muted-foreground">
                  <EyeIcon className="h-3 w-3 mr-1" />
                  {article.views} {t.common.views}
                </div>
              </div>
              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />

              </div>
            </Link>);

        })}
      </div>
    </div>);

}