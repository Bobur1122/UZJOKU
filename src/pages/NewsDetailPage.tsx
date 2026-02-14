import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, UserIcon, EyeIcon } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/Button';
import { NewsCard } from '../components/news/NewsCard';
export function NewsDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { getArticle, filterByCategory, updateArticle } = useNews();
  const { t, getCategoryName, getArticleContent } = useLanguage();
  const article = getArticle(id || '');
  // Increment views ONCE per session per article
  useEffect(() => {
    if (article && id) {
      const viewedKey = `uniNews_viewed_${id}`;
      const alreadyViewed = sessionStorage.getItem(viewedKey);
      if (!alreadyViewed) {
        sessionStorage.setItem(viewedKey, 'true');
        updateArticle(article.id, {
          views: article.views + 1
        });
      }
    }
  }, [id]);
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">{t.detail.articleNotFound}</h2>
        <Button onClick={() => navigate('/news')}>
          {t.detail.returnToNews}
        </Button>
      </div>);

  }
  const content = getArticleContent(article);
  // Related articles: same category, sorted by most viewed
  const relatedArticles = filterByCategory(article.category).
  filter((a) => a.id !== article.id).
  sort((a, b) => b.views - a.views).
  slice(0, 4);
  return (
    <article className="pb-20">
      {/* Cover Image */}
      <div className="w-full h-[400px] md:h-[500px] relative">
        <img
          src={article.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white container mx-auto">
          <Link
            to={`/news?category=${article.category}`}
            className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold mb-4 hover:bg-primary/90 transition-colors">

            {getCategoryName(article.category)}
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-4xl">
            {content.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm md:text-base text-white/90">
            <div className="flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {article.date}
            </div>
            <div className="flex items-center">
              <EyeIcon className="h-4 w-4 mr-2" />
              {article.views} {t.detail.views}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content — full width */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-8 pl-0 hover:pl-2 transition-all"
          onClick={() => navigate(-1)}>

          <ArrowLeftIcon className="h-4 w-4 mr-2" /> {t.detail.back}
        </Button>

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary">
          <p className="lead text-xl text-muted-foreground font-medium mb-8 border-l-4 border-primary pl-4">
            {content.description}
          </p>
          <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
            {content.content}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-muted-foreground text-sm">
            {t.detail.publishedIn}{' '}
            <span className="font-semibold text-foreground">
              {getCategoryName(article.category)}
            </span>
          </p>
        </div>
      </div>

      {/* Related Articles — horizontal at the bottom */}
      {relatedArticles.length > 0 &&
      <div className="container mx-auto px-4 pt-4 pb-12">
          <div className="border-t pt-10">
            <h3 className="text-3xl font-bold mb-8">{t.detail.relatedNews}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) =>
            <NewsCard key={related.id} article={related} />
            )}
            </div>
          </div>
        </div>
      }
    </article>);

}