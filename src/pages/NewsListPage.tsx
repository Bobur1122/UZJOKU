import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import { NewsCard } from '../components/news/NewsCard';
import { SearchBar } from '../components/news/SearchBar';
import { CategoryFilter } from '../components/news/CategoryFilter';
import { Category } from '../data/newsData';
export function NewsListPage() {
  const { articles, searchArticles, filterByCategory } = useNews();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as Category | 'All' | null;
  const searchParam = searchParams.get('search');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    categoryParam || 'All'
  );
  const [filteredArticles, setFilteredArticles] = useState(articles);
  useEffect(() => {
    if (searchParam) {
      setFilteredArticles(searchArticles(searchParam));
      setSelectedCategory('All');
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      setFilteredArticles(filterByCategory(categoryParam));
    } else {
      setSelectedCategory('All');
      setFilteredArticles(filterByCategory('All'));
    }
  }, [searchParam, categoryParam, articles]);
  const handleCategoryChange = (category: Category | 'All') => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    searchParams.delete('search');
    setSearchParams(searchParams);
  };
  const handleSearch = (query: string) => {
    if (query) {
      searchParams.set('search', query);
      searchParams.delete('category');
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{t.news.title}</h1>
        <p className="text-muted-foreground text-lg mb-8">{t.news.subtitle}</p>
        <SearchBar onSearch={handleSearch} className="mx-auto mb-8" />
      </div>

      <div className="mb-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange} />

      </div>

      {searchParam &&
      <p className="mb-6 text-muted-foreground">
          {t.news.foundResults} {filteredArticles.length} {t.news.resultsFor} "
          <span className="font-semibold text-foreground">{searchParam}</span>"
        </p>
      }

      {filteredArticles.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) =>
        <NewsCard key={article.id} article={article} />
        )}
        </div> :

      <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
          <h3 className="text-xl font-semibold mb-2">{t.news.noResults}</h3>
          <p className="text-muted-foreground">{t.news.noResultsDesc}</p>
        </div>
      }
    </div>);

}