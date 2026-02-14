import React, { useEffect, useState, createContext, useContext } from 'react';
import { Category, NewsArticle } from '../data/newsData';
export type Language = 'uz' | 'en' | 'ru';
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: any;
  getCategoryName: (category: Category | 'All') => string;
  getArticleContent: (article: NewsArticle) => {
    title: string;
    description: string;
    content: string;
  };
}
const translations = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      news: 'Yangiliklar',
      categories: 'Ruknlar',
      headlineGenerator: 'Sarlavha Generatori',
      adminDashboard: 'Admin Paneli',
      logout: 'Chiqish',
      adminLogin: 'Admin Kirish'
    },
    categories: {
      all: 'Barchasi',
      tadbirlar: 'Tadbirlar',
      elonlar: "E'lonlar",
      sport: 'Sport',
      stipendiyalar: 'Stipendiyalar',
      talabalarHayoti: 'Talabalar hayoti'
    },
    hero: {
      title: 'Universitet Yangiliklar Portali',
      subtitle:
      "Kampus hayotidagi eng so'nggi yangiliklar, tadbirlar va e'lonlar uchun markaziy manba.",
      browseNews: "Yangiliklarni ko'rish",
      headlineGen: 'Sarlavha Generatori'
    },
    home: {
      latestNews: "So'nggi Yangiliklar",
      viewAll: "Barchasini ko'rish",
      haveStory: 'Sizda xabar bormi?',
      haveStoryDesc:
      'Biz sizdan eshitishni xohlaymiz! Yangiliklar, tadbirlar yoki muvaffaqiyat hikoyalaringizni yuboring.',
      submitStory: 'Xabar yuborish',
      submitName: 'Ismingiz',
      submitMessage: 'Xabaringiz',
      submitSuccess: 'Xabar yuborildi!',
      submitError: 'Xatolik yuz berdi',
      trending: 'Ommabop'
    },
    news: {
      title: 'Kampus Yangiliklari',
      subtitle:
      "Universitet bo'ylab barcha so'nggi yangiliklar va e'lonlarni ko'rib chiqing.",
      searchPlaceholder: 'Yangiliklarni qidirish...',
      searchBtn: 'Qidirish',
      noResults: 'Maqolalar topilmadi',
      noResultsDesc: "Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring.",
      foundResults: 'ta natija topildi:',
      resultsFor: 'uchun'
    },
    detail: {
      back: 'Orqaga',
      views: "ko'rishlar",
      share: 'Ulashish',
      relatedNews: "O'xshash Yangiliklar",
      noRelated: "O'xshash maqolalar topilmadi.",
      articleNotFound: 'Maqola topilmadi',
      returnToNews: 'Yangiliklarga qaytish',
      publishedIn: 'Rukn:'
    },
    admin: {
      dashboard: 'Admin Paneli',
      dashboardDesc: "Yangiliklar, tadbirlar va e'lonlarni boshqarish.",
      totalPosts: 'Jami maqolalar',
      published: 'Chop etilgan',
      drafts: 'Qoralamalar',
      totalViews: "Jami ko'rishlar",
      announcement: "Sayt E'loni",
      announcementPlaceholder: "Saytning yuqori qismi uchun e'lon matni...",
      updateAnnouncement: 'Yangilash',
      logo: 'Sayt logotipi',
      uploadLogo: 'Logo yuklash',
      currentLogo: 'Joriy logo',
      recentArticles: "So'nggi Maqolalar",
      addNewPost: "Yangi maqola qo'shish",
      createArticle: 'Maqola yaratish',
      editArticle: 'Maqolani tahrirlash',
      title: 'Sarlavha',
      category: 'Rukn',
      shortDesc: 'Qisqacha tavsif',
      imageUrl: 'Rasm URL manzili',
      imageFile: 'Yoki fayl yuklash',
      uploadImage: 'Rasm yuklash',
      orUploadFile: 'yoki fayl tanlang',
      fullContent: "To'liq mazmun",
      author: 'Muallif',
      saveDraft: 'Qoralama sifatida saqlash',
      cancel: 'Bekor qilish',
      update: 'Yangilash',
      create: 'Yaratish',
      deleteConfirm: "Ushbu maqolani o'chirmoqchimisiz?",
      login: 'Admin Kirish',
      loginDesc: "Boshqaruv paneliga kirish uchun ma'lumotlarni kiriting",
      username: 'Foydalanuvchi nomi',
      password: 'Parol',
      loginBtn: 'Kirish',
      protectedArea: 'Himoyalangan hudud. Faqat ruxsat etilgan xodimlar uchun.',
      invalidCredentials:
      "Noto'g'ri ma'lumotlar. admin / admin123 ni sinab ko'ring",
      backToDashboard: 'Panelga qaytish'
    },
    footer: {
      quickLinks: 'Tezkor havolalar',
      categories: 'Ruknlar',
      contactUs: "Biz bilan bog'lanish",
      rights: 'Barcha huquqlar himoyalangan.',
      desc: "Universitet yangiliklari, tadbirlar va e'lonlar uchun ishonchli manba."
    },
    headline: {
      title: 'AI Sarlavha Generatori',
      subtitle:
      'Professional jurnalistik sarlavhalar yaratish uchun mavzu kiriting.',
      topicLabel: 'Mavzu / Voqea tavsifi',
      topicPlaceholder:
      'Masalan: Yangi ilmiy bino ochilishi, Kontrakt narxlari...',
      generate: 'Sarlavha yaratish',
      generated: 'Yaratilgan sarlavhalar:',
      copy: 'Nusxalash'
    },
    common: {
      views: "ko'rishlar",
      search: 'Qidirish',
      loading: 'Yuklanmoqda...'
    }
  },
  en: {
    nav: {
      home: 'Home',
      news: 'News',
      categories: 'Categories',
      headlineGenerator: 'Headline Generator',
      adminDashboard: 'Admin Dashboard',
      logout: 'Logout',
      adminLogin: 'Admin Login'
    },
    categories: {
      all: 'All',
      tadbirlar: 'Events',
      elonlar: 'Announcements',
      sport: 'Sports',
      stipendiyalar: 'Scholarships',
      talabalarHayoti: 'Student Life'
    },
    hero: {
      title: 'University News Portal',
      subtitle:
      'Your central hub for the latest updates, events, announcements, and stories from campus life.',
      browseNews: 'Browse News',
      headlineGen: 'Headline Generator'
    },
    home: {
      latestNews: 'Latest News',
      viewAll: 'View All',
      haveStory: 'Have a story?',
      haveStoryDesc:
      'We want to hear from you! Submit your news tips, event announcements, or success stories.',
      submitStory: 'Submit Story',
      submitName: 'Your name',
      submitMessage: 'Your message',
      submitSuccess: 'Message sent!',
      submitError: 'Error occurred',
      trending: 'Trending Now'
    },
    news: {
      title: 'Campus News',
      subtitle:
      'Browse all the latest updates, stories, and announcements from across the university.',
      searchPlaceholder: 'Search news...',
      searchBtn: 'Search',
      noResults: 'No articles found',
      noResultsDesc: 'Try adjusting your search or filter criteria.',
      foundResults: 'results for',
      resultsFor: ''
    },
    detail: {
      back: 'Back',
      views: 'views',
      share: 'Share Article',
      relatedNews: 'Related News',
      noRelated: 'No related articles found.',
      articleNotFound: 'Article not found',
      returnToNews: 'Return to News',
      publishedIn: 'Published in'
    },
    admin: {
      dashboard: 'Admin Dashboard',
      dashboardDesc: 'Manage news, events, and announcements.',
      totalPosts: 'Total Posts',
      published: 'Published',
      drafts: 'Drafts',
      totalViews: 'Total Views',
      announcement: 'Site Announcement',
      announcementPlaceholder:
      'Enter a banner announcement for the top of the site...',
      updateAnnouncement: 'Update',
      logo: 'Site Logo',
      uploadLogo: 'Upload Logo',
      currentLogo: 'Current logo',
      recentArticles: 'Recent Articles',
      addNewPost: 'Add New Post',
      createArticle: 'Create New Article',
      editArticle: 'Edit Article',
      title: 'Title',
      category: 'Category',
      shortDesc: 'Short Description',
      imageUrl: 'Image URL',
      imageFile: 'Or Upload File',
      uploadImage: 'Upload Image',
      orUploadFile: 'or select file',
      fullContent: 'Full Content',
      author: 'Author',
      saveDraft: 'Save as Draft',
      cancel: 'Cancel',
      update: 'Update Article',
      create: 'Create Article',
      deleteConfirm: 'Are you sure you want to delete this article?',
      login: 'Admin Portal',
      loginDesc: 'Enter your credentials to access the dashboard',
      username: 'Username',
      password: 'Password',
      loginBtn: 'Login',
      protectedArea: 'Protected Area. Authorized Personnel Only.',
      invalidCredentials: 'Invalid credentials. Try admin / admin123',
      backToDashboard: 'Back to Dashboard'
    },
    footer: {
      quickLinks: 'Quick Links',
      categories: 'Categories',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      desc: 'Your trusted source for the latest university updates, events, and announcements.'
    },
    headline: {
      title: 'AI Headline Generator',
      subtitle:
      'Enter a topic or event to generate professional journalism-style headlines.',
      topicLabel: 'Topic / Event Description',
      topicPlaceholder: 'e.g., New Science Building Opening, Tuition Freeze...',
      generate: 'Generate Headlines',
      generated: 'Generated Headlines:',
      copy: 'Copy'
    },
    common: {
      views: 'views',
      search: 'Search',
      loading: 'Loading...'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      news: 'Новости',
      categories: 'Категории',
      headlineGenerator: 'Генератор заголовков',
      adminDashboard: 'Панель админа',
      logout: 'Выйти',
      adminLogin: 'Вход для админа'
    },
    categories: {
      all: 'Все',
      tadbirlar: 'Мероприятия',
      elonlar: 'Объявления',
      sport: 'Спорт',
      stipendiyalar: 'Стипендии',
      talabalarHayoti: 'Студенческая жизнь'
    },
    hero: {
      title: 'Университетский новостной портал',
      subtitle:
      'Ваш центральный узел для последних обновлений, событий, объявлений и историй из жизни кампуса.',
      browseNews: 'Смотреть новости',
      headlineGen: 'Генератор заголовков'
    },
    home: {
      latestNews: 'Последние новости',
      viewAll: 'Смотреть все',
      haveStory: 'Есть новость?',
      haveStoryDesc:
      'Мы хотим услышать вас! Присылайте свои новости, анонсы событий или истории успеха.',
      submitStory: 'Отправить историю',
      submitName: 'Ваше имя',
      submitMessage: 'Ваше сообщение',
      submitSuccess: 'Сообщение отправлено!',
      submitError: 'Произошла ошибка',
      trending: 'Популярное'
    },
    news: {
      title: 'Новости кампуса',
      subtitle:
      'Просматривайте все последние обновления, истории и объявления университета.',
      searchPlaceholder: 'Поиск новостей...',
      searchBtn: 'Поиск',
      noResults: 'Статьи не найдены',
      noResultsDesc: 'Попробуйте изменить условия поиска или фильтры.',
      foundResults: 'результатов для',
      resultsFor: ''
    },
    detail: {
      back: 'Назад',
      views: 'просмотров',
      share: 'Поделиться',
      relatedNews: 'Похожие новости',
      noRelated: 'Похожие статьи не найдены.',
      articleNotFound: 'Статья не найдена',
      returnToNews: 'Вернуться к новостям',
      publishedIn: 'Опубликовано в'
    },
    admin: {
      dashboard: 'Панель администратора',
      dashboardDesc: 'Управление новостями, событиями и объявлениями.',
      totalPosts: 'Всего постов',
      published: 'Опубликовано',
      drafts: 'Черновики',
      totalViews: 'Всего просмотров',
      announcement: 'Объявление сайта',
      announcementPlaceholder:
      'Введите текст объявления для верхней части сайта...',
      updateAnnouncement: 'Обновить',
      logo: 'Логотип сайта',
      uploadLogo: 'Загрузить логотип',
      currentLogo: 'Текущий логотип',
      recentArticles: 'Недавние статьи',
      addNewPost: 'Добавить пост',
      createArticle: 'Создать статью',
      editArticle: 'Редактировать статью',
      title: 'Заголовок',
      category: 'Категория',
      shortDesc: 'Краткое описание',
      imageUrl: 'URL изображения',
      imageFile: 'Или загрузить файл',
      uploadImage: 'Загрузить изображение',
      orUploadFile: 'или выберите файл',
      fullContent: 'Полное содержание',
      author: 'Автор',
      saveDraft: 'Сохранить как черновик',
      cancel: 'Отмена',
      update: 'Обновить статью',
      create: 'Создать статью',
      deleteConfirm: 'Вы уверены, что хотите удалить эту статью?',
      login: 'Вход для администратора',
      loginDesc: 'Введите учетные данные для доступа к панели',
      username: 'Имя пользователя',
      password: 'Пароль',
      loginBtn: 'Войти',
      protectedArea: 'Защищенная зона. Только для авторизованного персонала.',
      invalidCredentials: 'Неверные данные. Попробуйте admin / admin123',
      backToDashboard: 'Назад в панель'
    },
    footer: {
      quickLinks: 'Быстрые ссылки',
      categories: 'Категории',
      contactUs: 'Свяжитесь с нами',
      rights: 'Все права защищены.',
      desc: 'Ваш надежный источник последних обновлений университета, событий и объявлений.'
    },
    headline: {
      title: 'AI Генератор заголовков',
      subtitle:
      'Введите тему или событие, чтобы создать профессиональные журналистские заголовки.',
      topicLabel: 'Тема / Описание события',
      topicPlaceholder:
      'Например: Открытие нового научного корпуса, Замораживание цен на обучение...',
      generate: 'Создать заголовки',
      generated: 'Созданные заголовки:',
      copy: 'Копировать'
    },
    common: {
      views: 'просмотров',
      search: 'Поиск',
      loading: 'Загрузка...'
    }
  }
};
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  const [lang, setLang] = useState<Language>('uz');
  useEffect(() => {
    const storedLang = localStorage.getItem('uniNews_lang') as Language;
    if (storedLang && ['uz', 'en', 'ru'].includes(storedLang)) {
      setLang(storedLang);
    }
  }, []);
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('uniNews_lang', newLang);
  };
  const getCategoryName = (category: Category | 'All'): string => {
    if (category === 'All') return translations[lang].categories.all;
    // Map internal category keys to translation keys
    const keyMap: Record<string, keyof typeof translations.uz.categories> = {
      Tadbirlar: 'tadbirlar',
      "E'lonlar": 'elonlar',
      Sport: 'sport',
      Stipendiyalar: 'stipendiyalar',
      'Talabalar hayoti': 'talabalarHayoti'
    };
    const transKey = keyMap[category];
    return transKey ? translations[lang].categories[transKey] : category;
  };
  const getArticleContent = (article: NewsArticle) => {
    if (lang === 'en' && article.translations?.en) {
      return {
        title: article.translations.en.title || article.title,
        description: article.translations.en.description || article.description,
        content: article.translations.en.content || article.content
      };
    }
    if (lang === 'ru' && article.translations?.ru) {
      return {
        title: article.translations.ru.title || article.title,
        description: article.translations.ru.description || article.description,
        content: article.translations.ru.content || article.content
      };
    }
    // Default to main content (UZ)
    return {
      title: article.title,
      description: article.description,
      content: article.content
    };
  };
  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: handleSetLang,
        t: translations[lang],
        getCategoryName,
        getArticleContent
      }}>

      {children}
    </LanguageContext.Provider>);

}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
