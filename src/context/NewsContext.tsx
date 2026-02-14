import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { NewsArticle, Category } from '../data/newsData';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabaseClient';
interface NewsContextType {
  articles: NewsArticle[];
  loading: boolean;
  addArticle: (article: ArticleInput) => Promise<void>;
  updateArticle: (id: string, article: ArticleUpdate) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  getArticle: (id: string) => NewsArticle | undefined;
  searchArticles: (query: string) => NewsArticle[];
  filterByCategory: (category: Category | 'All') => NewsArticle[];
  getTrending: () => NewsArticle[];
  announcement: string | null;
  setAnnouncement: (text: string | null) => Promise<void>;
  recordView: (articleId: string) => Promise<void>;
}
const NewsContext = createContext<NewsContextType | undefined>(undefined);

type ArticleInput = Omit<NewsArticle, 'id' | 'views' | 'date'> & {
  imageFile?: File | null;
};
type ArticleUpdate = Partial<Omit<NewsArticle, 'id' | 'views' | 'date'>> & {
  imageFile?: File | null;
};

type ArticleRow = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  image_url: string;
  author: string;
  date: string;
  views: number;
  is_draft: boolean;
  translations: NewsArticle['translations'] | null;
};

type SettingsRow = {
  id: number;
  announcement: string | null;
};

const mapRowToArticle = (row: ArticleRow): NewsArticle => ({
  id: row.id,
  title: row.title,
  description: row.description,
  content: row.content,
  category: row.category,
  imageUrl: row.image_url,
  author: row.author,
  date: row.date,
  views: row.views,
  isDraft: row.is_draft,
  translations: row.translations || undefined
});

const cleanPayload = (payload: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

const mapArticleToRow = (data: ArticleInput | ArticleUpdate) =>
  cleanPayload({
    title: data.title,
    description: data.description,
    content: data.content,
    category: data.category,
    image_url: data.imageUrl,
    author: data.author,
    is_draft: data.isDraft,
    translations:
      data.translations === undefined ? undefined : data.translations ?? null
  });

const getAnonId = () => {
  const key = 'uniNews_anon_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
};

export function NewsProvider({ children }: {children: React.ReactNode;}) {
  const { isAdmin } = useAuth();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const loadArticles = async () => {
    setLoading(true);
    let query = supabase.from('articles').select('*').order('date', {
      ascending: false
    });
    if (!isAdmin) {
      query = query.eq('is_draft', false);
    }
    const { data, error } = await query;
    if (error || !data) {
      console.error('Failed to load articles', error);
      setLoading(false);
      return;
    }
    setArticles(data.map(mapRowToArticle));
    setLoading(false);
  };

  const loadSettings = async () => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
    if (error && error.code !== 'PGRST116') {
      console.error('Failed to load settings', error);
      return;
    }
    if (!data) {
      const { data: created } = await supabase
        .from('settings')
        .upsert({ id: 1, announcement: null })
        .select('*')
        .single();
      if (created) {
        setAnnouncement(created.announcement ?? null);
      }
      return;
    }
    const settings = data as SettingsRow;
    setAnnouncement(settings.announcement ?? null);
  };

  useEffect(() => {
    loadArticles();
    loadSettings();
  }, [isAdmin]);

  const uploadArticleImage = async (file: File) => {
    const ext = file.name.split('.').pop() || 'png';
    const filePath = `posts/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from('news-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    if (error) throw error;
    return buildPublicUrl('news-images', filePath);
  };

  const addArticle = async (newArticleData: ArticleInput) => {
    let imageUrl = newArticleData.imageUrl;
    if (newArticleData.imageFile) {
      imageUrl = await uploadArticleImage(newArticleData.imageFile);
    }
    const payload = {
      ...mapArticleToRow({ ...newArticleData, imageUrl }),
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    const { data, error } = await supabase
      .from('articles')
      .insert(payload)
      .select('*')
      .single();
    if (error || !data) {
      console.error('Failed to add article', error);
      return;
    }
    setArticles((prev) => [mapRowToArticle(data as ArticleRow), ...prev]);
  };

  const updateArticle = async (id: string, updatedData: ArticleUpdate) => {
    let imageUrl = updatedData.imageUrl;
    if (updatedData.imageFile) {
      imageUrl = await uploadArticleImage(updatedData.imageFile);
    }
    const payload = mapArticleToRow({ ...updatedData, imageUrl });
    const { data, error } = await supabase
      .from('articles')
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    if (error || !data) {
      console.error('Failed to update article', error);
      return;
    }
    setArticles((prev) =>
      prev.map((article) =>
        article.id === id ? mapRowToArticle(data as ArticleRow) : article
      )
    );
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete article', error);
      return;
    }
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

  const setAnnouncementValue = async (text: string | null) => {
    const { data, error } = await supabase
      .from('settings')
      .upsert({ id: 1, announcement: text })
      .select('*')
      .single();
    if (error || !data) {
      console.error('Failed to update announcement', error);
      return;
    }
    const settings = data as SettingsRow;
    setAnnouncement(settings.announcement ?? null);
  };

  const recordView = async (articleId: string) => {
    const viewedKey = `uniNews_viewed_${articleId}`;
    if (localStorage.getItem(viewedKey)) return;
    localStorage.setItem(viewedKey, 'true');
    const anonId = getAnonId();
    const { data, error } = await supabase.rpc('record_article_view', {
      p_article_id: articleId,
      p_anon_id: anonId
    });
    if (error) {
      console.error('Failed to record view', error);
      return;
    }
    if (typeof data === 'number') {
      setArticles((prev) =>
        prev.map((article) =>
          article.id === articleId ? { ...article, views: data } : article
        )
      );
    }
  };

  const value = useMemo(
    () => ({
      articles,
      loading,
      addArticle,
      updateArticle,
      deleteArticle,
      getArticle,
      searchArticles,
      filterByCategory,
      getTrending,
      announcement,
      setAnnouncement: setAnnouncementValue,
      recordView
    }),
    [articles, loading, announcement]
  );

  return (
    <NewsContext.Provider
      value={value}>

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
