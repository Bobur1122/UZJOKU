import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, EyeIcon } from 'lucide-react';
import { NewsArticle } from '../../data/newsData';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';
interface NewsCardProps {
  article: NewsArticle;
}
export function NewsCard({ article }: NewsCardProps) {
  const { getCategoryName, getArticleContent } = useLanguage();
  const content = getArticleContent(article);
  const categoryColors: Record<string, string> = {
    Tadbirlar: 'bg-blue-100 text-blue-800',
    "E'lonlar": 'bg-yellow-100 text-yellow-800',
    Sport: 'bg-green-100 text-green-800',
    Stipendiyalar: 'bg-purple-100 text-purple-800',
    'Talabalar hayoti': 'bg-pink-100 text-pink-800'
  };
  return (
    <Link to={`/news/${article.id}`} className="group h-full block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 shadow-md flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={content.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-[1.02] contrast-105 saturate-105"
            loading="lazy" />

          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category] || 'bg-gray-100 text-gray-800'}`}>

              {getCategoryName(article.category)}
            </span>
          </div>
        </div>

        <CardContent className="p-5 flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
            {content.description}
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0 text-xs text-muted-foreground flex items-center justify-between border-t border-border/50 mt-auto">
          <div className="flex items-center space-x-4 pt-4 w-full">
            <div className="flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <UserIcon className="h-3 w-3 mr-1" />
              <span className="truncate max-w-[80px]">{article.author}</span>
            </div>
            <div className="flex items-center ml-auto">
              <EyeIcon className="h-3 w-3 mr-1" />
              {article.views}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>);

}
