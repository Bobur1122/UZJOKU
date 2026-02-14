import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  SearchIcon,
  SendIcon,
  CheckCircleIcon } from
'lucide-react';
import { useNews } from '../context/NewsContext';
import { useLanguage } from '../context/LanguageContext';
import { NewsCard } from '../components/news/NewsCard';
import { TrendingSection } from '../components/news/TrendingSection';
import { CategoryFilter } from '../components/news/CategoryFilter';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/Label';
// TODO: O'z bot token va chat ID ni qo'ying
const TELEGRAM_BOT_TOKEN = '8583171943:AAGueXOYRRgvktQIWFsKNXbGhHg6o9eNNY4';
const TELEGRAM_CHAT_ID = '8204908192';
export function HomePage() {
  const { articles, filterByCategory } = useNews();
  const { t, getArticleContent } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // Telegram form state
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'>(
    'idle');
  const [errorDetail, setErrorDetail] = useState('');
  // Get news filtered by selected category
  const categoryNews = filterByCategory(selectedCategory as any).slice(0, 6);
  // Real-time search filtering
  const filteredNews = searchQuery.trim() ?
  articles.filter((article) => {
    if (article.isDraft) return false;
    const content = getArticleContent(article);
    return (
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.
      toLowerCase().
      includes(searchQuery.toLowerCase()) ||
      content.content.toLowerCase().includes(searchQuery.toLowerCase()));

  }) :
  categoryNews;
  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setIsSending(true);
    setSubmitStatus('idle');
    setErrorDetail('');
    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const body = {
        chat_id: TELEGRAM_CHAT_ID,
        text: `📰 Yangi xabar!\n\n👤 Ism: ${name}\n\n💬 Xabar:\n${message}`
      };
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.ok) {
        setSubmitStatus('success');
        setName('');
        setMessage('');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        console.error('Telegram API error:', data);
        setErrorDetail(data.description || 'Unknown error');
        setSubmitStatus('error');
      }
    } catch (error: any) {
      console.error('Network error:', error);
      setErrorDetail(error?.message || 'Network error');
      setSubmitStatus('error');
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent"></div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {'Jurnalistika universiteti yangiliklar Portali'}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <Button
              size="lg"
              variant="secondary"
              className="font-bold text-lg"
              onClick={() => navigate('/news')}>

              {t.hero.browseNews}
            </Button>
          </div>
        </div>
      </section>

      {/* Centered Search Section */}
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t.news.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t.news.subtitle}
          </p>

          <div className="flex items-center gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t.news.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-full border-muted-foreground/20 shadow-sm focus-visible:ring-primary" />

            </div>
            <Button className="h-12 px-6 rounded-full">
              {t.news.searchBtn}
            </Button>
          </div>
        </div>

        <div className="mb-10 mt-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSearchQuery('');
            }} />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* News Grid */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  {searchQuery ?
                  `${t.news.foundResults} ${filteredNews.length}` :
                  t.home.latestNews}
                </h2>
                {!searchQuery &&
                <Link
                  to="/news"
                  className="text-primary font-medium hover:underline flex items-center">

                    {t.home.viewAll} <ArrowRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                }
              </div>

              {filteredNews.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredNews.map((article) =>
                <NewsCard key={article.id} article={article} />
                )}
                </div> :

              <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                  <p className="text-muted-foreground text-lg">
                    {t.news.noResults}
                  </p>
                </div>
              }
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <TrendingSection />

            {/* Submit Story Form */}
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <h3 className="text-xl font-bold mb-2">{t.home.haveStory}</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {t.home.haveStoryDesc}
              </p>

              {submitStatus === 'success' ?
              <div className="bg-green-100 text-green-800 p-4 rounded-lg flex items-center justify-center flex-col text-center animate-in fade-in zoom-in duration-300">
                  <CheckCircleIcon className="h-12 w-12 mb-2 text-green-600" />
                  <p className="font-bold">{t.home.submitSuccess}</p>
                </div> :

              <form onSubmit={handleSubmitStory} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="text-xs font-medium">
                      {t.home.submitName}
                    </Label>
                    <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background h-9" />

                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="message" className="text-xs font-medium">
                      {t.home.submitMessage}
                    </Label>
                    <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="bg-background min-h-[80px] resize-none" />

                  </div>
                  {submitStatus === 'error' &&
                <p className="text-destructive text-xs font-medium">
                      {t.home.submitError}
                      {errorDetail ? `: ${errorDetail}` : ''}
                    </p>
                }
                  <Button type="submit" className="w-full" disabled={isSending}>
                    {isSending ?
                  <span className="animate-pulse">...</span> :

                  <>
                        <SendIcon className="h-4 w-4 mr-2" />
                        {t.home.submitStory}
                      </>
                  }
                  </Button>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}