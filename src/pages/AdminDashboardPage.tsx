import React, { useState } from 'react';
import {
  PlusIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MegaphoneIcon } from
'lucide-react';
import { useNews } from '../context/NewsContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { PostTable } from '../components/admin/PostTable';
import { PostForm } from '../components/admin/PostForm';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { NewsArticle } from '../data/newsData';
export function AdminDashboardPage() {
  const {
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    announcement,
    setAnnouncement
  } = useNews();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | undefined>(
    undefined
  );
  const [announcementText, setAnnouncementText] = useState(announcement || '');
  const stats = {
    total: articles.length,
    published: articles.filter((a) => !a.isDraft).length,
    drafts: articles.filter((a) => a.isDraft).length,
    views: articles.reduce((acc, curr) => acc + curr.views, 0)
  };
  const handleCreate = () => {
    setEditingArticle(undefined);
    setIsEditing(true);
  };
  const handleEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setIsEditing(true);
  };
  const handleDelete = (id: string) => {
    if (window.confirm(t.admin.deleteConfirm)) {
      deleteArticle(id);
    }
  };
  const handleSubmit = (data: Omit<NewsArticle, 'id' | 'views' | 'date'>) => {
    if (editingArticle) {
      updateArticle(editingArticle.id, data);
    } else {
      addArticle(data);
    }
    setIsEditing(false);
  };
  const handleAnnouncementUpdate = () => {
    setAnnouncement(announcementText || null);
    alert('Announcement updated successfully!');
  };
  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            ← {t.admin.backToDashboard}
          </Button>
        </div>
        <PostForm
          initialData={editingArticle}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditing(false)} />

      </div>);

  }
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutDashboardIcon className="mr-3 h-8 w-8 text-primary" />
            {t.admin.dashboard}
          </h1>
          <p className="text-muted-foreground">{t.admin.dashboardDesc}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          <LogOutIcon className="mr-2 h-4 w-4" /> {t.nav.logout}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t.admin.totalPosts}
            </p>
            <h3 className="text-3xl font-bold">{stats.total}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t.admin.published}
            </p>
            <h3 className="text-3xl font-bold text-green-600">
              {stats.published}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t.admin.drafts}
            </p>
            <h3 className="text-3xl font-bold text-yellow-600">
              {stats.drafts}
            </h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">
              {t.admin.totalViews}
            </p>
            <h3 className="text-3xl font-bold text-blue-600">
              {stats.views.toLocaleString()}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Announcement Manager */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MegaphoneIcon className="mr-2 h-5 w-5" /> {t.admin.announcement}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder={t.admin.announcementPlaceholder} />

            <Button onClick={handleAnnouncementUpdate}>
              {t.admin.updateAnnouncement}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t.admin.recentArticles}</h2>
          <Button onClick={handleCreate}>
            <PlusIcon className="mr-2 h-4 w-4" /> {t.admin.addNewPost}
          </Button>
        </div>

        <PostTable
          articles={articles}
          onEdit={handleEdit}
          onDelete={handleDelete} />

      </div>
    </div>);

}