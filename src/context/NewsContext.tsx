import React, { useEffect, useState, createContext, useContext } from 'react';
import { NewsArticle, INITIAL_NEWS, Category } from '../data/newsData';
import { useLanguage } from './LanguageContext';
interface NewsContextType {
  articles: NewsArticle[];
  addArticle: (article: Omit<NewsArticle, 'id' | 'views' | 'date'>) => void;
  updateArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteArticle: (id: string) => void;
  getArticle: (id: string) => NewsArticle | undefined;
  searchArticles: (query: string) => NewsArticle[];
  filterByCategory: (category: Category | 'All') => NewsArticle[];
  getTrending: () => NewsArticle[];
  announcement: string | null;
  setAnnouncement: (text: string | null) => void;
}
const NewsContext = createContext<NewsContextType | undefined>(undefined);
export function NewsProvider({ children }: {children: React.ReactNode;}) {
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [announcement, setAnnouncement] = useState<string | null>(
    'Welcome to UniNews - The official university news portal!'
  );
  const { lang } = useLanguage();
  // Load from local storage if available (simulating persistence)
  useEffect(() => {
    const storedArticles = localStorage.getItem('uniNews_articles');
    if (storedArticles) {
      try {
        setArticles(JSON.parse(storedArticles));
      } catch (e) {
        console.error('Failed to parse stored articles', e);
      }
    }
  }, []);
  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('uniNews_articles', JSON.stringify(articles));
  }, [articles]);
  const addArticle = (
  newArticleData: Omit<NewsArticle, 'id' | 'views' | 'date'>) =>
  {
    const newArticle: NewsArticle = {
      ...newArticleData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setArticles((prev) => [newArticle, ...prev]);
  };
  const updateArticle = (id: string, updatedData: Partial<NewsArticle>) => {
    setArticles((prev) =>
    prev.map((article) =>
    article.id === id ?
    {
      ...article,
      ...updatedData
    } :
    article
    )
    );
  };
  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };
  const getArticle = (id: string) => {
    return articles.find((article) => article.id === id);
  };
  const searchArticles = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return articles.filter((article) => {
      if (article.isDraft) return false;
      // Check main content (UZ)
      if (
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery))
      {
        return true;
      }
      // Check translations
      if (article.translations?.en) {
        if (
        article.translations.en.title.toLowerCase().includes(lowerQuery) ||
        article.translations.en.description.
        toLowerCase().
        includes(lowerQuery) ||
        article.translations.en.content.toLowerCase().includes(lowerQuery))
        {
          return true;
        }
      }
      if (article.translations?.ru) {
        if (
        article.translations.ru.title.toLowerCase().includes(lowerQuery) ||
        article.translations.ru.description.
        toLowerCase().
        includes(lowerQuery) ||
        article.translations.ru.content.toLowerCase().includes(lowerQuery))
        {
          return true;
        }
      }
      return false;
    });
  };
  const filterByCategory = (category: Category | 'All') => {
    if (category === 'All') {
      return articles.filter((a) => !a.isDraft);
    }
    return articles.filter(
      (article) => !article.isDraft && article.category === category
    );
  };
  const getTrending = () => {
    return [...articles].
    filter((a) => !a.isDraft).
    sort((a, b) => b.views - a.views).
    slice(0, 5);
  };
  return (
    <NewsContext.Provider
      value={{
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticle,
        searchArticles,
        filterByCategory,
        getTrending,
        announcement,
        setAnnouncement
      }}>

      {children}
    </NewsContext.Provider>);

}
export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}