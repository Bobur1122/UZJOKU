import React from 'react';
import { EditIcon, TrashIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { NewsArticle } from '../../data/newsData';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
interface PostTableProps {
  articles: NewsArticle[];
  onEdit: (article: NewsArticle) => void;
  onDelete: (id: string) => void;
}
export function PostTable({ articles, onEdit, onDelete }: PostTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) =>
              <tr
                key={article.id}
                className="hover:bg-muted/50 transition-colors">

                  <td
                  className="px-6 py-4 font-medium max-w-xs truncate"
                  title={article.title}>

                    {article.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{article.author}</td>
                  <td className="px-6 py-4">{article.date}</td>
                  <td className="px-6 py-4">
                    {article.isDraft ?
                  <span className="flex items-center text-yellow-600">
                        <EyeOffIcon className="h-3 w-3 mr-1" /> Draft
                      </span> :

                  <span className="flex items-center text-green-600">
                        <EyeIcon className="h-3 w-3 mr-1" /> Published
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(article)}
                    title="Edit">

                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (
                      window.confirm(
                        'Are you sure you want to delete this article?'
                      ))
                      {
                        onDelete(article.id);
                      }
                    }}
                    title="Delete">

                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              )}
              {articles.length === 0 &&
              <tr>
                  <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-muted-foreground">

                    No articles found. Create your first post!
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>);

}