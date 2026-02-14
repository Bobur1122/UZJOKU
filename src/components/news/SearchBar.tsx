import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}
export function SearchBar({
  onSearch,
  placeholder,
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex w-full max-w-lg items-center space-x-2 ${className}`}>

      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder || t.news.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 h-12 rounded-full border-muted-foreground/20 shadow-sm focus-visible:ring-primary" />

      </div>
      <Button type="submit" className="rounded-full px-6 h-12">
        {t.news.searchBtn}
      </Button>
    </form>);

}