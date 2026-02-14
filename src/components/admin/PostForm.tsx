import React, { useEffect, useState, useRef } from 'react';
import { NewsArticle, CATEGORIES, Category } from '../../data/newsData';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';
interface PostFormProps {
  initialData?: NewsArticle;
  onSubmit: (data: Omit<NewsArticle, 'id' | 'views' | 'date'> & {imageFile?: File | null;}) => void;
  onCancel: () => void;
}
type LangTab = 'uz' | 'en' | 'ru';
export function PostForm({ initialData, onSubmit, onCancel }: PostFormProps) {
  const { t, getCategoryName } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<LangTab>('uz');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: 'Tadbirlar' as Category,
    imageUrl: '',
    imageFile: null as File | null,
    author: '',
    isDraft: false,
    translations: {
      en: {
        title: '',
        description: '',
        content: ''
      },
      ru: {
        title: '',
        description: '',
        content: ''
      }
    }
  });
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        content: initialData.content,
        category: initialData.category,
        imageUrl: initialData.imageUrl,
        imageFile: null,
        author: initialData.author,
        isDraft: initialData.isDraft,
        translations: {
          en: {
            title: initialData.translations?.en?.title || '',
            description: initialData.translations?.en?.description || '',
            content: initialData.translations?.en?.content || ''
          },
          ru: {
            title: initialData.translations?.ru?.title || '',
            description: initialData.translations?.ru?.description || '',
            content: initialData.translations?.ru?.content || ''
          }
        }
      });
    }
  }, [initialData]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      });
    }
  };
  const updateTranslation = (
  lang: 'en' | 'ru',
  field: 'title' | 'description' | 'content',
  value: string) =>
  {
    setFormData({
      ...formData,
      translations: {
        ...formData.translations,
        [lang]: {
          ...formData.translations[lang],
          [field]: value
        }
      }
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? t.admin.editArticle : t.admin.createArticle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">{t.admin.category}</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Category
                })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">

                {CATEGORIES.map((cat) =>
                <option key={cat} value={cat}>
                    {getCategoryName(cat)}
                  </option>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">{t.admin.author}</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  author: e.target.value
                })
                }
                required
                placeholder={t.admin.author} />

            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">{t.admin.imageUrl}</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  imageUrl: e.target.value,
                  imageFile: null
                })
                }
                placeholder="https://example.com/image.jpg" />

            </div>

            <div className="space-y-2">
              <Label htmlFor="imageFile">{t.admin.imageFile}</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="imageFile"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="cursor-pointer" />

              </div>
            </div>

            {formData.imageUrl &&
            <div className="mt-2 h-40 w-full overflow-hidden rounded-md border bg-muted/20">
                <img
                src={formData.imageUrl}
                alt="Preview"
                className="h-full w-full object-contain" />

              </div>
            }
          </div>

          {/* Language Tabs */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-center mb-6">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('uz')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'uz' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  O'zbekcha (Asosiy)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('en')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'en' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ru')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'ru' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  Русский
                </button>
              </div>
            </div>

            {/* UZ Fields (Default) */}
            {activeTab === 'uz' &&
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Sarlavha (UZ)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value
                  })
                  }
                  required
                  placeholder="Maqola sarlavhasi" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Qisqacha tavsif (UZ)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value
                  })
                  }
                  required
                  placeholder="Qisqacha mazmuni"
                  className="h-20" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="content">To'liq mazmun (UZ)</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: e.target.value
                  })
                  }
                  required
                  placeholder="Maqola matni"
                  className="min-h-[300px]" />

              </div>
            </div>
            }

            {/* EN Fields */}
            {activeTab === 'en' &&
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <Input
                  id="title_en"
                  value={formData.translations.en.title}
                  onChange={(e) =>
                  updateTranslation('en', 'title', e.target.value)
                  }
                  placeholder="Article Title" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="description_en">Short Description (EN)</Label>
                <Textarea
                  id="description_en"
                  value={formData.translations.en.description}
                  onChange={(e) =>
                  updateTranslation('en', 'description', e.target.value)
                  }
                  placeholder="Short summary"
                  className="h-20" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="content_en">Full Content (EN)</Label>
                <Textarea
                  id="content_en"
                  value={formData.translations.en.content}
                  onChange={(e) =>
                  updateTranslation('en', 'content', e.target.value)
                  }
                  placeholder="Article content"
                  className="min-h-[300px]" />

              </div>
            </div>
            }

            {/* RU Fields */}
            {activeTab === 'ru' &&
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title_ru">Заголовок (RU)</Label>
                <Input
                  id="title_ru"
                  value={formData.translations.ru.title}
                  onChange={(e) =>
                  updateTranslation('ru', 'title', e.target.value)
                  }
                  placeholder="Заголовок статьи" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="description_ru">Краткое описание (RU)</Label>
                <Textarea
                  id="description_ru"
                  value={formData.translations.ru.description}
                  onChange={(e) =>
                  updateTranslation('ru', 'description', e.target.value)
                  }
                  placeholder="Краткое содержание"
                  className="h-20" />

              </div>

              <div className="space-y-2">
                <Label htmlFor="content_ru">Полное содержание (RU)</Label>
                <Textarea
                  id="content_ru"
                  value={formData.translations.ru.content}
                  onChange={(e) =>
                  updateTranslation('ru', 'content', e.target.value)
                  }
                  placeholder="Текст статьи"
                  className="min-h-[300px]" />

              </div>
            </div>
            }
          </div>

          <div className="flex items-center space-x-2 pt-4 border-t">
            <input
              type="checkbox"
              id="isDraft"
              checked={formData.isDraft}
              onChange={(e) =>
              setFormData({
                ...formData,
                isDraft: e.target.checked
              })
              }
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />

            <Label htmlFor="isDraft">{t.admin.saveDraft}</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t.admin.cancel}
            </Button>
            <Button type="submit">
              {initialData ? t.admin.update : t.admin.create}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>);

}
